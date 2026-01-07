import { NextResponse } from "next/server";
import crypto from "crypto";
import { MongoClient } from "mongodb";

type SubmitBody = {
  formData?: any;
  [key: string]: any;
};

function normalizePhone(mobile?: string) {
  if (!mobile) return "";
  return mobile.replace(/^\+91/, "").replace(/\D/g, "");
}

function generateRandom6DigitId() {
  return crypto.randomInt(100000, 1000000).toString();
}

// This function ensures the Auth URL matches the tenant in the Data URL
function deriveAuthUrlFromDataUrl(dataUrl: string) {
  try {
    const u = new URL(dataUrl);
    const host = u.host.replace(".rest.", ".auth.");
    return `https://${host}/v2/token`;
  } catch {
    return process.env.SFMC_AUTH_URL || "";
  }
}

async function getMongoClient() {
  const uri = "mongodb+srv://officialharsh3482_db_user:2T6rue8hQvmKSAyj@tukanghub.zcs11dr.mongodb.net/ambit";
  if (!uri) throw new Error("MONGODB_URI env not set");
  const globalAny = globalThis as any;
  if (!globalAny.__mongoClientPromise) {
    const client = new MongoClient(uri);
    globalAny.__mongoClientPromise = client.connect();
  }
  return globalAny.__mongoClientPromise as Promise<MongoClient>;
}

function splitName(fullName?: string) {
  const safe = (fullName || "").trim();
  if (!safe) return { firstName: "", lastName: "" };
  const parts = safe.split(/\s+/);
  const firstName = parts[0] || "";
  const lastName = parts.slice(1).join(" ") || "";
  return { firstName, lastName };
}

function formatDateYYYYMMDD(dateString?: string) {
  if (!dateString) return new Date().toISOString().slice(0, 10);
  const d = new Date(dateString);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export async function POST(request: Request) {
  try {
    console.log("[Landing Submit] Request received", { at: new Date().toISOString() });
    const body: SubmitBody = await request.json();
    const form = body.formData || body;
    console.log("[Landing Submit] Form payload", { form });

    const fullName: string = form.fullName;
    const email: string = form.email;
    const mobileNumber: string = form.mobileNumber;
    const otp: string = form.otp;
    const dateOfBirth: string = form.dateOfBirth;
    const state: string = form.state;
    const city: string = form.city;
    const pincode: string = form.pincode;
    const loanAmount: string = form.loanAmount;
    const constitution: string = form.constitution;
    const ownershipProof: string = form.ownershipProof;
    const yearsInBusiness: string = form.yearsInBusiness;
    const annualTurnover: string = form.annualTurnover;
    const gstRegistered: string = form.gstRegistered;

    if (!fullName || !email || !mobileNumber) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const normalizedPhone = normalizePhone(mobileNumber);
    if (!/^\d{10}$/.test(normalizedPhone)) {
      return NextResponse.json({ message: "Invalid mobile number" }, { status: 400 });
    }

    const { firstName, lastName } = splitName(fullName);

    const client = await getMongoClient();
    const db = client.db("ambit");
    const collection = db.collection("new-ambit-landing-page");
    console.log("[Landing Submit] Connected to MongoDB", { db: "ambit", collection: "new-ambit-landing-page" });

    const existing = await collection.findOne({ mobile_number: `+91${normalizedPhone}` });
    if (existing) {
      console.warn("[Landing Submit] Duplicate mobile detected, blocking submission", { mobile: `+91${normalizedPhone}`, existing_lead_id: existing.lead_id });
      return NextResponse.json(
        { ok: false, message: "Mobile number already exists", lead_id: existing.lead_id },
        { status: 409 }
      );
    }

    let leadId = "";
    let isUnique = false;
    while (!isUnique) {
      leadId = generateRandom6DigitId();
      const existingId = await collection.findOne({ lead_id: leadId });
      if (!existingId) {
        isUnique = true;
      }
    }

    const doc = {
      lead_id: leadId,
      firstName,
      lastName,
      email,
      mobile_number: `+91${normalizedPhone}`,
      otp,
      date_of_birth: dateOfBirth,
      state_name: state,
      city_name: city,
      pincode,
      loan_amount: loanAmount,
      constitution,
      ownership_proof: ownershipProof,
      number_of_years_in_business: yearsInBusiness,
      annual_business_turnover: annualTurnover,
      is_gst_registered: gstRegistered,
      created_at: new Date().toISOString(),
      mc_status: "pending",
    };

    console.log("[Landing Submit] Inserting document", { lead_id: leadId });
    const insertRes = await collection.insertOne(doc);
    console.log("[Landing Submit] Insert result", { insertedId: String(insertRes.insertedId) });
    
    // ---------------------------------------------------------
    // LOG 1: MongoDB Success Statement
    // ---------------------------------------------------------
    console.log("--> Data successfully submitted to MongoDB. Lead ID:", leadId);

    // Using the original URL as requested
    const dataUrl = process.env.SFMC_DATA_URL || "https://mcdbs97s7cvnmmfhv5knp640-4t8.rest.marketingcloudapis.com/hub/v1/dataevents/key:Nudge_Pool_Journey_Entry_Audience_UAT/rowset";
    
    // This dynamically generates the correct Auth URL (https://...mcdbs97s7cvnmmfhv5knp640-4t8.auth...)
    const authUrl = deriveAuthUrlFromDataUrl(dataUrl);
    
    console.log("[Landing Submit] SFMC endpoints", { authUrl, dataUrl });

    const clientId = "kgu1aolnkua7bc8owxjsfm3q";
    const clientSecret = "BWxwXblOXFxNnInQbxxuOsph";
    const accountId = "542000870";

    let mcSent = false;
    let mcResponse: any = null;
    let accessToken = "";

    if (clientId && clientSecret && accountId && authUrl) {
      const authResp = await fetch(authUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grant_type: "client_credentials",
          client_id: clientId,
          client_secret: clientSecret,
          account_id: accountId,
        }),
      });
      console.log("[Landing Submit] SFMC auth status", { status: authResp.status });
      if (authResp.ok) {
        const authData = await authResp.json();
        accessToken = authData.access_token;
        console.log("[Landing Submit] SFMC auth success", { hasToken: !!accessToken });
      } else {
        const errText = await authResp.text();
        console.error("[Landing Submit] SFMC auth failed", { status: authResp.status, error: errText });
      }

      if (accessToken) {
        const payload = [
          {
            keys: { Lead_ID: leadId },
            values: {
              FirstName: firstName,
              LastName: lastName,
              Date_of_Birth: formatDateYYYYMMDD(dateOfBirth),
              Mobile_Number: `+91${normalizedPhone}`,
              OTP: otp || "",
              Email: email,
              Pincode: pincode || "",
              City_Name: city || "",
              State_Name: state || "",
              Loan_Amount: loanAmount || "",
              Constitution: constitution || "",
              Ownership_Proof: ownershipProof || "",
              Number_of_Years_in_Business: yearsInBusiness || "",
              Annual_Business_Turnover: annualTurnover || "",
              Business_Registered_On_the_GST_Portal: gstRegistered || "",
              Pool_Tagging: "Business Loan",
              Contactability: "Contactable",
              Consent_Cibil_Comm_Check: "Yes",
              Time: new Date().toTimeString().split(" ")[0],
              Date: formatDateYYYYMMDD(new Date().toISOString()),
              Existing_Client: "No",
              DNC_Registered: "No",
              All_Docs_Collected: "No",
              Stop_Nurture_Pool_Sequence: "No",
              Eligibility_Date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
              Lead_Stage: "Nurture Pool",
              Product: "Secured Business Loan",
              Urgency: "Hot",
              Last_Communication_Date: new Date().toISOString(),
              Next_Communication_Date: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString(),
              Last_Communication_Channel: "Email",
              Communication_Sequence: "Nurture Pool",
              Lead_Tagging: "Credit Reject",
              Local: "IN",
              Token_ID: Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2),
              Eligibility: "Pending",
            },
          },
        ];

        const mcResp = await fetch(dataUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        console.log("[Landing Submit] SFMC rowset status", { status: mcResp.status });
        mcResponse = mcResp.ok ? await mcResp.json() : await mcResp.text();
        mcSent = mcResp.ok;

        // ---------------------------------------------------------
        // LOG 2: Marketing Cloud API Success Statement
        // ---------------------------------------------------------
        if (mcSent) {
           console.log("--> Data successfully sent to Marketing Cloud API. Response:", JSON.stringify(mcResponse));
        } else {
           console.error("--> Failed to send data to Marketing Cloud API. Response:", JSON.stringify(mcResponse));
        }
      }
    }

    await collection.updateOne(
      { _id: insertRes.insertedId },
      { $set: { mc_status: mcSent ? "success" : "failed", mc_response: mcResponse } }
    );

    console.log("[Landing Submit] Completed", { lead_id: leadId, mcSent });
    return NextResponse.json({ ok: true, lead_id: leadId, dbSaved: true, mcSent, mcResponse });
  } catch (error: any) {
    console.error("[Landing Submit] API error", { message: error.message });
    return NextResponse.json({ ok: false, error: error.message || String(error) }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
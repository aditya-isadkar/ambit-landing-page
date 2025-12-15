"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, User, Briefcase, Loader2, X, ScrollText, ChevronDown } from "lucide-react";

// --- CONSTANTS & DATA ---

const TERMS_TEXT = `By proceeding, I/We hereby confirm that I/We have read, understood, accept and hereby agree to abide by all terms and conditions including the disclaimer pertaining to the aforementioned loan facility which is available in the website of the Company and I/We hereby voluntarily accord my Aadhaar consent and also hereby authorize the Company and its representatives to contact me/us through phone call, SMS, WhatsApp and/or any other mode (this shall override any registration by myself/us under DNC/NDNC) and also to make any enquires regarding my/our aforementioned application as they may consider necessary at their sole discretion. I/We also authorize the Company to make any enquiry(ies) with NSDL/Credit bureau and/ or any regulatory authority and/ or any such third party regarding my/our PAN, Credit history and/ or for any other verification(s).

I/We have no insolvency proceedings initiated against me/any of us, nor have I/We ever been adjudicated as insolvent except for the legal proceedings, the particulars whereof are given herein below.

I hereby confirm that I am not a Politically Exposed Person in terms of applicable regulations prescribed by Reserve Bank of India.

I/We confirm that no amount of the Credit Facility shall be used for anti-social purposes or for money laundering activities or for any purpose other than the purpose for which the Credit Facility is sanctioned and that the Company has the right to recall the entire amount of the Credit Facility, if the Credit Facility is used for any purpose other than as declared by me/us.

I/We hereby provide my consent and authorize the Company and/or its affiliated partners to download my 'Know Your Customer' records/information from the Central KYC Registry. I am/We are aware that my/our KYC records/information would be downloaded from the Central KYC Registry, solely for performing customer due diligence on me/us in order to process my/ our loan application. I/We further declare that the data/ information on the Central KYC Registry is updated and has not been subjected to any change, as on the date of making the loan application.

I/We hereby also confirm that all the documents submitted and also the information furnished to the Company to process my/our loan application are true, correct and complete and up to date in all respects and I/We have not suppressed and/ or withheld any information provided otherwise whether in writing or orally for the Credit Facility applied for.

I/ We declare that I/ We have not made any payment in cash, bearer's cheques and/ or by any other mode along with or in connection with this Application Form to the person collecting my/our Application Form. I/ We shall not hold the Company's employees/ representatives/ authorized agents/ service providers liable for any such payment made by me/ us to the person collecting this Application Form.

I/We acknowledge that the Company does not in any manner make any representation, promise, statement and/ or endorsement in respect of any other product or services, which may be provided by the Company and I/ we will not be responsible or liable in any manner whatsoever for the same. I/ We understand that the Company is a LENDER, registered with the RBI and would be lending in the required Credit Facility.

I/We hereby also confirm that my/ our consent and declarations as provided herein will remain valid and abiding on me/ us even if any of the details mentioned herein above (including my/ our e-mail and/ or mobile number) changes, in which case, I/we shall forthwith inform the Company about such change.

I/We have no objection to sharing of my name, mobile number, e-mail ID, PAN and /or such other information, with the Company and/ or its group companies and/ or its agents, representatives for providing me/us information on various products, offers and services provided by the Company and/ or its group companies through any mode (including but not limited to telephone calls, SMS/e-mails, letters etc.).

I/ We understand that status of this Application Form will be known to me/ us within seven working days, on my e-mail ID and/or mobile number specified in this Application Form, from the date of submission of this Application Form along with all necessary documents desired by the Company duly signed by the applicant/ co-applicant(s) and guarantor(s), as the case may be.

I/We hereby agree that the rate of interest is in accordance with Interest Rate Policy of the Company.`;

// List sorted alphabetically
const rawStates = [
"Andaman and Nicobar Island", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Daman and Diu", "Delhi NCR", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamilnadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttrakhand", "West Bengal"
];
const states = rawStates.sort();

const constitutions = ["Private Limited", "Limited Liability Partnership", "Partnership", "Sole Proprietorship"];
const ownershipProofs = ["Property Papers", "Rent Agreement", "Lease Agreement"];
const yearsInBusiness = ["1-2 years", "3-5 years", "5-10 years", "10+ years"];
const annualTurnovers = ["< 10 Lakhs", "10-50 Lakhs", "50 Lakhs - 1 Cr", "1-5 Cr", "5+ Cr"];

const stepIcons = [User, Briefcase];
const stepTitles = ["Personal Details", "Business Details"];

// --- HELPER FUNCTION FOR DYNAMIC AGE ---
const calculateAge = (dateString: string) => {
  if (!dateString) return 0;
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

// --- SCHEMA CONFIGURATION ---
const formSchema = z.object({
  // Step 1: Personal Information
  fullName: z.string().min(2, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  mobileNumber: z.string().length(10, "Mobile number must be exactly 10 digits"),
  otp: z.string().min(4, "OTP is required"),

  // Date validation: DYNAMIC 21-60 years check
  dateOfBirth: z.string().refine((val) => {
    const age = calculateAge(val);
    return age >= 21 && age <= 60;
  }, { message: "Age must be between 21 and 60 years" }),

  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  pincode: z.string().length(6, "Pincode must be exactly 6 digits"),

  // Step 2: Business Information
  loanAmount: z.string().min(1, "Loan amount is required"),
  constitution: z.string().min(1, "Constitution is required"),
  ownershipProof: z.string().min(1, "Ownership proof is required"),
  yearsInBusiness: z.string().min(1, "Years in business is required"),
  annualTurnover: z.string().min(1, "Annual turnover is required"),
  gstRegistered: z.enum(["yes", "no"], { message: "Please select an option" }),

  // Consent Checkboxes
  termsAgreed: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Terms and Conditions",
  }),
  communicationsAgreed: z.boolean().refine((val) => val === true, {
    message: "You must authorize communications",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function MultipartForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const totalSteps = 2;

  // Modal State
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  // State Dropdown State
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const stateDropdownRef = useRef<HTMLDivElement>(null);

  // OTP STATE CONFIGURATION
  const [otpToken, setOtpToken] = useState<string | null>(null);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [otpError, setOtpError] = useState(""); 
  const [otpSentMsg, setOtpSentMsg] = useState("");
  const lastSentMobile = useRef(""); 
  const context = "secured_business_loan"; 
  
  // Focus States
  const [fullNameFocused, setFullNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [mobileFocused, setMobileFocused] = useState(false);
  const [otpFocused, setOtpFocused] = useState(false);
  const [dobFocused, setDobFocused] = useState(false);
  const [cityFocused, setCityFocused] = useState(false);
  const [pincodeFocused, setPincodeFocused] = useState(false);
  const [loanAmountFocused, setLoanAmountFocused] = useState(false);
  const [constitutionFocused, setConstitutionFocused] = useState(false);
  const [ownershipFocused, setOwnershipFocused] = useState(false);
  const [yearsFocused, setYearsFocused] = useState(false);
  const [turnoverFocused, setTurnoverFocused] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
    clearErrors,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    reValidateMode: "onChange", 
    defaultValues: {
      termsAgreed: true,
      communicationsAgreed: true
    }
  });

  const mobileNumber = watch("mobileNumber");
  const enteredOtp = watch("otp");
  const selectedState = watch("state");
  const fullNameValue = watch("fullName");
  const emailValue = watch("email");
  const dobValue = watch("dateOfBirth");
  const cityValue = watch("city");
  const pincodeValue = watch("pincode");
  const loanAmountValue = watch("loanAmount");
  const constitutionValue = watch("constitution");
  const ownershipValue = watch("ownershipProof");
  const yearsValue = watch("yearsInBusiness");
  const turnoverValue = watch("annualTurnover");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [loanAmountWarning, setLoanAmountWarning] = useState("");
  const lastLoanAmount = useRef("");

  // --- MOUNT EFFECT ---
  useEffect(() => {
      setMounted(true);
  }, []);

  // --- ERROR CLEARING EFFECT ---
  // This is the FIX: It waits until we actually switch to Step 2, then forcibly wipes errors.
  useEffect(() => {
    if (currentStep === 2) {
      const step2Fields: (keyof FormData)[] = [
        "loanAmount", "constitution", "ownershipProof", 
        "yearsInBusiness", "annualTurnover", "gstRegistered",
        "termsAgreed", "communicationsAgreed"
      ];
      clearErrors(step2Fields);
      setShowTermsModal(false);
    }
  }, [currentStep, clearErrors]);

  // --- SCROLL LOCK EFFECT ---
  useEffect(() => {
      if (showTermsModal) {
          document.body.style.overflow = "hidden";
      } else {
          document.body.style.overflow = "unset";
      }
      return () => { document.body.style.overflow = "unset"; };
  }, [showTermsModal]);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [currentStep]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (stateDropdownRef.current && !stateDropdownRef.current.contains(event.target as Node)) {
        setIsStateDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Countdown Timer Effect
  useEffect(() => {
    if (otpCountdown <= 0) return;
    const timer = setTimeout(() => setOtpCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [otpCountdown]);

  useEffect(() => {
    if (mobileNumber && mobileNumber.length !== 10) {
        setIsMobileVerified(false);
        setOtpToken(null);
        setOtpError("");
        setOtpSentMsg("");
        lastSentMobile.current = "";
    }
  }, [mobileNumber]);

  useEffect(() => {
    const cleanMobile = mobileNumber?.replace(/\D/g, "");
    if (
      cleanMobile?.length === 10 && 
      !isMobileVerified && 
      !isSendingOtp && 
      !otpToken && 
      lastSentMobile.current !== cleanMobile
    ) {
      const timer = setTimeout(() => {
        handleRequestOtp(cleanMobile);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [mobileNumber]);

  useEffect(() => {
    if (enteredOtp && enteredOtp.length === 4 && otpToken && !isMobileVerified && !isVerifyingOtp) {
      handleVerifyOtp();
    }
  }, [enteredOtp]);

  const handleRequestOtp = async (mobileToUse?: string) => {
    const mobile = mobileToUse || mobileNumber;
    setOtpError("");
    setOtpSentMsg("");

    if (!mobile || !/^\d{10}$/.test(mobile)) return;

    setIsSendingOtp(true);
    try {
      const response = await fetch("/api/otp/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: mobile, context }),
      });

      if (!response.ok) throw new Error("Failed to send OTP");

      const payload = await response.json();
      setOtpToken(payload.token);
      setOtpCountdown(payload.cooldown ?? 60);
      setOtpSentMsg("OTP sent successfully");
      lastSentMobile.current = mobile; 
    } catch (error) {
      console.error(error);
      setOtpError("Error sending OTP");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpToken || !enteredOtp) return;
    setOtpError("");

    setIsVerifyingOtp(true);
    try {
      const response = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: otpToken,
          otp: enteredOtp,
          mobile: mobileNumber,
          context,
        }),
      });

      const payload = await response.json();

      if (response.ok && payload.verified) {
        setIsMobileVerified(true);
        setOtpSentMsg(""); 
        setOtpError("");
      } else {
        if (enteredOtp.length >= 4) {
            setOtpError("Invalid OTP");
        }
      }
    } catch (error) {
      console.error(error);
      setOtpError("Verification failed");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const nextStep = async () => {
    const step1Fields: (keyof FormData)[] = [
      "fullName", "email", "mobileNumber", "otp", 
      "dateOfBirth", "state", "city", "pincode"
    ];
    
    if (currentStep === 1) {
      if (!isMobileVerified) {
        setOtpError("Enter OTP to proceed.");
        await trigger(step1Fields); 
        return;
      }
      
      // We only validate Step 1 fields here.
      // We DO NOT clear errors here anymore, we let the useEffect handle it.
      const isValid = await trigger(step1Fields);
      
      if (isValid) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const onSubmit = async (data: FormData) => {
    if (!isMobileVerified) {
      setSubmitError("Mobile number verification is required.");
      return;
    }
    try {
      setIsSubmitting(true);
      setSubmitError("");
      const formPayload = {
        fullName: data.fullName,
        email: data.email,
        mobileNumber: data.mobileNumber,
        otp: data.otp,
        dateOfBirth: data.dateOfBirth,
        state: data.state,
        city: data.city,
        pincode: data.pincode,
        loanAmount: data.loanAmount,
        constitution: data.constitution,
        ownershipProof: data.ownershipProof,
        yearsInBusiness: data.yearsInBusiness,
        annualTurnover: data.annualTurnover,
        gstRegistered: data.gstRegistered,
      };
      console.log("[MultipartForm] Submitting payload", formPayload);
      const response = await fetch("/api/landing/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData: formPayload }),
      });
      const payload = await response.json();
      console.log("[MultipartForm] Submission response", { status: response.status, payload });
      if (!response.ok || !payload.ok) {
        if (response.status === 409) {
          setSubmitError("Mobile number already exists.");
        } else {
          setSubmitError("Submission failed. Please try again.");
        }
        return;
      }
      setShowTermsModal(false);
      try { sessionStorage.setItem("thankyou_access", "1"); } catch {}
      router.push("/thank-you");
    } catch (err) {
      console.error(err);
      setSubmitError("Unexpected error during submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const clampLoanAmount = (value: string) => {
    const numeric = Number(value.replace(/[^0-9]/g, ""));
    if (!numeric) return "";
    const clamped = Math.min(Math.max(numeric, 300000), 30000000);
    return clamped.toString();
  };

  // Reusable Consent Section Component
  const ConsentSection = () => (
      <div className="md:col-span-2 space-y-2 mt-2">
          <div className="flex items-start gap-2">
              <input 
                  id="termsAgreed"
                  type="checkbox" 
                  {...register("termsAgreed")} 
                  onChange={() => clearErrors("termsAgreed")}
                  className="mt-1 w-4 h-4 shrink-0 text-primary rounded border-gray-300 focus:ring-primary"
              />
              <label htmlFor="termsAgreed" className="text-xs text-gray-600 leading-tight">
                  I agree to <button type="button" onClick={() => setShowTermsModal(true)} className="text-primary font-semibold hover:underline">Terms and Conditions</button> and authorize Ambit Finvest to contact me.
              </label>
          </div>
          <div className="h-4">
              {errors.termsAgreed && <p className="text-xs text-red-500 pl-6">{errors.termsAgreed.message}</p>}
          </div>

          <div className="flex items-start gap-2">
              <input 
                  id="communicationsAgreed"
                  type="checkbox" 
                  {...register("communicationsAgreed")} 
                  onChange={() => clearErrors("communicationsAgreed")}
                  className="mt-1 w-4 h-4 shrink-0 text-primary rounded border-gray-300 focus:ring-primary"
              />
              <label htmlFor="communicationsAgreed" className="text-xs text-gray-600 leading-tight">
                  I agree to receive communications and authorize Ambit Finvest to contact me through SMS, Mail and WhatsApp.
              </label>
          </div>
          <div className="h-4">
              {errors.communicationsAgreed && <p className="text-xs text-red-500 pl-6">{errors.communicationsAgreed.message}</p>}
          </div>
      </div>
  );

  // --- REAL-TIME AGE VALIDATION LOGIC ---
  const dobAge = calculateAge(dobValue);
  // Check if user has entered a date AND the age is outside limits (less than 21 OR greater than 60)
  const isDobInvalid = !!dobValue && (dobAge < 21 || dobAge > 60);
  const isDobValid = !!dobValue && !isDobInvalid;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl md:rounded-2xl shadow-xl overflow-hidden border border-gray-100 relative">
      
      {/* --- TERMS MODAL --- */}
      {showTermsModal && mounted && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[70vh] flex flex-col relative animate-scaleIn">
            <div className="p-4 border-b flex items-center justify-between bg-gray-50 rounded-t-xl">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <ScrollText className="w-5 h-5 text-primary"/> Terms and Conditions
                </h3>
                <button onClick={() => setShowTermsModal(false)} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                    <X className="w-5 h-5 text-gray-500" />
                </button>
            </div>
            <div className="p-6 overflow-y-auto text-xs md:text-sm text-gray-600 leading-relaxed text-justify whitespace-pre-wrap">
                {TERMS_TEXT}
            </div>
            <div className="p-4 border-t bg-gray-50 rounded-b-xl flex justify-end">
                <button onClick={() => setShowTermsModal(false)} className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
                    I Understand
                </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Headline & Progress Bar sections remain same... */}
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 px-3 md:px-6 py-2 md:py-4 border-b border-primary-200">
        <h2 className="text-base md:text-xl lg:text-2xl font-bold text-gray-900 text-center">
          Apply for a Business Loan up to ₹3 Crore
        </h2>
      </div>

      <div className="bg-gradient-to-r from-primary-50 to-primary-100 px-4 py-2 border-b border-primary-200">
        <div className="flex items-center justify-center">
          <div className="flex items-center w-full max-w-xl px-2">
            {[1, 2].map((step) => {
              const Icon = stepIcons[step - 1];
              const isActive = currentStep === step;
              const isCompleted = currentStep > step;
              return (
                <div key={step} className="flex items-center flex-1">
                  <div className="flex flex-col items-center justify-center relative z-10 w-full">
                    <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-500 ${isActive ? "bg-primary border-primary text-white shadow-md shadow-primary/50" : isCompleted ? "bg-green-600 border-green-600 text-white" : "bg-white border-gray-300 text-gray-400"}`}>
                      {isCompleted ? <Check className="w-3 h-3" /> : <Icon className="w-3 h-3" />}
                    </div>
                    <div className={`mt-1 text-[9px] font-semibold transition-colors text-center ${isActive ? "text-primary" : isCompleted ? "text-green-600" : "text-gray-400"}`}>
                      {stepTitles[step - 1]}
                    </div>
                  </div>
                  {step < totalSteps && (
                    <div className="flex-1 h-0.5 mx-3 relative">
                      <div className="absolute inset-0 bg-gray-200 rounded-full overflow-hidden">
                        <div className={`h-full transition-all duration-1000 ease-out rounded-full ${currentStep > step ? "bg-green-600" : "bg-gray-200"}`} style={{ width: currentStep > step ? "100%" : "0%" }} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-3 md:p-5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 md:space-y-4">
          
          {/* Step 1: Personal Details */}
          {currentStep === 1 && (
            <div className={`space-y-1 ${isAnimating ? "animate-slideIn" : ""}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-1">
                
                {/* Full Name & Email (Kept same) */}
                <div className="space-y-1">
                  <div className="relative">
                    <input {...register("fullName")} type="text" className="peer w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg outline-none focus:border-primary placeholder-transparent focus:placeholder-gray-500" placeholder="Enter Your full name" onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z\s]/g, ''); clearErrors("fullName"); }} onFocus={() => setFullNameFocused(true)} onBlur={() => setFullNameFocused(false)} />
                    <span className={`pointer-events-none absolute left-3 bg-white px-1 transition-all duration-200 ${fullNameFocused || !!fullNameValue ? "-top-3 text-xs font-semibold text-gray-700" : "top-2 text-sm text-gray-700"}`}>Full Name *</span>
                  </div>
                  <div className="h-4">{errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}</div>
                </div>

                <div className="space-y-1">
                  <div className="relative">
                    <input {...register("email")} type="email" className="peer w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg outline-none focus:border-primary placeholder-transparent focus:placeholder-gray-500" placeholder="Enter your email" onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/[0-9]/g, ''); clearErrors("email"); }} onFocus={() => setEmailFocused(true)} onBlur={() => setEmailFocused(false)} />
                    <span className={`pointer-events-none absolute left-3 bg-white px-1 transition-all duration-200 ${emailFocused || !!emailValue ? "-top-3 text-xs font-semibold text-gray-700" : "top-2 text-sm text-gray-700"}`}>Email address *</span>
                  </div>
                  <div className="h-4">{errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}</div>
                </div>

                {/* Mobile & OTP (Kept same) */}
                <div className="space-y-1">
                  <div className="relative">
                    <input {...register("mobileNumber")} type="tel" disabled={isMobileVerified} onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ''); if (e.currentTarget.value.length > 10) e.currentTarget.value = e.currentTarget.value.slice(0, 10); clearErrors("mobileNumber"); }} className="peer w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg outline-none focus:border-primary disabled:bg-gray-50 placeholder-transparent focus:placeholder-gray-500" placeholder="Enter mobile number" onFocus={() => setMobileFocused(true)} onBlur={() => setMobileFocused(false)} />
                    {isSendingOtp && <div className="absolute right-3 top-2.5"><Loader2 className="w-4 h-4 text-primary animate-spin" /></div>}
                    <span className={`pointer-events-none absolute left-3 bg-white px-1 transition-all duration-200 ${mobileFocused || !!mobileNumber ? "-top-3 text-xs font-semibold text-gray-700" : "top-2 text-sm text-gray-700"}`}>Mobile Number *</span>
                  </div>
                  <div className="h-4">
                    {errors.mobileNumber && <p className="text-xs text-red-500">{errors.mobileNumber.message}</p>}
                    {!errors.mobileNumber && otpSentMsg && !isMobileVerified && <p className="text-xs text-green-600">{otpSentMsg}</p>}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="relative">
                    <input {...register("otp")} type="text" maxLength={4} disabled={!otpToken || isMobileVerified} onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ''); setOtpError(""); clearErrors("otp"); }} className="peer w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg outline-none focus:border-primary disabled:bg-gray-50 placeholder-transparent focus:placeholder-gray-500" placeholder="Enter 4-digit OTP" onFocus={() => setOtpFocused(true)} onBlur={() => setOtpFocused(false)} />
                    {isVerifyingOtp && <div className="absolute right-3 top-2.5"><Loader2 className="w-4 h-4 text-primary animate-spin" /></div>}
                    {!isVerifyingOtp && isMobileVerified && (
                      <div className="absolute right-3 top-2.5 pointer-events-none bg-white pl-1">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                    )}
                    <span className={`pointer-events-none absolute left-3 bg-white px-1 transition-all duration-200 ${otpFocused || !!enteredOtp ? "-top-3 text-xs font-semibold text-gray-700" : "top-2 text-sm text-gray-700"}`}>OTP *</span>
                  </div>
                  <div className="h-4">{otpError && <p className="text-xs text-red-500">{otpError}</p>}</div>
                </div>

                {/* --- DATE OF BIRTH SECTION --- */}
                <div className="space-y-1 mt-1">
                  <div className="relative">
                    <input 
                      {...register("dateOfBirth")} 
                      type="date" 
                      max={new Date().toISOString().split("T")[0]} 
                      className="peer w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg outline-none focus:border-primary bg-white placeholder-transparent focus:placeholder-gray-500"
                      onFocus={() => setDobFocused(true)}
                      onChange={() => { clearErrors("dateOfBirth"); }}
                      onBlur={() => setDobFocused(false)}
                    />
                    
                    {/* Icon Logic: Only show Green Check if valid */}
                    {isDobValid && (
                        <div className="absolute right-10 top-2.5 pointer-events-none bg-white pl-1">
                            <Check className="w-4 h-4 text-green-600 animate-scaleIn" />
                        </div>
                    )}

                    <span
                      className={`pointer-events-none absolute left-3 bg-white px-1 transition-all duration-200 ${dobFocused || !!dobValue ? "-top-3 text-xs font-semibold text-gray-700" : "top-3 text-sm text-gray-700"}`}
                    >
                      Date of birth *
                    </span>
                    
                  </div>
                  <div className="h-4">
                    {errors.dateOfBirth ? (
                      <p className="text-xs text-red-500">{errors.dateOfBirth.message}</p>
                    ) : isDobInvalid ? (
                      <p className="text-xs text-red-500">Age must be between 21 and 60 years</p>
                    ) : null}
                  </div>
                </div>

                {/* State, City, Pincode (Kept Same) */}
                <div className="space-y-1 mt-1 relative" ref={stateDropdownRef}>
                  <input type="hidden" {...register("state")} />
                  <div onClick={() => setIsStateDropdownOpen(!isStateDropdownOpen)} className="relative w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg outline-none focus:border-primary bg-white flex justify-between items-center cursor-pointer">
                      <span className={selectedState ? "text-black" : "text-gray-500"}>{selectedState || "Select State"}</span>
                      <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isStateDropdownOpen ? 'rotate-180' : ''}`} />
                      <span className={`pointer-events-none absolute left-3 bg-white px-1 transition-all duration-200 ${isStateDropdownOpen || !!selectedState ? "-top-3 text-xs font-semibold text-gray-700" : "top-2 text-sm text-gray-700"}`}>Select State *</span>
                  </div>
                  {isStateDropdownOpen && (
                      <ul className="absolute z-50 left-0 right-0 mt-1 bg-white border-2 border-gray-100 rounded-lg shadow-xl max-h-40 overflow-y-auto">
                          {states.map((state) => (
                              <li key={state} onClick={() => { setValue("state", state, { shouldValidate: true }); clearErrors("state"); setValue("city", ""); setIsStateDropdownOpen(false); }} className="px-3 py-2 text-sm hover:bg-gray-50 hover:text-primary cursor-pointer transition-colors">
                                  {state}
                              </li>
                          ))}
                      </ul>
                  )}
                  <div className="h-4">{errors.state && <p className="text-xs text-red-500">{errors.state.message}</p>}</div>
                </div>

                <div className="space-y-1 mt-1">
                  <div className="relative">
                    <input type="text" {...register("city")} className="peer w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg outline-none focus:border-primary placeholder-transparent focus:placeholder-gray-500" placeholder="Enter your city" onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z\s]/g, ''); clearErrors("city"); }} onFocus={() => setCityFocused(true)} onBlur={() => setCityFocused(false)} />
                    <span className={`pointer-events-none absolute left-3 bg-white px-1 transition-all duration-200 ${cityFocused || !!cityValue ? "-top-3 text-xs font-semibold text-gray-700" : "top-2 text-sm text-gray-700"}`}>City *</span>
                  </div>
                  <div className="h-4">{errors.city && <p className="text-xs text-red-500">{errors.city.message}</p>}</div>
                </div>

                <div className="space-y-1 mt-1">
                  <div className="relative">
                    <input {...register("pincode")} type="text" maxLength={6} onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ''); clearErrors("pincode"); }} className="peer w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg outline-none focus:border-primary placeholder-transparent focus:placeholder-gray-500" placeholder="Enter 6-digit pincode" onFocus={() => setPincodeFocused(true)} onBlur={() => setPincodeFocused(false)} />
                    <span className={`pointer-events-none absolute left-3 bg-white px-1 transition-all duration-200 ${pincodeFocused || !!pincodeValue ? "-top-3 text-xs font-semibold text-gray-700" : "top-2 text-sm text-gray-700"}`}>Pincode *</span>
                  </div>
                  <div className="h-4">{errors.pincode && <p className="text-xs text-red-500">{errors.pincode.message}</p>}</div>
                </div>
                
              </div>
            </div>
          )}

          {/* Step 2: Business Details (Unchanged logic) */}
          {currentStep === 2 && (
            <div className={`space-y-1 ${isAnimating ? "animate-slideIn" : ""}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-1">
                {/* Loan Amount */}
                <div className="space-y-1">
                  <div className="relative">
                    <input {...register("loanAmount")} type="text" inputMode="numeric" className="peer w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg outline-none focus:border-primary placeholder-transparent focus:placeholder-gray-500" placeholder="Enter loan amount (₹3L - ₹3Cr)" onInput={(e) => { const cleaned = e.currentTarget.value.replace(/[^0-9]/g, ""); clearErrors("loanAmount"); if (!cleaned) { setValue("loanAmount", "", { shouldValidate: false }); setLoanAmountWarning(""); lastLoanAmount.current = ""; return; } const n = Number(cleaned); if (n > 30000000) { setLoanAmountWarning("Maximum allowed is ₹3 Cr"); e.currentTarget.value = lastLoanAmount.current; setValue("loanAmount", lastLoanAmount.current, { shouldValidate: false }); return; } setLoanAmountWarning(n < 300000 ? "Minimum allowed is ₹3 Lakh" : ""); setValue("loanAmount", cleaned, { shouldValidate: false }); lastLoanAmount.current = cleaned; }} onBlur={(e) => { const cleaned = e.currentTarget.value.replace(/[^0-9]/g, ""); const n = Number(cleaned || "0"); if (cleaned === "") { setLoanAmountWarning(""); } else if (n > 30000000) { setLoanAmountWarning("Maximum allowed is ₹3 Cr"); e.currentTarget.value = lastLoanAmount.current; setValue("loanAmount", lastLoanAmount.current, { shouldValidate: false }); } else { setLoanAmountWarning(n < 300000 ? "Minimum allowed is ₹3 Lakh" : ""); setValue("loanAmount", cleaned, { shouldValidate: false }); lastLoanAmount.current = cleaned; } setLoanAmountFocused(false); }} onFocus={() => setLoanAmountFocused(true)} />
                    <span className={`pointer-events-none absolute left-3 bg-white px-1 transition-all duration-200 ${loanAmountFocused || !!loanAmountValue ? "-top-3 text-xs font-semibold text-gray-700" : "top-2 text-sm text-gray-700"}`}>Loan Amount Required *</span>
                  </div>
                  <div className="h-4">{errors.loanAmount && <p className="text-xs text-red-500">{errors.loanAmount.message}</p>}{!errors.loanAmount && loanAmountWarning && <p className="text-xs text-red-500">{loanAmountWarning}</p>}</div>
                </div>
                {/* Constitution */}
                <div className="space-y-1">
                  <div className="relative">
                    <select {...register("constitution")} className="peer w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg outline-none focus:border-primary bg-white" onChange={() => clearErrors("constitution")} onFocus={() => setConstitutionFocused(true)} onBlur={() => setConstitutionFocused(false)}>
                      <option value="">Select Constitution</option>
                      {constitutions.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <span className={`pointer-events-none absolute left-3 bg-white px-1 transition-all duration-200 ${constitutionFocused || !!constitutionValue ? "-top-3 text-xs font-semibold text-gray-700" : "top-2 text-sm text-gray-700"}`}>Select Constitution *</span>
                  </div>
                  <div className="h-4">{errors.constitution && <p className="text-xs text-red-500">{errors.constitution.message}</p>}</div>
                </div>
                {/* Ownership */}
                <div className="space-y-1 mt-4">
                  <div className="relative">
                    <select {...register("ownershipProof")} className="peer w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg outline-none focus:border-primary bg-white" onChange={() => clearErrors("ownershipProof")} onFocus={() => setOwnershipFocused(true)} onBlur={() => setOwnershipFocused(false)}>
                      <option value="">Select Ownership Proof</option>
                      {ownershipProofs.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <span className={`pointer-events-none absolute left-3 bg-white px-1 transition-all duration-200 ${ownershipFocused || !!ownershipValue ? "-top-3 text-xs font-semibold text-gray-700" : "top-2 text-sm text-gray-700"}`}>Select Ownership Proof *</span>
                  </div>
                  <div className="h-4">{errors.ownershipProof && <p className="text-xs text-red-500">{errors.ownershipProof.message}</p>}</div>
                </div>
                {/* Years */}
                <div className="space-y-1 mt-4">
                  <div className="relative">
                    <select {...register("yearsInBusiness")} className="peer w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg outline-none focus:border-primary bg-white" onChange={() => clearErrors("yearsInBusiness")} onFocus={() => setYearsFocused(true)} onBlur={() => setYearsFocused(false)}>
                      <option value="">Select Years</option>
                      {yearsInBusiness.map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                    <span className={`pointer-events-none absolute left-3 bg-white px-1 transition-all duration-200 ${yearsFocused || !!yearsValue ? "-top-3 text-xs font-semibold text-gray-700" : "top-2 text-sm text-gray-700"}`}>Years in Business *</span>
                  </div>
                  <div className="h-4">{errors.yearsInBusiness && <p className="text-xs text-red-500">{errors.yearsInBusiness.message}</p>}</div>
                </div>
                {/* Turnover */}
                <div className="space-y-1 mt-5">
                  <div className="relative">
                    <select {...register("annualTurnover")} className="peer w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg outline-none focus:border-primary bg-white" onChange={() => clearErrors("annualTurnover")} onFocus={() => setTurnoverFocused(true)} onBlur={() => setTurnoverFocused(false)}>
                      <option value="">Select Turnover</option>
                      {annualTurnovers.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <span className={`pointer-events-none absolute left-3 bg-white px-1 transition-all duration-200 ${turnoverFocused || !!turnoverValue ? "-top-3 text-xs font-semibold text-gray-700" : "top-2 text-sm text-gray-700"}`}>Annual Turnover *</span>
                  </div>
                  <div className="h-4">{errors.annualTurnover && <p className="text-xs text-red-500">{errors.annualTurnover.message}</p>}</div>
                </div>
                {/* GST */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-700">Is your Business GST registered? *</label>
                  <div className="w-full border-2 border-gray-200 rounded-lg overflow-hidden h-[38px]">
                    <div className="grid grid-cols-2 h-full">
                      <label className="flex items-center justify-center gap-2 h-full cursor-pointer border-r border-gray-200">
                        <input {...register("gstRegistered")} type="radio" value="yes" className="w-4 h-4 text-primary focus:ring-primary" onChange={() => clearErrors("gstRegistered")} />
                        <span className="text-sm text-gray-700 font-medium">Yes</span>
                      </label>
                      <label className="flex items-center justify-center gap-2 h-full cursor-pointer">
                        <input {...register("gstRegistered")} type="radio" value="no" className="w-4 h-4 text-primary focus:ring-primary" onChange={() => clearErrors("gstRegistered")} />
                        <span className="text-sm text-gray-700 font-medium">No</span>
                      </label>
                    </div>
                  </div>
                  <div className="h-4">{errors.gstRegistered && <p className="text-xs text-red-500">{errors.gstRegistered.message}</p>}</div>
                </div>

                <ConsentSection />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="pt-0 border-t-2 border-gray-100">
            {currentStep < totalSteps ? (
              <button type="button" onClick={nextStep} className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary-burgundy text-white rounded-lg text-sm font-semibold hover:from-secondary-burgundy transition-all shadow-lg flex items-center justify-center gap-2">
                Apply Now
              </button>
            ) : (
              <button type="submit" disabled={isSubmitting} className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary-burgundy text-white rounded-lg text-sm font-semibold hover:from-secondary-burgundy transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70">
                {isSubmitting ? "Submitting..." : "Apply Now"}
              </button>
            )}
            <div className="h-5 mt-2">
              {submitError && <p className="text-xs text-red-600 text-center">{submitError}</p>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

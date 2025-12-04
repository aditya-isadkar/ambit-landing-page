"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, User, Briefcase, Sparkles, Loader2 } from "lucide-react";

// Schema Configuration
const formSchema = z.object({
  // Step 1: Personal Information
  fullName: z.string().min(2, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  // Strict validation for exactly 10 digits
  mobileNumber: z.string().length(10, "Mobile number must be exactly 10 digits"),
  // Adjusted min length to 4
  otp: z.string().min(4, "OTP is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  
  // Step 2: Location
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  pincode: z.string().min(6, "Valid pincode is required"),
  
  // Step 3: Business Information
  loanAmount: z.string().min(1, "Loan amount is required"),
  constitution: z.string().min(1, "Constitution is required"),
  ownershipProof: z.string().min(1, "Ownership proof is required"),
  yearsInBusiness: z.string().min(1, "Years in business is required"),
  annualTurnover: z.string().min(1, "Annual turnover is required"),
  gstRegistered: z.enum(["yes", "no"], { message: "Please select an option" }),
});

type FormData = z.infer<typeof formSchema>;

const states = ["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Gujarat", "Rajasthan"];
const constitutions = ["Private Limited", "LLP", "Partnership", "Sole Proprietorship"];
const ownershipProofs = ["Property Papers", "Rent Agreement", "Lease Agreement"];
const yearsInBusiness = ["1-2 years", "3-5 years", "5-10 years", "10+ years"];
const annualTurnovers = ["< 10 Lakhs", "10-50 Lakhs", "50 Lakhs - 1 Cr", "1-5 Cr", "5+ Cr"];

const stepIcons = [User, Briefcase];
const stepTitles = ["Personal Details", "Business Details"];

export default function MultipartForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const totalSteps = 2;

  // --- OTP STATE CONFIGURATION ---
  const [otpToken, setOtpToken] = useState<string | null>(null);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [otpError, setOtpError] = useState(""); 
  const [otpSentMsg, setOtpSentMsg] = useState(""); // State for success message
  const lastSentMobile = useRef(""); // To prevent double sending
  const context = "secured_business_loan"; 

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const mobileNumber = watch("mobileNumber");
  const enteredOtp = watch("otp");

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [currentStep]);

  // Countdown Timer Effect
  useEffect(() => {
    if (otpCountdown <= 0) return;
    const timer = setTimeout(() => setOtpCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [otpCountdown]);

  // Reset verification if mobile changes
  useEffect(() => {
    if (mobileNumber && mobileNumber.length !== 10) {
        setIsMobileVerified(false);
        setOtpToken(null);
        setOtpError("");
        setOtpSentMsg("");
        lastSentMobile.current = "";
    }
  }, [mobileNumber]);

  // --- NEW: Auto-Send OTP when mobile is 10 digits ---
  useEffect(() => {
    const cleanMobile = mobileNumber?.replace(/\D/g, "");
    
    // Only send if: 10 digits, not verified, not currently sending, and not just sent to this number
    if (
      cleanMobile?.length === 10 && 
      !isMobileVerified && 
      !isSendingOtp && 
      !otpToken && 
      lastSentMobile.current !== cleanMobile
    ) {
      // Small debounce to ensure typing stopped
      const timer = setTimeout(() => {
        handleRequestOtp(cleanMobile);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [mobileNumber]);

  // Auto-verify effect (Trigger when 4 digits are entered)
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
      lastSentMobile.current = mobile; // Mark as sent
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
        setOtpSentMsg(""); // Clear sent message once verified if desired, or keep it.
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
    let fieldsToValidate: (keyof FormData)[] = [];
    
    if (currentStep === 1) {
      fieldsToValidate = ["fullName", "email", "mobileNumber", "otp", "dateOfBirth", "state", "city", "pincode"];
      
      if (!isMobileVerified) {
        alert("Please verify your mobile number with OTP to proceed.");
        const isFormValid = await trigger(fieldsToValidate); 
        return;
      }
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const onSubmit = (data: FormData) => {
    if (!isMobileVerified) {
      alert("Mobile number verification is required.");
      return;
    }
    console.log("Form submitted:", data);
    alert("Application submitted successfully!");
  };

  const StepIcon = stepIcons[currentStep - 1];

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl md:rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      
      {/* Headline */}
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 px-3 md:px-6 py-2 md:py-4 border-b border-primary-200">
        <h2 className="text-base md:text-xl lg:text-2xl font-bold text-gray-900 text-center">
          Apply for a Business Loan up to ₹3 Crore
        </h2>
      </div>

      {/* Progress Bar */}
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 px-4 py-2 border-b border-primary-200">
        <div className="flex items-center justify-center">
          <div className="flex items-center w-full max-w-xl px-2">
            {[1, 2].map((step) => {
              const Icon = stepIcons[step - 1];
              const isActive = currentStep === step;
              const isCompleted = currentStep > step;
              
              return (
                <div key={step} className="flex items-center flex-1">
                  <div className="flex flex-col items-center relative z-10">
                    <div
                      className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-500 ${
                        isActive
                          ? "bg-primary border-primary text-white shadow-md shadow-primary/50"
                          : isCompleted
                          ? "bg-secondary-orange border-secondary-orange text-white"
                          : "bg-white border-gray-300 text-gray-400"
                      }`}
                    >
                      {isCompleted ? <Check className="w-3 h-3" /> : <Icon className="w-3 h-3" />}
                    </div>
                    <div className={`mt-1 text-[9px] font-semibold transition-colors text-center ${
                      isActive ? "text-primary" : isCompleted ? "text-secondary-orange" : "text-gray-400"
                    }`}>
                      {stepTitles[step - 1]}
                    </div>
                  </div>
                  {step < totalSteps && (
                    <div className="flex-1 h-0.5 mx-3 relative">
                      <div className="absolute inset-0 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-1000 ease-out rounded-full ${
                            currentStep > step ? "bg-secondary-orange" : "bg-gray-200"
                          }`}
                          style={{ width: currentStep > step ? "100%" : "0%" }}
                        />
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
            <div className={`space-y-3 ${isAnimating ? "animate-slideIn" : ""}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700">Full Name *</label>
                  <input {...register("fullName")} type="text" className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg outline-none focus:border-primary" placeholder="Enter your full name" />
                  {errors.fullName && <p className="text-xs text-primary">{errors.fullName.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700">Email address *</label>
                  <input {...register("email")} type="email" className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg outline-none focus:border-primary" placeholder="Enter your email" />
                  {errors.email && <p className="text-xs text-primary">{errors.email.message}</p>}
                </div>

                {/* MOBILE - AUTO SEND OTP, NO BUTTON */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700">Mobile Number *</label>
                  <div className="relative">
                    <input
                      {...register("mobileNumber")}
                      type="tel"
                      disabled={isMobileVerified}
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
                        if (e.currentTarget.value.length > 10) e.currentTarget.value = e.currentTarget.value.slice(0, 10);
                      }}
                      className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg outline-none focus:border-primary disabled:bg-gray-50"
                      placeholder="Enter mobile number"
                    />
                    {isSendingOtp && (
                         <div className="absolute right-3 top-2.5">
                            <Loader2 className="w-4 h-4 text-primary animate-spin" />
                         </div>
                    )}
                  </div>
                  
                  {/* Messages below Mobile Input */}
                  <div className="h-4"> {/* Fixed height to prevent jumping */}
                    {errors.mobileNumber ? (
                      <p className="text-xs text-primary">{errors.mobileNumber.message}</p>
                    ) : otpSentMsg ? (
                      <p className="text-xs text-green-600 animate-fadeIn">{otpSentMsg}</p>
                    ) : (
                      <p className="text-xs text-gray-500">OTP will be sent to this number for verification</p>
                    )}
                  </div>
                </div>

                {/* OTP FIELD */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700">OTP *</label>
                  <div className="relative">
                    <input
                      {...register("otp")}
                      type="text"
                      maxLength={4} // Limit UI to 4 digits
                      disabled={!otpToken || isMobileVerified}
                      className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg outline-none focus:border-primary disabled:bg-gray-50"
                      placeholder="Enter 4-digit OTP"
                    />
                     {isVerifyingOtp && <div className="absolute right-3 top-2.5"><Loader2 className="w-4 h-4 text-primary animate-spin" /></div>}
                  </div>
                  
                  {/* Messages below OTP Input */}
                  <div className="h-4">
                     {otpError ? (
                        <p className="text-xs text-red-500">{otpError}</p>
                     ) : isMobileVerified ? (
                        <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                            <Check className="w-3 h-3" /> Verified
                        </div>
                     ) : (
                        <p className="text-xs text-gray-500">Enter number to get otp</p>
                     )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700">Date of birth *</label>
                  <input {...register("dateOfBirth")} type="date" className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg outline-none focus:border-primary" />
                  {errors.dateOfBirth && <p className="text-xs text-primary">{errors.dateOfBirth.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700">State *</label>
                  <select
                    {...register("state")}
                    onChange={(e) => { setValue("state", e.target.value); setValue("city", ""); }}
                    className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg outline-none focus:border-primary bg-white"
                  >
                    <option value="">Select State</option>
                    {states.map((state) => <option key={state} value={state}>{state}</option>)}
                  </select>
                  {errors.state && <p className="text-xs text-primary">{errors.state.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700">City *</label>
                  <input type="text" placeholder="Enter your city" {...register("city")} className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg outline-none focus:border-primary" />
                  {errors.city && <p className="text-xs text-primary">{errors.city.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700">Pincode *</label>
                  <input {...register("pincode")} type="text" className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg outline-none focus:border-primary" placeholder="Enter pincode" />
                  {errors.pincode && <p className="text-xs text-primary">{errors.pincode.message}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Business Details */}
          {currentStep === 2 && (
            <div className={`space-y-3 ${isAnimating ? "animate-slideIn" : ""}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700">Loan Amount Required *</label>
                  <input {...register("loanAmount")} type="text" className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg outline-none focus:border-primary" placeholder="Enter loan amount" />
                  {errors.loanAmount && <p className="text-xs text-primary">{errors.loanAmount.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700">Select Constitution *</label>
                  <select {...register("constitution")} className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg outline-none focus:border-primary bg-white">
                    <option value="">Select Constitution</option>
                    {constitutions.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.constitution && <p className="text-xs text-primary">{errors.constitution.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700">Select Ownership Proof *</label>
                  <select {...register("ownershipProof")} className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg outline-none focus:border-primary bg-white">
                    <option value="">Select Ownership Proof</option>
                    {ownershipProofs.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                  {errors.ownershipProof && <p className="text-xs text-primary">{errors.ownershipProof.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700">Years in Business *</label>
                  <select {...register("yearsInBusiness")} className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg outline-none focus:border-primary bg-white">
                    <option value="">Select Years</option>
                    {yearsInBusiness.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                  {errors.yearsInBusiness && <p className="text-xs text-primary">{errors.yearsInBusiness.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700">Annual Turnover *</label>
                  <select {...register("annualTurnover")} className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg outline-none focus:border-primary bg-white">
                    <option value="">Select Turnover</option>
                    {annualTurnovers.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.annualTurnover && <p className="text-xs text-primary">{errors.annualTurnover.message}</p>}
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="block text-xs font-semibold text-gray-700 mb-2">Is Your Business Registered On the GST Portal? *</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input {...register("gstRegistered")} type="radio" value="yes" className="w-4 h-4 text-primary focus:ring-primary" />
                      <span className="text-sm text-gray-700 font-medium group-hover:text-primary transition-colors">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input {...register("gstRegistered")} type="radio" value="no" className="w-4 h-4 text-primary focus:ring-primary" />
                      <span className="text-sm text-gray-700 font-medium group-hover:text-primary transition-colors">No</span>
                    </label>
                  </div>
                  {errors.gstRegistered && <p className="text-xs text-primary mt-1">{errors.gstRegistered.message}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="pt-3 border-t-2 border-gray-100">
            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary-burgundy text-white rounded-lg text-sm font-semibold hover:from-secondary-burgundy transition-all shadow-lg flex items-center justify-center gap-2"
              >
                Apply Now
              </button>
            ) : (
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary-burgundy text-white rounded-lg text-sm font-semibold hover:from-secondary-burgundy transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Apply Now
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronRight, ChevronLeft, Check, User, MapPin, Briefcase, Sparkles } from "lucide-react";

const formSchema = z.object({
  // Step 1: Personal Information
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  mobileNumber: z.string().min(10, "Valid mobile number is required"),
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
const cities: Record<string, string[]> = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  Delhi: ["New Delhi", "Noida", "Gurgaon"],
  Karnataka: ["Bangalore", "Mysore", "Hubli"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
  Rajasthan: ["Jaipur", "Jodhpur", "Udaipur"],
};

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

  const selectedState = watch("state");
  const availableCities = selectedState ? cities[selectedState] || [] : [];

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [currentStep]);

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];
    
    if (currentStep === 1) {
      fieldsToValidate = ["fullName", "email", "mobileNumber", "otp", "dateOfBirth", "state", "city", "pincode"];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: FormData) => {
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

      {/* Enhanced Progress Bar */}
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 px-4 py-2 border-b border-primary-200">
        <div className="flex items-center justify-center">
          <div className="flex items-center w-full max-w-xl px-2">
            {[1, 2].map((step) => {
              const Icon = stepIcons[step - 1];
              const isActive = currentStep === step;
              const isCompleted = currentStep > step;
              
              return (
                <div key={step} className="flex items-center flex-1">
                  {/* Step Circle */}
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
                      {isCompleted ? (
                        <Check className="w-3 h-3 animate-scaleIn" />
                      ) : (
                        <Icon className="w-3 h-3 transition-all" />
                      )}
                    </div>
                    <div className={`mt-1 text-[9px] font-semibold transition-colors text-center whitespace-nowrap ${
                      isActive ? "text-primary" : isCompleted ? "text-secondary-orange" : "text-gray-400"
                    }`}>
                      {stepTitles[step - 1]}
                    </div>
                  </div>
                  
                  {/* Connecting Line */}
                  {step < totalSteps && (
                    <div className="flex-1 h-0.5 mx-3 relative">
                      <div className="absolute inset-0 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-1000 ease-out rounded-full ${
                            currentStep > step ? "bg-secondary-orange" : "bg-gray-200"
                          }`}
                          style={{
                            width: currentStep > step ? "100%" : "0%",
                          }}
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
                  <label className="block text-xs font-semibold text-gray-700">
                    Full name <span className="text-primary">*</span>
                  </label>
                  <input
                    {...register("fullName")}
                    type="text"
                    className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 hover:border-gray-300"
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-primary animate-fadeIn">{errors.fullName.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700">
                    Email address <span className="text-primary">*</span>
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 hover:border-gray-300"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-xs text-primary animate-fadeIn">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700">
                    Mobile number <span className="text-primary">*</span>
                  </label>
                  <input
                    {...register("mobileNumber")}
                    type="tel"
                    className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 hover:border-gray-300"
                    placeholder="Enter mobile number"
                  />
                  {errors.mobileNumber && (
                    <p className="text-xs text-primary animate-fadeIn">{errors.mobileNumber.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700">
                    OTP <span className="text-primary">*</span>
                  </label>
                  <input
                    {...register("otp")}
                    type="text"
                    className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 hover:border-gray-300"
                    placeholder="Enter OTP"
                  />
                  {errors.otp && (
                    <p className="text-xs text-primary animate-fadeIn">{errors.otp.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700">
                    Date of birth <span className="text-primary">*</span>
                  </label>
                  <input
                    {...register("dateOfBirth")}
                    type="date"
                    className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 hover:border-gray-300"
                  />
                  {errors.dateOfBirth && (
                    <p className="text-xs text-primary animate-fadeIn">{errors.dateOfBirth.message}</p>
                  )}
                </div>

                {/* State Dropdown (Unchanged logic) */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700">
                    State <span className="text-primary">*</span>
                  </label>
                  <select
                    {...register("state")}
                    onChange={(e) => {
                      setValue("state", e.target.value);
                      // Optional: clear city when state changes if you want them to re-type
                      setValue("city", ""); 
                    }}
                    className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 hover:border-gray-300 appearance-none bg-white cursor-pointer"
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="text-xs text-primary animate-fadeIn">{errors.state.message}</p>
                  )}
                </div>

                {/* City Input (Changed to Text Input) */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700">
                    City <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your city"
                    {...register("city")}
                    className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 hover:border-gray-300 outline-none"
                  />
                  {errors.city && (
                    <p className="text-xs text-primary animate-fadeIn">{errors.city.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700">
                    Pincode <span className="text-primary">*</span>
                  </label>
                  <input
                    {...register("pincode")}
                    type="text"
                    className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 hover:border-gray-300"
                    placeholder="Enter pincode"
                  />
                  {errors.pincode && (
                    <p className="text-xs text-primary animate-fadeIn">{errors.pincode.message}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Business Details */}
          {currentStep === 2 && (
            <div className={`space-y-3 ${isAnimating ? "animate-slideIn" : ""}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700">
                    Loan Amount Required <span className="text-primary">*</span>
                  </label>
                  <input
                    {...register("loanAmount")}
                    type="text"
                    className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 hover:border-gray-300"
                    placeholder="Enter loan amount"
                  />
                  {errors.loanAmount && (
                    <p className="text-xs text-primary animate-fadeIn">{errors.loanAmount.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700">
                    Select Constitution <span className="text-primary">*</span>
                  </label>
                  <select
                    {...register("constitution")}
                    className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 hover:border-gray-300 appearance-none bg-white cursor-pointer"
                  >
                    <option value="">Select Constitution</option>
                    {constitutions.map((constitution) => (
                      <option key={constitution} value={constitution}>
                        {constitution}
                      </option>
                    ))}
                  </select>
                  {errors.constitution && (
                    <p className="text-xs text-primary animate-fadeIn">{errors.constitution.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700">
                    Select Ownership Proof <span className="text-primary">*</span>
                  </label>
                  <select
                    {...register("ownershipProof")}
                    className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 hover:border-gray-300 appearance-none bg-white cursor-pointer"
                  >
                    <option value="">Select Ownership Proof</option>
                    {ownershipProofs.map((proof) => (
                      <option key={proof} value={proof}>
                        {proof}
                      </option>
                    ))}
                  </select>
                  {errors.ownershipProof && (
                    <p className="text-xs text-primary animate-fadeIn">{errors.ownershipProof.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700">
                    Select no. of Years in Business <span className="text-primary">*</span>
                  </label>
                  <select
                    {...register("yearsInBusiness")}
                    className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 hover:border-gray-300 appearance-none bg-white cursor-pointer"
                  >
                    <option value="">Select Years</option>
                    {yearsInBusiness.map((years) => (
                      <option key={years} value={years}>
                        {years}
                      </option>
                    ))}
                  </select>
                  {errors.yearsInBusiness && (
                    <p className="text-xs text-primary animate-fadeIn">{errors.yearsInBusiness.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700">
                    Select Annual Turnover <span className="text-primary">*</span>
                  </label>
                  <select
                    {...register("annualTurnover")}
                    className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 hover:border-gray-300 appearance-none bg-white cursor-pointer"
                  >
                    <option value="">Select Turnover</option>
                    {annualTurnovers.map((turnover) => (
                      <option key={turnover} value={turnover}>
                        {turnover}
                      </option>
                    ))}
                  </select>
                  {errors.annualTurnover && (
                    <p className="text-xs text-primary animate-fadeIn">{errors.annualTurnover.message}</p>
                  )}
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Is Your Business Registered On the GST Portal? <span className="text-primary">*</span>
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        {...register("gstRegistered")}
                        type="radio"
                        value="yes"
                        className="w-4 h-4 text-primary focus:ring-primary cursor-pointer"
                      />
                      <span className="text-sm text-gray-700 font-medium group-hover:text-primary transition-colors">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        {...register("gstRegistered")}
                        type="radio"
                        value="no"
                        className="w-4 h-4 text-primary focus:ring-primary cursor-pointer"
                      />
                      <span className="text-sm text-gray-700 font-medium group-hover:text-primary transition-colors">No</span>
                    </label>
                  </div>
                  {errors.gstRegistered && (
                    <p className="text-xs text-primary animate-fadeIn mt-1">{errors.gstRegistered.message}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Apply Now Button - Full Width */}
          <div className="pt-3 border-t-2 border-gray-100">
            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary-burgundy text-white rounded-lg text-sm font-semibold hover:from-secondary-burgundy hover:to-secondary-burgundy transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
              >
                {/* <Sparkles className="w-4 h-4" /> */}
                Apply Now
              </button>
            ) : (
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary-burgundy text-white rounded-lg text-sm font-semibold hover:from-secondary-burgundy hover:to-secondary-burgundy transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
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

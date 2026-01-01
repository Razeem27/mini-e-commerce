"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import OTPInput from "./OTPInput";

type Step = 'phone' | 'otp' | 'register'

const formStateHeading = {
    phone: "Log in",
    otp: "Verify Phone",
    register:"Welcome , You are?"
}

export default function LoginForm() {
      const [step, setStep] = useState<Step>("phone");
      const [phone, setPhone] = useState("");
      const [otp, setOtp] = useState("");
      const [name, setName] = useState("");
      const [receivedOtp, setReceivedOtp] = useState("");
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState("");

      const router = useRouter();

    const handleOtpSubmit = () => {
        console.log("otp submit")
        setStep("register");

    }
    const handlePhoneSubmit = () => {
        console.log("phone number submitted")
        setStep("otp")
    }

    const handleRegister = () => {
        console.log("user registered")
    }

    
  return (
    <div className="w-full max-w-md">
      {/* Heading */}
          <h1 className="text-white text-3xl font-semibold mb-8 text-center">{formStateHeading[step] }</h1>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Phone Number Step */}
      {step === "phone" && (
        <form onSubmit={handlePhoneSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="phone"
              className="block text-white text-sm font-medium mb-2"
            >
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="Enter Phone"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full bg-neutral-800 text-white border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors placeholder:text-neutral-500"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Continue"}
          </button>
        </form>
      )}

      {/* OTP Verification Step (Existing User) */}
      {step === "otp" && (
        <form onSubmit={handleOtpSubmit} className="space-y-6">
          <OTPInput
            length={4}
            onChange={setReceivedOtp}
            phoneNumber={phone}
            value=""
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <button
            type="button"
            onClick={() => setStep("phone")}
            className="w-full text-white text-sm hover:text-gray-300 transition-colors"
          >
            ← Back to Phone Number
          </button>
        </form>
      )}

      {/* Registration Step (New User) */}
      {step === "register" && (
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-white text-sm font-medium mb-2"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-neutral-800 text-white border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors placeholder:text-neutral-500"
              required
              disabled={loading}
            />
          </div>


          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Complete Registration"}
          </button>

          <button
            type="button"
            onClick={() => setStep("phone")}
            className="w-full text-white text-sm hover:text-gray-300 transition-colors"
          >
            ← Back to Phone Number
          </button>
        </form>
      )}
    </div>
  );
}

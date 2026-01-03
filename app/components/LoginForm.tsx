"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import OTPInput from "./OTPInput";
import PhoneStep from "./PhoneStep";
import OtpStep from "./OtpStep";
import RegisterStep from "./RegisterStep";
import { useAuth } from "../context/AuthContext";

type Step = "phone" | "otp" | "register";

const formStateHeading = {
  phone: "Log in",
  otp: "Verify Phone",
  register: "Welcome , You are?",
};

// Extracted style constants for better maintainability
const INPUT_CLASSES =
  "w-full bg-neutral-800 text-white border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors placeholder:text-neutral-500";
const BUTTON_CLASSES =
  "w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed";
const BACK_BUTTON_CLASSES =
  "w-full text-white text-sm hover:text-gray-300 transition-colors";

export default function LoginForm() {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [serverOtp, setServerOtp] = useState("");
  const [isExistingUser, setIsExistingUser] = useState("");
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [receivedOtp, setReceivedOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { loginSuccess } = useAuth();
  const storeToken = async (token: string) => {
    return await fetch("/api/auth/set-cookie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
  };

  const verifyOtp = async () => {
    setLoading(true);
    if (receivedOtp !== serverOtp) {
      setError("Invalid OTP");
      return;
    }
    // New user → collect name
    if (!isExistingUser) {
      setStep("register");
      return;
    }

    // existing user
    try {
      await storeToken(token);
      loginSuccess(); // Update context state after successful login
      router.push("/");
    } catch (error) {
      setError("Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyUser = async () => {
    setLoading(true);
    const res = await fetch("/api/verify/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone_number: phone }),
    });
    const data = await res.json();
    setServerOtp(data.otp);
    setIsExistingUser(data.user);
    if (data.user && data.token?.access) {
      setToken(data.token.access);
    }
    setLoading(false);
  };

  const handleOtpSubmit = async () => {
    if (receivedOtp?.length < 4) {
      setError("Enter 4-digit code");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await verifyOtp();
    } catch (error) {
      setError("Verification failed");
    } finally {
      setLoading(false);
    }
  };
  const handlePhoneSubmit = async () => {
    if (phone.length < 10) {
      setError("Please enter a valid phone number (10 digits)");
      return;
    }
    setLoading(true);
    try {
      await verifyUser();
      setStep("otp");
    } catch (error) {
      setError("Failed to verify phone number");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    // User registration logic here
    setLoading(true);
    try {
      const res = await fetch("/api/login-register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone_number: phone,
        }),
      });
      const data = await res.json();
      await storeToken(data.token.access);
      loginSuccess(); // Update context state after successful login
      router.push("/");
    } catch (error) {
      setError("verification Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md flex flex-col justify-center border">
      {/* Heading */}
      <h1 className="text-white text-3xl font-semibold mb-8 text-center">
        {formStateHeading[step]}
      </h1>
      {/* Phone Number Step */}
      {step === "phone" && (
        <PhoneStep
          phone={phone}
          setPhone={setPhone}
          loading={loading}
          onSubmit={handlePhoneSubmit}
          error={error}
        />
      )}

      {/* OTP Verification Step (Existing User) */}
      {step === "otp" && (
        <OtpStep
          phone={phone}
          otp={receivedOtp}
          setOtp={setReceivedOtp}
          loading={loading}
          onSubmit={handleOtpSubmit}
          onBack={() => setStep("phone")}
          error={error}
        />
      )}

      {/* Registration Step (New User) */}
      {step === "register" && (
        <RegisterStep
          name={name}
          setName={setName}
          loading={loading}
          onSubmit={handleRegister}
          onBack={() => setStep("phone")}
        />
      )}
    </div>
  );
}

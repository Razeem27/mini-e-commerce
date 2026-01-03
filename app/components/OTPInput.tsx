"use client";

import {
  useRef,
  useState,
  useEffect,
  KeyboardEvent,
  ClipboardEvent,
} from "react";

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  phoneNumber?: string;
}

export default function OTPInput({
  length = 4,
  value,
  onChange,
  phoneNumber,
}: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const [countdown, setCountdown] = useState(40); 
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize OTP from value prop
  useEffect(() => {
    if (value) {
      const otpArray = value.split("").slice(0, length);
      const paddedArray = [
        ...otpArray,
        ...Array(length - otpArray.length).fill(""),
      ];
      setOtp(paddedArray);
    }
  }, [value, length]);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (index: number, digit: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(digit)) return;

    const newOtp = [...otp];
    newOtp[index] = digit.slice(-1); // Take only last digit
    setOtp(newOtp);

    // Update parent component
    onChange(newOtp.join(""));


    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // If current input is empty, move to previous and clear it
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        onChange(newOtp.join(""));
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        onChange(newOtp.join(""));
      }
    }

    // Handle arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, length);

    if (!/^\d+$/.test(pastedData)) return; // Only allow numbers

    const newOtp = pastedData
      .split("")
      .concat(Array(length).fill(""))
      .slice(0, length);
    setOtp(newOtp);
    onChange(newOtp.join(""));

    // Focus last filled input
    const lastFilledIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[lastFilledIndex]?.focus();
  };

  const handleResendOTP = () => {
    setCountdown(35);
      // Call resend OTP API here
  };

  return (
    <div className="space-y-6">
      {/* Header with phone number */}
      {phoneNumber && (
        <p className="text-gray-400 text-sm">
          Enter the OTP sent to{" "}
          <button className="text-white underline hover:text-gray-300">
            {phoneNumber}
          </button>
        </p>
      )}

      {/* Label */}
      <div>
        <label className="block text-white text-sm font-medium mb-3">
          Enter OTP
        </label>

        {/* OTP Input Boxes */}
        <div className="flex gap-3 justify-start">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className={`
                w-16 h-16 
                bg-neutral-800 
                text-white text-2xl font-semibold text-center
                border-2 rounded-lg
                focus:outline-none focus:border-white
                transition-all
                ${digit ? "border-white" : "border-neutral-700"}
              `}
              autoFocus={index === 0}
            />
          ))}
        </div>
      </div>

      {/* Resend OTP Timer */}
      <div className="text-left">
        {countdown > 0 ? (
          <p className="text-gray-400 text-sm">
            Resend OTP in:{" "}
            <span className="text-white font-semibold">{countdown}s</span>
          </p>
        ) : (
          <button
            onClick={handleResendOTP}
            className="text-white text-sm hover:text-gray-300 transition-colors underline"
          >
            Resend OTP
          </button>
        )}
      </div>
    </div>
  );
}

import OTPInput from "./OTPInput";

interface OtpStepProps {
  phone: string;
  otp: string;
  setOtp: (value: string) => void;
  loading: boolean;
  onSubmit: () => void;
  onBack: () => void;
  error:string;
}

// Import style constants
const BUTTON_CLASSES = "w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed";
const BACK_BUTTON_CLASSES = "w-full text-white text-sm hover:text-gray-300 transition-colors";

export default function OtpStep({ phone,error, otp, setOtp, loading, onSubmit, onBack }: OtpStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <OTPInput length={4} onChange={setOtp} phoneNumber={phone} value={otp} />
      {error && (
        <div className=" text-red-500">
          {error}
        </div>
      )}
      <button type="submit" disabled={loading} className={BUTTON_CLASSES}>
        {loading ? "Verifying..." : "Verify OTP"}
      </button>

      <button type="button" onClick={onBack} className={BACK_BUTTON_CLASSES}>
        ← Back to Phone Number
      </button>
    </form>
  );
}
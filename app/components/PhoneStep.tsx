interface PhoneStepProps {
  phone: string;
  setPhone: (value: string) => void;
  loading: boolean;
  onSubmit: () => void;
  error?: string; // Add error prop for inline validation display
}

// Import style constants from LoginForm (could be moved to shared constants file)
const INPUT_CLASSES =
  "w-full bg-neutral-800 text-white border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors placeholder:text-neutral-500";
const BUTTON_CLASSES =
  "w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed";

export default function PhoneStep({
  phone,
  setPhone,
  loading,
  onSubmit,
  error,
}: PhoneStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Display validation error if passed as prop */}
      {error && (
        <div className="border-red-500 text-red-500">
          {error}
        </div>
      )}

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
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} // Only allow numbers
          className={INPUT_CLASSES}
          required
          disabled={loading}
          maxLength={10}
        />
      </div>

      <button type="submit" disabled={loading} className={BUTTON_CLASSES}>
        {loading ? "Sending..." : "Continue"}
      </button>
    </form>
  );
}

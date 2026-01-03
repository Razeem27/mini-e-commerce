interface RegisterStepProps {
  name: string;
  setName: (value: string) => void;
  loading: boolean;
  onSubmit: () => void;
  onBack: () => void;
}

// Import style constants
const INPUT_CLASSES = "w-full bg-neutral-800 text-white border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors placeholder:text-neutral-500";
const BUTTON_CLASSES = "w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed";
const BACK_BUTTON_CLASSES = "w-full text-white text-sm hover:text-gray-300 transition-colors";

export default function RegisterStep({ name, setName, loading, onSubmit, onBack }: RegisterStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-white text-sm font-medium mb-2">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={INPUT_CLASSES}
          required
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={BUTTON_CLASSES}
      >
        {loading ? "Creating Account..." : "Complete Registration"}
      </button>

      <button
        type="button"
        onClick={onBack}
        className={BACK_BUTTON_CLASSES}
      >
        ← Back to Phone Number
      </button>
    </form>
  );
}
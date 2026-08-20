"use client";

type Props = {
  loading: boolean;
  onCancel: () => void;
};

export default function FormActions({ loading, onCancel }: Props) {
  return (
    <div className="flex justify-end gap-3 border-t pt-5">
      <button
        type="button"
        onClick={onCancel}
        disabled={loading}
        className="rounded-xl border px-6 py-3 text-sm hover:bg-gray-50 disabled:opacity-50"
      >
        Cancel
      </button>

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-black px-7 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}

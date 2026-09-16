"use client";

type Props = {
  loading: boolean;
  onCancel: () => void;
};

export default function FormActions({ loading, onCancel }: Props) {
  return (
    <div className="flex justify-end gap-2 border-t pt-3">
      <button
        type="button"
        onClick={onCancel}
        disabled={loading}
        className="rounded-lg border px-5 py-2 text-sm transition hover:bg-gray-50 disabled:opacity-50"
      >
        Cancel
      </button>

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-black px-6 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}

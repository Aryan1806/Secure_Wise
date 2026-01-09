import { useState } from "react";
import { Modal } from "./Modal";

interface AddContributionModalProps {
  open: boolean;
  goalName: string;
  currency: string;
  onClose: () => void;
  onAdd: (amount: number, date: string) => void;
}

export function AddContributionModal({
  open,
  goalName,
  currency,
  onClose,
  onAdd,
}: AddContributionModalProps) {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit() {
    const parsedAmount = Number(amount);

    if (!parsedAmount || parsedAmount <= 0) {
      setError("Amount must be greater than zero");
      return;
    }

    if (!date) {
      setError("Date is required");
      return;
    }

    onAdd(parsedAmount, date);
    resetAndClose();
  }

  function resetAndClose() {
    setAmount("");
    setDate("");
    setError(null);
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={resetAndClose}
      title={`💰 Add Contribution — ${goalName}`}
    >
      <div className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-600 flex items-center gap-2">
              <span>⚠️</span>
              {error}
            </p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contribution Amount
          </label>
          <input
            type="number"
            placeholder={`Enter amount in ${currency}`}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={resetAndClose}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="btn-primary"
          >
            ➕ Add Contribution
          </button>
        </div>
      </div>
    </Modal>
  );
}

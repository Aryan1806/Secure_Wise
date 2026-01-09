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
<<<<<<< HEAD
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

=======
      title={`Add Contribution`}
    >
      <div className="space-y-5">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-800 font-medium">
            Contributing to: <span className="font-bold">{goalName}</span>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Amount ({currency})
          </label>
          <input
            type="number"
            placeholder={`Enter amount in ${currency}`}
            className="input-field"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Contribution Date
          </label>
          <input
            type="date"
            className="input-field"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>

>>>>>>> 2b8a78b1032edaccf284f3a5ba4b778ab97a88a6
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
<<<<<<< HEAD
            ➕ Add Contribution
=======
            Add Contribution
>>>>>>> 2b8a78b1032edaccf284f3a5ba4b778ab97a88a6
          </button>
        </div>
      </div>
    </Modal>
  );
}

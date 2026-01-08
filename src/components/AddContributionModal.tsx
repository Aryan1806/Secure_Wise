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
            Add Contribution
          </button>
        </div>
      </div>
    </Modal>
  );
}

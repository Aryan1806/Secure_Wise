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
      title={`Add Contribution — ${goalName}`}
    >
      <div className="space-y-4">
        {error && <p className="text-sm text-red-600">{error}</p>}

        <input
          type="number"
          placeholder={`Amount (${currency})`}
          className="w-full rounded border p-2"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />

        <input
          type="date"
          className="w-full rounded border p-2"
          value={date}
          onChange={e => setDate(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={resetAndClose}
            className="px-4 py-2 text-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="rounded bg-black px-4 py-2 text-white"
          >
            Add
          </button>
        </div>
      </div>
    </Modal>
  );
}

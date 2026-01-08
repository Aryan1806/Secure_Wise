import { useState } from "react";
import { Modal } from "./Modal";
import { Currency } from "../types/goal";

interface AddGoalModalProps {
  open: boolean;
  onClose: () => void;
  onAddGoal: (name: string, amount: number, currency: Currency) => void;
}

export function AddGoalModal({
  open,
  onClose,
  onAddGoal,
}: AddGoalModalProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit() {
    const parsedAmount = Number(amount);

    if (!name.trim()) {
      setError("Goal name is required");
      return;
    }

    if (!parsedAmount || parsedAmount <= 0) {
      setError("Target amount must be greater than zero");
      return;
    }

    onAddGoal(name.trim(), parsedAmount, currency);
    resetAndClose();
  }

  function resetAndClose() {
    setName("");
    setAmount("");
    setCurrency("USD");
    setError(null);
    onClose();
  }

  return (
    <Modal open={open} onClose={resetAndClose} title="Add Goal">
      <div className="space-y-4">
        {error && <p className="text-sm text-red-600">{error}</p>}

        <input
          className="w-full rounded border p-2"
          placeholder="Goal name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          className="w-full rounded border p-2"
          placeholder="Target amount"
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />

        <select
          className="w-full rounded border p-2"
          value={currency}
          onChange={e => setCurrency(e.target.value as Currency)}
        >
          <option value="USD">USD</option>
          <option value="INR">INR</option>
          <option value="EUR">EUR</option>
        </select>

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
            Add Goal
          </button>
        </div>
      </div>
    </Modal>
  );
}

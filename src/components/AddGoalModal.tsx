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
    <Modal open={open} onClose={resetAndClose} title="Create New Goal">
      <div className="space-y-5">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Goal Name
          </label>
          <input
            className="input-field"
            placeholder="e.g., New Car, Vacation, Emergency Fund"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Target Amount
          </label>
          <input
            className="input-field"
            placeholder="10000"
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Currency
          </label>
          <select
            className="input-field"
            value={currency}
            onChange={e => setCurrency(e.target.value as Currency)}
          >
            <option value="USD">USD - US Dollar</option>
            <option value="INR">INR - Indian Rupee</option>
            <option value="EUR">EUR - Euro</option>
          </select>
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
            Create Goal
          </button>
        </div>
      </div>
    </Modal>
  );
}

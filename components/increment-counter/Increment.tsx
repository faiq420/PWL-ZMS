import { useState, useEffect } from "react";

interface IncrementCounterProps {
  initialValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  onIncrement?: (value: number) => void;
  onDecrement?: (value: number) => void;
}

export default function IncrementCounter({
  initialValue = 0,
  min = 0,
  max = Infinity,
  onChange,
  onIncrement,
  onDecrement,
}: IncrementCounterProps) {
  const [count, setCount] = useState<number>(initialValue);

  useEffect(() => {
    onChange?.(count);
  }, [count]);

  const increment = () => {
    if (count < max) {
      const newCount = count + 1;
      setCount(newCount);
      onIncrement?.(newCount);
    }
  };

  const decrement = () => {
    if (count > min) {
      const newCount = count - 1;
      setCount(newCount);
      onDecrement?.(newCount);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button
        className="px-3 py-1 bg-gray-200 rounded"
        onClick={decrement}
        disabled={count <= min}
      >
        -
      </button>
      <span className="text-lg font-semibold">{count}</span>
      <button
        className="px-3 py-1 bg-gray-200 rounded"
        onClick={increment}
        disabled={count >= max}
      >
        +
      </button>
    </div>
  );
}

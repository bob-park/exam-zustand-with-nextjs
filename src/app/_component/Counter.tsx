'use client';

import { useStore } from '@/store/rootStore';

export default function Counter() {
  const count = useStore((state) => state.count);
  const increaseCount = useStore((state) => state.increase);
  const decreaseCount = useStore((state) => state.decrease);

  // handle
  const handleIncrease = () => {
    increaseCount();
  };

  const handleDecrease = () => {
    decreaseCount();
  };

  return (
    <div className="flex flex-col gap-2">
      <div>count : {count}</div>

      <div className="flex gap-2">
        <button
          className="btn btn-circle"
          type="button"
          onClick={handleIncrease}
        >
          +
        </button>
        <button
          className="btn btn-circle"
          type="button"
          onClick={handleDecrease}
        >
          -
        </button>
      </div>
    </div>
  );
}

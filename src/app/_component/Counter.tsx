'use client';

import { actions, useStore } from '@/store/rootStore';

export default function Counter() {
  const count = useStore().counter.count();

  // handle
  const handleIncrease = () => {
    actions.counter.increase();
  };

  const handleDecrease = () => {
    actions.counter.decrease();
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

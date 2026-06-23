import { motion } from "motion/react";

export function ExecutionChart({ values }: { values: number[] }) {
  const max = Math.max(...values);
  return (
    <div className="flex h-56 items-end gap-2">
      {values.map((value, index) => (
        <motion.div
          key={`${value}-${index}`}
          initial={{ height: 0 }}
          animate={{ height: `${(value / max) * 100}%` }}
          transition={{ duration: 0.28, delay: index * 0.02 }}
          className="min-h-6 flex-1 rounded-t-lg bg-primary"
        />
      ))}
    </div>
  );
}


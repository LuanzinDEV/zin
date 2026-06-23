import { useState } from "react";
import { cn } from "../../lib/utils";

export function BrandLogo({ compact = false }: { compact?: boolean }) {
  const [missing, setMissing] = useState(false);
  return (
    <div className="flex min-h-10 items-center gap-3">
      {!missing ? (
        <img
          src="/brand/zin-logo-horizontal.png"
          alt="ZIN"
          className={cn("max-h-10 w-auto object-contain", compact && "max-w-10")}
          onError={() => setMissing(true)}
        />
      ) : (
        <div className="flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-zin-navy-800 text-lg font-black text-white">
            Z
          </div>
          {!compact ? <span className="font-display text-xl font-bold text-text-primary">ZIN</span> : null}
        </div>
      )}
    </div>
  );
}


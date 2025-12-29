"use client";

import { useEffect, useState } from "react";

const timezones = [
  { city: "JAKARTA", zone: "Asia/Jakarta", code: "ID" },
  { city: "SINGAPORE", zone: "Asia/Singapore", code: "SG" },
  { city: "KUALA LUMPUR", zone: "Asia/Kuala_Lumpur", code: "MY" },
  { city: "HO CHI MINH", zone: "Asia/Ho_Chi_Minh", code: "VN" },
  { city: "TOKYO", zone: "Asia/Tokyo", code: "JP" },
];

export default function WorldClock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return <div className="animate-pulse text-xs text-accent">SYNCING SATELLITES...</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
      {timezones.map((tz) => (
        <div key={tz.code} className="flex justify-between items-center border border-white/5 bg-white/5 p-2 px-3 backdrop-blur-sm hover:border-accent/30 transition-colors group">
            <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-gray-500 font-bold w-6">{tz.code}</span>
                <span className="text-[10px] font-mono text-gray-300 group-hover:text-white transition-colors">{tz.city}</span>
            </div>
            <div className="text-xs font-mono text-accent">
                {time.toLocaleTimeString("en-US", { 
                    timeZone: tz.zone, 
                    hour: '2-digit', 
                    minute: '2-digit', 
                    hour12: false 
                })}
            </div>
        </div>
      ))}
    </div>
  );
}

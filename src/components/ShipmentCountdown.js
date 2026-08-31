"use client";

import { useEffect, useMemo, useState } from "react";

const emptyTime = { days: 0, hours: 0, minutes: 0, seconds: 0 };

function calculateTime(target) {
  const remaining = Math.max(0, target - Date.now());
  return {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor((remaining / 3600000) % 24),
    minutes: Math.floor((remaining / 60000) % 60),
    seconds: Math.floor((remaining / 1000) % 60)
  };
}

export default function ShipmentCountdown({ targetDate = "" }) {
  const target = useMemo(() => {
    if (!targetDate) return null;
    const parsed = new Date(targetDate).getTime();
    return Number.isFinite(parsed) ? parsed : null;
  }, [targetDate]);
  const [time, setTime] = useState(emptyTime);

  useEffect(() => {
    if (!target) {
      setTime(emptyTime);
      return undefined;
    }

    const update = () => setTime(calculateTime(target));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  const units = [
    ["Days", time.days],
    ["Hours", time.hours],
    ["Minutes", time.minutes],
    ["Seconds", time.seconds]
  ];

  return (
    <div className={`shipment-countdown ${target ? "is-scheduled" : "is-awaiting-date"}`}>
      <div className="shipment-countdown-heading">
        <span>Free-book shipment</span>
        <strong>{target ? "Our next shipment leaves in" : "Our next shipment"}</strong>
      </div>
      <div className="shipment-countdown-grid" aria-live="polite">
        {units.map(([label, value]) => (
          <div key={label}>
            <strong>{String(value).padStart(2, "0")}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <p>
        {target
          ? "Every contribution helps move more financial-literacy books toward classrooms."
          : "Shipment timing is being finalized. The live countdown will begin when the date is confirmed."}
      </p>
    </div>
  );
}

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
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    if (!target) {
      setTime(emptyTime);
      return undefined;
    }

    const update = () => {
      setTime(calculateTime(target));
      setPassed(Date.now() >= target);
    };
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  const live = Boolean(target) && !passed;

  const units = [
    ["Days", time.days],
    ["Hours", time.hours],
    ["Minutes", time.minutes],
    ["Seconds", time.seconds]
  ];

  return (
    <div className={`shipment-countdown ${live ? "is-scheduled" : "is-awaiting-date"}`}>
      <div className="shipment-countdown-heading">
        <span>Free-book shipment</span>
        <strong>{live ? "Our next shipment leaves in" : "Our next shipment"}</strong>
      </div>
      {live ? (
        <div className="shipment-countdown-grid" aria-live="polite">
          {units.map(([label, value]) => (
            <div key={label}>
              <strong>{String(value).padStart(2, "0")}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      ) : null}
      <p>
        {live
          ? "Free financial-literacy books are on their way to classrooms."
          : "We’re setting the date for our next free-book shipment. Check back soon."}
      </p>
    </div>
  );
}

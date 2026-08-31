"use client";

import { useMemo, useState } from "react";
import Icon from "./Icon";

const amounts = [25, 50, 100, 200];

export default function DonationWidget() {
  const [frequency, setFrequency] = useState("One time");
  const [amount, setAmount] = useState(50);

  const impact = useMemo(() => {
    if (amount <= 25) return "helps put a creative activity into a learner’s hands";
    if (amount <= 50) return "supports materials for a small-group crisis lab";
    if (amount <= 100) return "helps expand a discussion-led classroom workshop";
    return "moves free financial education into more classrooms";
  }, [amount]);

  return (
    <div className="donation-widget">
      <div className="donation-heading">
        <span className="micro-label">Design your support</span>
        <h2>Help the next learner make a confident choice.</h2>
      </div>

      <div className="donation-field">
        <span>Frequency</span>
        <div className="segmented-control">
          {["One time", "Monthly", "Yearly"].map((option) => (
            <button
              className={frequency === option ? "is-active" : ""}
              key={option}
              onClick={() => setFrequency(option)}
              type="button"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="donation-field">
        <span>Amount</span>
        <div className="amount-grid">
          {amounts.map((value) => (
            <button
              className={amount === value ? "is-active" : ""}
              key={value}
              onClick={() => setAmount(value)}
              type="button"
            >
              ${value}
            </button>
          ))}
          <label className={!amounts.includes(amount) ? "is-active" : ""}>
            <span>$</span>
            <input
              aria-label="Custom donation amount"
              min="1"
              onChange={(event) =>
                setAmount(Math.max(0, Number(event.target.value)))
              }
              placeholder="Other"
              type="number"
              value={amounts.includes(amount) ? "" : amount || ""}
            />
          </label>
        </div>
      </div>

      <div className="donation-impact">
        <span className="impact-icon"><Icon name="spark" /></span>
        <p>
          <strong>Your {frequency.toLowerCase()} ${amount || 0} gift</strong>
          {impact}.
        </p>
      </div>

      <a
        className="button button-gold donation-submit"
        href="https://www.fingoose.com/donate"
        target="_blank"
        rel="noreferrer"
      >
        Continue to secure giving <Icon name="external" />
      </a>
      <p className="donation-note">
        Giving is completed through FinGoose’s existing secure donation page.
        Your selection here is a preview and is not a charge.
      </p>
    </div>
  );
}

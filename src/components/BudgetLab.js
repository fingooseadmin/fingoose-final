"use client";

import { useMemo, useState } from "react";
import Icon from "./Icon";

const initial = { save: 40, needs: 50, fun: 30 };

export default function BudgetLab({ compact = false }) {
  const [budget, setBudget] = useState(initial);
  const [crisis, setCrisis] = useState(false);
  const income = 120;
  const needsMinimum = crisis ? 70 : 50;
  const total = budget.save + budget.needs + budget.fun;
  const remaining = income - total;

  const status = useMemo(() => {
    if (remaining < 0) {
      return {
        label: "Over budget",
        detail: `Move $${Math.abs(remaining)} to get back on track.`,
        tone: "danger"
      };
    }
    if (budget.needs < needsMinimum) {
      return {
        label: "Needs gap",
        detail: `Your essentials need $${needsMinimum - budget.needs} more.`,
        tone: "warn"
      };
    }
    if (budget.save >= 30 && remaining >= 0) {
      return {
        label: "Plan resilient",
        detail: `${Math.round((budget.save / income) * 100)}% saved and every dollar has a job.`,
        tone: "good"
      };
    }
    return {
      label: "Almost balanced",
      detail: "Try protecting at least $30 for your future self.",
      tone: "warn"
    };
  }, [budget, needsMinimum, remaining]);

  function update(key, value) {
    setBudget((current) => ({ ...current, [key]: Number(value) }));
  }

  return (
    <div className={`budget-lab ${compact ? "is-compact" : ""}`}>
      <div className="lab-topline">
        <div>
          <span className="micro-label">Interactive crisis lab</span>
          <h3>Give every dollar a job.</h3>
        </div>
        <div className="lab-income">
          <span>Monthly money</span>
          <strong>${income}</strong>
        </div>
      </div>

      <div className="lab-scenario">
        <div className={`scenario-icon ${crisis ? "is-alert" : ""}`}>
          <Icon name={crisis ? "shield" : "spark"} />
        </div>
        <p>
          {crisis
            ? "Surprise: your bus pass increased by $20. Rebuild the plan without going negative."
            : "You earned $120 this month. Build a plan that covers today and protects tomorrow."}
        </p>
        <button type="button" onClick={() => setCrisis((current) => !current)}>
          {crisis ? "Reset scenario" : "Trigger surprise"}
        </button>
      </div>

      <div className="lab-controls">
        <label>
          <span>
            <span>Future me</span>
            <strong>${budget.save}</strong>
          </span>
          <input
            aria-label="Money saved"
            max="100"
            min="0"
            onChange={(event) => update("save", event.target.value)}
            step="5"
            type="range"
            value={budget.save}
          />
        </label>
        <label>
          <span>
            <span>Essentials</span>
            <strong>${budget.needs}</strong>
          </span>
          <input
            aria-label="Money for essentials"
            max="100"
            min="0"
            onChange={(event) => update("needs", event.target.value)}
            step="5"
            type="range"
            value={budget.needs}
          />
        </label>
        <label>
          <span>
            <span>Fun now</span>
            <strong>${budget.fun}</strong>
          </span>
          <input
            aria-label="Money for fun"
            max="100"
            min="0"
            onChange={(event) => update("fun", event.target.value)}
            step="5"
            type="range"
            value={budget.fun}
          />
        </label>
      </div>

      <div className="lab-result">
        <div className={`result-dot ${status.tone}`} />
        <div>
          <strong>{status.label}</strong>
          <span>{status.detail}</span>
        </div>
        <div className="remaining">
          <span>Unassigned</span>
          <strong className={remaining < 0 ? "negative" : ""}>
            {remaining < 0 ? "-" : ""}${Math.abs(remaining)}
          </strong>
        </div>
      </div>
    </div>
  );
}

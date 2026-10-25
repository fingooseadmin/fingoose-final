"use client";

import Image from "next/image";
import { formatPrice } from "./autismKitLessons";

// A little cartoon "set": a store backdrop, a counter with a conveyor belt,
// a cash register with a screen, and FinGoose behind it as the cashier.
// The whole set is one 16:9 world; each step picks a camera shot and the
// world zooms and pans to it, so the lesson cuts between perspectives.

const SHOTS = {
  wide: { s: 1, x: 50, y: 50 },
  price: { s: 2.3, x: 36, y: 52 },
  register: { s: 2.5, x: 79, y: 40 },
  tray: { s: 2.7, x: 62, y: 70 },
  wallet: { s: 1.12, x: 50, y: 50 }
};

function camera(shot) {
  const { s, x, y } = SHOTS[shot] || SHOTS.wide;
  // centre (x, y) in the frame, but never show past the world's edges
  const min = -(1 - 1 / s) * 100;
  const tx = Math.max(min, Math.min(0, 50 / s - x));
  const ty = Math.max(min, Math.min(0, 50 / s - y));
  return `scale(${s}) translate(${tx}%, ${ty}%)`;
}

const COINS = {
  penny: { label: "1¢", d: 5.2, tone: "copper" },
  nickel: { label: "5¢", d: 5.9, tone: "silver" },
  dime: { label: "10¢", d: 4.9, tone: "silver" },
  quarter: { label: "25¢", d: 6.8, tone: "silver" }
};

export function SceneMoney({ kind, index = 0, big = false }) {
  const delay = { "--d": `${index * 0.18}s` };
  if (kind === "$1" || kind === "$5") {
    return (
      <span className={`ks-bill ${kind === "$5" ? "is-five" : ""} ${big ? "is-big" : ""}`} style={delay}>
        <i>{kind.slice(1)}</i>
        <b>{kind}</b>
        <i>{kind.slice(1)}</i>
      </span>
    );
  }
  const coin = COINS[kind];
  if (!coin) return null;
  return (
    <span className={`ks-coin is-${coin.tone} ${big ? "is-big" : ""}`} style={{ ...delay, "--cd": coin.d }}>
      <span className="ks-coin-face">{coin.label}</span>
      <span className="ks-coin-name">{kind}</span>
    </span>
  );
}

function Backdrop({ scene, image }) {
  if (image) {
    return (
      <div className="ks-backdrop is-image">
        <Image src={image} alt="" fill sizes="100vw" />
      </div>
    );
  }
  const sign = {
    grocery: "FinGoose Grocery",
    cafeteria: "Cafeteria",
    sandwich: "Sandwich Shop",
    bank: "FinGoose Coin Counter"
  }[scene];
  return (
    <div className={`ks-backdrop scene-${scene}`} aria-hidden="true">
      <div className="ks-wall" />
      <div className="ks-sign">{sign}</div>
      <div className="ks-lights">
        <i /><i /><i />
      </div>
      {scene === "grocery" ? (
        <div className="ks-shelves">
          {Array.from({ length: 3 }, (_, row) => (
            <div className="ks-shelf" key={row}>
              {Array.from({ length: 11 }, (_, k) => (
                <span key={k} className={`ks-product p${(row * 3 + k) % 6}`} />
              ))}
            </div>
          ))}
        </div>
      ) : null}
      {scene === "cafeteria" ? (
        <div className="ks-menu-board">
          <b>Today’s lunch</b>
          <span>Crackers ........ 50¢</span>
          <span>Milk ............ 35¢</span>
          <span>Apple ........... 25¢</span>
        </div>
      ) : null}
      {scene === "sandwich" ? (
        <div className="ks-menu-board is-chalk">
          <b>Menu</b>
          <span>Sandwich ...... $3</span>
          <span>Soup .......... $2</span>
          <span>Cookie ........ $1</span>
        </div>
      ) : null}
      {scene === "bank" ? (
        <div className="ks-coin-poster">
          {["penny", "nickel", "dime", "quarter"].map((k) => (
            <SceneMoney kind={k} key={k} />
          ))}
        </div>
      ) : null}
      <div className="ks-floor" />
    </div>
  );
}

export default function KitScene({ lesson, step, revealed }) {
  const shot = step.shot || "wide";
  const items = step.items || [];
  const money = revealed && step.reveal?.tray ? step.reveal.tray : step.tray || [];
  const mathLine = revealed && step.reveal?.math ? step.reveal.math : step.math;
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const allBought = items.length > 0 && items.every((item) => item.bought);

  return (
    <div className={`ks-scene shot-${shot}`} aria-hidden="true">
      <div className="ks-world" style={{ transform: camera(shot) }}>
        <Backdrop scene={lesson.scene} image={lesson.backdrop} />

        {/* FinGoose stands behind the counter */}
        <div className="ks-finn">
          <Image src="/assets/finn-talking.webp" alt="" width={1200} height={1200} sizes="40vw" priority />
          <span className="ks-badge">CASHIER</span>
        </div>

        <div className="ks-counter">
          <div className="ks-counter-top" />
          <div className="ks-counter-front">
            <span>{lesson.scene === "bank" ? "FINGOOSE COIN COUNTER" : "CHECKOUT"}</span>
          </div>
        </div>

        <div className={`ks-belt ${items.length && !allBought ? "is-moving" : ""}`} />

        <div className="ks-items">
          {items.map((item, index) => (
            <div className={`ks-item ${item.bought ? "is-bought" : ""}`} key={item.name} style={{ "--d": `${index * 0.15}s` }}>
              <span className="ks-item-emoji">{item.emoji}</span>
              <span className="ks-tag">
                <i />
                {formatPrice(item.price)}
              </span>
              {item.bought ? <span className="ks-check">✓</span> : null}
            </div>
          ))}
        </div>

        {/* cash register with its screen */}
        <div className="ks-register">
          <div className="ks-screen">
            <div className="ks-screen-lines">
              {items.map((item) => (
                <p key={item.name}>
                  <span>{item.name.toUpperCase()}</span>
                  <span>{formatPrice(item.price)}</span>
                </p>
              ))}
              {items.length ? (
                <p className="is-total">
                  <span>TOTAL</span>
                  <span>{formatPrice(total)}</span>
                </p>
              ) : (
                <p className="is-total">
                  <span>HELLO!</span>
                  <span>🪿</span>
                </p>
              )}
            </div>
            {money.length ? (
              <div className="ks-screen-coins" key={money.join("-")}>
                {money.map((kind, index) => (
                  <SceneMoney kind={kind} index={index} key={`${kind}-${index}`} />
                ))}
              </div>
            ) : null}
            {mathLine ? <p className="ks-screen-math">{mathLine}</p> : null}
          </div>
          <div className="ks-register-body">
            <div className="ks-keys">
              {Array.from({ length: 12 }, (_, k) => <i key={k} />)}
            </div>
          </div>
          <div className={`ks-drawer ${allBought ? "is-open" : ""}`} />
        </div>

        {/* coin dish where money is handed over */}
        <div className="ks-tray">
          <div className="ks-tray-money" key={money.join("-")}>
            {money.map((kind, index) => (
              <SceneMoney kind={kind} index={index} key={`${kind}-${index}`} />
            ))}
          </div>
        </div>
      </div>

      {/* student's-eye view of their wallet */}
      <div className={`ks-wallet-view ${shot === "wallet" ? "is-on" : ""}`}>
        <div className="ks-wallet">
          <div className="ks-wallet-flap" />
          <div className="ks-wallet-inside">
            {(money.length ? money : ["penny", "nickel", "dime", "quarter", "$1"]).map((kind, index) => (
              <SceneMoney kind={kind} index={index} key={`${kind}-${index}`} big />
            ))}
          </div>
          <span className="ks-wallet-label">your wallet</span>
        </div>
      </div>

      <span className="ks-shot-label">
        {{ wide: "In the store", price: "Price tag", register: "Register screen", tray: "Coin dish", wallet: "Your wallet" }[shot]}
      </span>
    </div>
  );
}

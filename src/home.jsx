import React, { useState, useEffect } from "react";
import "./home.css";
import { SiSolana } from "react-icons/si";
import { RiTwitterXFill } from "react-icons/ri";

export const App = () => {
  const [blockHeight, setBlockHeight] = useState(1259830);
  const [targetHeight, setTargetHeight] = useState(1259962); // +132 blocks
  const [remaining, setRemaining] = useState(132);
  const [note, setNote] = useState("");
  const [submittedNote, setSubmittedNote] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlockHeight((prev) => {
        const next = prev + 1;
        setRemaining(targetHeight - next);
        return next;
      });
    }, 3000); // simulate every 3s = 1 block

    return () => clearInterval(interval);
  }, [targetHeight]);

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    if (note.trim()) {
      setSubmittedNote(note.trim());
      setNote("");
    }
  };

  return (
    <div className="self-destruct-wrapper">
      <header className="destruct-header">
        <h1>SELF-DESTRUCT TOKEN</h1>
        <p className="warning-text">⚠️ Destruction sequence armed</p>
      </header>

      <div className="countdown-alarm">
        <div className="alarm-border">
          <span className="alarm-label">DESTRUCTION TIMER</span>
          <div className="alarm-value">
            {remaining > 0 ? `${remaining} blocks remaining` : "🔥 EXECUTED 🔥"}
          </div>
        </div>
      </div>

      <section className="status-panel">
        <div className="status-line">
          <span className="label">BLOCK HEIGHT:</span>
          <span className="value">{blockHeight.toLocaleString()}</span>
        </div>
        <div className="status-line">
          <span className="label">SELF-DESTRUCT IN:</span>
          <span className="value countdown">
            {remaining > 0 ? `${remaining} blocks` : "EXECUTED"}
          </span>
        </div>
      </section>

      <button className="danger-btn" disabled={remaining > 0}>
        ▓▓▓ INITIATE SELF-DESTRUCTION ▓▓▓
      </button>

      <section className="terminal">
        <p>{"> initializing burn protocol..."}</p>
        <p>{"> supply lock engaged"}</p>
        <p>{"> owner access revoked"}</p>
        <p className="final-line">{">> ☠️ irreversible state achieved"}</p>
      </section>

      <section className="token-info">
        <h2>Token Information</h2>
        <div className="info-token-box">
          <h4>Contract Address</h4>
          <p className="copy">0x1234567890abcdef1234567890abcdef12345678</p>
        </div>
        <div className="info-token-box">
          <h4>Token Standard</h4>
          <p>ERC-20</p>
        </div>
      </section>

      <section className="info-grid">
        <div className="info-box">
          <h4>Current Supply</h4>
          <p>4,000,000</p>
        </div>
        <div className="info-box">
          <h4>Owners</h4>
          <p>842 wallets</p>
        </div>
        <div className="info-box danger-zone">
          <h4>State</h4>
          <p>⚠ ARMED</p>
        </div>
      </section>

      <section className="glass-panel">
        <h3>✍️ Leave a message before destruction</h3>
        <form onSubmit={handleNoteSubmit} className="note-form">
          <textarea
            placeholder="Say something to the void..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <button type="submit">Transmit</button>
        </form>
        {submittedNote && (
          <div className="note-display">
            <p>
              <strong>🧠 Your Final Note:</strong>
            </p>
            <blockquote>{submittedNote}</blockquote>
          </div>
        )}
      </section>

      <div className="links">
        <a
          href="https://twitter.com/SelfDestructToken"
          target="_blank"
          rel="noopener noreferrer"
        >
          <RiTwitterXFill className="social-icon" /> Follow US
        </a>
        <a href="https://solana.com" target="_blank" rel="noopener noreferrer">
          <SiSolana className="social-icon" /> Solana
        </a>
      </div>

      <footer className="footer">
        <p>© 2023 Self-Destruct Token. All rights reserved.</p>
        <p>Made with ❤️ by Your Name</p>
        <p>Disclaimer: This is a demo application.</p>
      </footer>
    </div>
  );
};

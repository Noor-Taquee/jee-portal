// oxlint-disable max-lines-per-function
import "./style.css";

import { useEffect, useState } from "react";

import AnimatedDigit from "./AnimatedDigit";

interface TimeLeft {
  days: string[];
  hours: string[];
  minutes: string[];
  seconds: string[];
}

const TARGET_DATE = new Date("2027-01-20T00:00:00").getTime();

export default function ExamCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: ["0", "0", "0"],
    hours: ["0", "0"],
    minutes: ["0", "0"],
    seconds: ["0", "0"],
  });

  useEffect(() => {
    function calculateTimeLeft() {
      const now = new Date().getTime();
      const difference = Math.max(0, TARGET_DATE - now);

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(d).padStart(3, "0").split(""),
        hours: String(h).padStart(2, "0").split(""),
        minutes: String(m).padStart(2, "0").split(""),
        seconds: String(s).padStart(2, "0").split(""),
      });
    }

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div id="exam-countdown-box">
      <p className="header">Remaining time</p>
      <div id="exam-countdown">
        <div
          id="days"
          className="main"
        >
          {timeLeft.days.map((digit, i) => (
            <AnimatedDigit
              key={`d-${i}`}
              digit={digit}
            />
          ))}
        </div>
        <span className="colon">:</span>
        <div
          id="hours"
          className="main"
        >
          {timeLeft.hours.map((digit, i) => (
            <AnimatedDigit
              key={`h-${i}`}
              digit={digit}
            />
          ))}
        </div>
        <span className="colon">:</span>
        <div
          id="minutes"
          className="main"
        >
          {timeLeft.minutes.map((digit, i) => (
            <AnimatedDigit
              key={`m-${i}`}
              digit={digit}
            />
          ))}
        </div>
        <span className="colon">:</span>
        <div
          id="seconds"
          className="main"
        >
          {timeLeft.seconds.map((digit, i) => (
            <AnimatedDigit
              key={`s-${i}`}
              digit={digit}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

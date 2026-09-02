import { useEffect, useState } from "react";
import { changeHash } from "../../../utils/hash-handler";

interface TimerProps {
  startTime: Date;

  /** Test Duration in _Milliseconds_ */
  testDuration: number;
}

export default function Timer({ startTime, testDuration }: TimerProps) {
  const [leftTime, setLeftTime] = useState<number>(testDuration);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const ellapsedTime = Date.now() - startTime.getTime();
      const remaining = testDuration - ellapsedTime;
      if (remaining <= 0) {
        setLeftTime(0);
        clearInterval(timerInterval);
        changeHash("result");
      } else {
        setLeftTime(remaining);
      }
    }, 500);

    return () => {
      clearInterval(timerInterval);
    };
  }, [startTime, testDuration]);

  const totalSeconds = Math.floor(leftTime / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (num: number) => String(num).padStart(2, "0");

  return (
    <div id="timer">
      <p className={leftTime < 30000 ? "less" : ""}>
        <span>{pad(hours)}</span>:<span>{pad(minutes)}</span>:
        <span>{pad(seconds)}</span>
      </p>
    </div>
  );
}

// oxlint-disable max-lines-per-function

import { useEffect, useState } from "react";
import { useExamSession } from "../../../hooks/useExamData";

import { changeHash } from "../../../hooks/useHash";

export default function Timer() {
  const examSession = useExamSession();

  const [leftTime, setLeftTime] = useState<number>(
    examSession.examData?.metadata.duration as number
  );

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (!examSession.startedAt) {
        setLeftTime(0);
        clearInterval(timerInterval);
        return;
      }

      const ellapsedTime = Date.now() - examSession.startedAt.getTime();
      const remaining =
        (examSession.examData?.metadata.duration as number) - ellapsedTime;

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
  }, [examSession]);

  const totalSeconds = Math.floor(leftTime / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  function pad(num: number) {
    return String(num).padStart(2, "0");
  }

  return (
    <div id="timer">
      <p className={leftTime < 30000 ? "less" : ""}>
        <span>{pad(hours)}</span>:<span>{pad(minutes)}</span>:
        <span>{pad(seconds)}</span>
      </p>
    </div>
  );
}

// oxlint-disable max-lines-per-function

import "./style.css";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/react";

import type { ReviewQuestion, SetQuestion } from "../../index";
import InputBox from "../../../../../components/InputBox";

type Exam = {
  id: number;
  name: string;
  exam_type: string;
  date: string | null;
};

type ExamSearchResponse = {
  success: boolean;
  exams: Exam[];
};

interface Props {
  question: ReviewQuestion;
  setQuestion: SetQuestion;
}

export default function ExamSection({ question, setQuestion }: Props) {
  const { getToken } = useAuth();

  const [searchText, setSearchText] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [noMatches, setNoMatches] = useState(false);
  const [matches, setMatches] = useState<Exam[]>([]);
  const [searchFailed, setSearchFailed] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);

  useEffect(() => {
    const term = searchText.trim();

    if (term.length < 2) {
      // oxlint-disable-next-line react/set-state-in-effect
      setMatches([]);
      setIsLoading(false);
      setNoMatches(false);
      setSearchFailed(false);
      return;
    }

    const controller = new AbortController();
    setIsLoading(true);
    setNoMatches(false);
    setSearchFailed(false);

    const timeoutId = window.setTimeout(async () => {
      try {
        const token = await getToken();

        const response = await fetch(
          `/api/jee/searchExams?search=${encodeURIComponent(term)}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            signal: controller.signal,
          }
        );

        const data: ExamSearchResponse = await response.json();

        if (!response.ok || !data.success) {
          throw new Error("Exam search failed");
        }

        if (!controller.signal.aborted) {
          setMatches(data.exams);
          setNoMatches(data.exams.length === 0);
        }
      } catch {
        if (!controller.signal.aborted) {
          setMatches([]);
          setSearchFailed(true);
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }, 250);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [searchText, getToken]);

  const handleSearchChange = (value: string) => {
    setSelectedExam(null);
    setQuestion((current) =>
      current ? { ...current, exam_id: null } : current
    );
    setSearchText(value);
    setIsOpen(true);
  };

  const selectExam = (exam: Exam) => {
    setSelectedExam(exam);
    setQuestion((current) =>
      current ? { ...current, exam_id: exam.id } : current
    );
    setSearchText("");
    setMatches([]);
    setNoMatches(false);
    setIsOpen(false);
  };

  return (
    <div
      className="review-question-info-section"
      id="exam-section"
    >
      <h4 className="section-header">Exam</h4>
      <div className="exam-search">
        <InputBox className="exam-search-box">
          <input
            name="exam"
            type="text"
            value={selectedExam?.name ?? (noMatches ? "" : searchText)}
            placeholder="Search exams"
            autoComplete="off"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={isOpen}
            aria-controls="exam-search-results"
            onFocus={() => {
              setIsOpen(true);
            }}
            onBlur={() => {
              setIsOpen(false);
            }}
            onChange={(event) => {
              handleSearchChange(event.target.value);
            }}
          />
        </InputBox>
        {isOpen && !selectedExam && searchText.trim() && (
          <div
            id="exam-search-results"
            className="exam-search-results"
            role="listbox"
          >
            {searchText.trim().length < 2 && (
              <p className="exam-search-message">Type at least 2 characters</p>
            )}
            {searchText.trim().length >= 2 && isLoading && (
              <p className="exam-search-message">Searching...</p>
            )}
            {searchText.trim().length >= 2 && !isLoading && noMatches && (
              <p className="exam-search-message">No matching exams</p>
            )}
            {searchText.trim().length >= 2 && !isLoading && searchFailed && (
              <p className="exam-search-message">Could not search exams</p>
            )}
            {!isLoading &&
              matches.map((exam) => (
                <button
                  type="button"
                  className="exam-search-result"
                  role="option"
                  aria-selected={question.exam_id === exam.id}
                  key={exam.id}
                  onMouseDown={(event) => {
                    event.preventDefault();
                  }}
                  onClick={() => {
                    selectExam(exam);
                  }}
                >
                  <p>{exam.name}</p>
                  <small>
                    {exam.exam_type}
                    {exam.date ? ` · ${exam.date}` : ""}
                  </small>
                </button>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

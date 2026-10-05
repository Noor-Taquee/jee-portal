import "./style.css";

import NoTestMessage from "./NoTestMessage";

const tests = [
  {
    id: "test-001",
    paperName: "JEE Main Mock Test 1 - Full Length Syllabus Mock Series 2026",
    subject: "Physics, Chemistry, Mathematics",
    obtainedMarks: 210,
    totalMarks: 300,
    date: "Jan 10, 2026",
    status: "Completed",
  },
  {
    id: "test-002",
    paperName: "Physics Sectional Test: Electrostatics & Magnetism",
    subject: "Physics",
    obtainedMarks: 75,
    totalMarks: 100,
    date: "Jan 08, 2026",
    status: "Completed",
  },
  {
    id: "test-003",
    paperName: "JEE Advanced Paper 1 (Comprehensive)",
    subject: "PCM",
    obtainedMarks: 142,
    totalMarks: 180,
    date: "Jan 05, 2026",
    status: "Completed",
  },
  {
    id: "test-004",
    paperName:
      "Organic Chemistry Special - Reaction Mechanisms & Polymers Diagnostic Assessment",
    subject: "Chemistry",
    obtainedMarks: 48,
    totalMarks: 100,
    date: "Dec 28, 2025",
    status: "Completed",
  },
  {
    id: "test-005",
    paperName: "Mathematics Weekly Speed Challenge 12",
    subject: "Mathematics",
    obtainedMarks: 88,
    totalMarks: 100,
    date: "Dec 20, 2025",
    status: "Completed",
  },
  {
    id: "test-006",
    paperName: "JEE Main Mock Test 2",
    subject: "PCM",
    obtainedMarks: 195,
    totalMarks: 300,
    date: "Dec 15, 2025",
    status: "Completed",
  },
  {
    id: "test-007",
    paperName: "Thermodynamics & Heat Transfer Revision Test",
    subject: "Physics",
    obtainedMarks: 62,
    totalMarks: 100,
    date: "Dec 10, 2025",
    status: "Completed",
  },
  {
    id: "test-008",
    paperName:
      "Inorganic Chemistry - Coordination Compounds & Metallurgy Quick Quiz",
    subject: "Chemistry",
    obtainedMarks: 90,
    totalMarks: 100,
    date: "Dec 02, 2025",
    status: "Completed",
  },
  {
    id: "test-009",
    paperName: "Calculus & Vector Algebra Master Test Series - Module 4",
    subject: "Mathematics",
    obtainedMarks: 81,
    totalMarks: 100,
    date: "Nov 25, 2025",
    status: "Completed",
  },
  {
    id: "test-010",
    paperName: "Full Length Mock Test 00 (Baseline)",
    subject: "PCM",
    obtainedMarks: 165,
    totalMarks: 300,
    date: "Nov 15, 2025",
    status: "Completed",
  },
];

export default function TestHistoryTable() {
  return (
    <table id="test-history-table">
      <thead className="table-row header">
        <tr>
          <th className="col-paper">
            <span>Paper</span>
          </th>
          <th className="col-marks">
            <span>Marks</span>
          </th>
          <th className="col-date">
            <span>Date</span>
          </th>
          <th className="col-view">
            <span></span>
          </th>
        </tr>
      </thead>

      <tbody>
        {(!tests || tests.length < 1) && <NoTestMessage />}
        {tests.map((test) => (
          <tr key={test.id}>
            <td className="col-paper">
              <span className="paper-title">{test.paperName}</span>
              <span className="paper-subtitle">{test.subject}</span>
            </td>
            <td className="col-marks">
              <span className="marks-obtained">
                {test.obtainedMarks}/{test.totalMarks}
              </span>
            </td>
            <td className="col-date">
              <span className="test-date">{test.date}</span>
            </td>
            <td className="col-view">
              <button className="view-button">
                <span>View</span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

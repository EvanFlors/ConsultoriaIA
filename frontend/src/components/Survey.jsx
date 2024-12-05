import { useRef, useState } from "react";

const sections = [
  {
    title: "Información Usuario",
    questions: [
      { id: "q0", text: "Input user 1" },
      { id: "q1", text: "Input user 2" },
    ],
  },
  {
    title: "Finanzas",
    questions: [
      { id: "q2", text: "Question 1" },
      { id: "q3", text: "Question 2" },
      { id: "q4", text: "Question 3" },
      { id: "q5", text: "Question 4" },
      { id: "q6", text: "Question 5" },
    ],
  },
  {
    title: "Producto",
    questions: [
      { id: "q7", text: "Question 6" },
      { id: "q8", text: "Question 7" },
      { id: "q9", text: "Question 8" },
      { id: "q10", text: "Question 9" },
      { id: "q11", text: "Question 10" },
    ],
  },
  {
    title: "Marketing",
    questions: [
      { id: "q12", text: "Question 11" },
      { id: "q13", text: "Question 12" },
      { id: "q14", text: "Question 13" },
      { id: "q15", text: "Question 14" },
      { id: "q16", text: "Question 15" },
    ],
  },
];

function SurveySection({ section, formData, handleChange, isFirstSection }) {
  return (
    <>
      <p className="text-lg font-semibold mb-4">{section.title}</p>
      {section.questions.map((question) => (
        <div key={question.id} className="mb-4">
          <p className="font-semibold mb-2">{question.text}</p>
          <div className="mt-2 flex gap-10">
            {isFirstSection ? (
              <label className="block">
                <input
                  type="text"
                  name={question.id}
                  value={formData[question.id] || ""}
                  onChange={handleChange}
                  className="border rounded px-2 py-1"
                  required
                />
              </label>
            ) : (
              [0, 1, 2].map((value) => (
                <label key={value} className="block">
                  <input
                    type="radio"
                    name={question.id}
                    value={value}
                    checked={formData[question.id] === String(value)}
                    onChange={handleChange}
                    className="mr-2"
                    required
                  />
                  {value}
                </label>
              ))
            )}
          </div>
        </div>
      ))}
    </>
  );
}

const Survey = ({ onFinish }) => {

  const formRef = useRef();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [sectionResults, setSectionResults] = useState([]);
  const [formData, setFormData] = useState({});

  const currentSection = sections[currentSectionIndex];

  const evaluateAnswer = (data, totalQuestions) => {
    const totalScore = Object.values(data).reduce(
      (sum, value) => sum + parseInt(value, 10),
      0
    );
    const maxScore = totalQuestions * 2;
    const percentage = (totalScore / maxScore) * 100;
    return percentage.toFixed(2);
  };

  const evaluateInputs = (data) => {
    return Object.values(data).some((value) => value.trim() === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    const totalQuestions = currentSection.questions.length;

    if (Object.keys(data).length < totalQuestions || evaluateInputs(data)) {
      alert(`Please answer all questions.`);
      return;
    }

    if (currentSectionIndex !== 0) {
      const percentage = evaluateAnswer(data, totalQuestions);
      setSectionResults((prev) => [
        ...prev,
        { section: currentSection.title, percentage },
      ]);
    }

    setFormData((prev) => ({ ...prev, ...data }));
    formRef.current.reset();

    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex((prev) => prev + 1);
    } else {
      onFinish()
      console.log("Results:", sectionResults);
    }
  };

  const handleBack = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex((prev) => prev - 1);
      setSectionResults((prev) => prev.slice(0, -1));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-5 bg-gray-100 w-full">
      <h2 className="text-xl font-bold mb-4">Survey Form</h2>
      <div className="flex">
        <form ref={formRef} onSubmit={handleSubmit} className="mb-6">
          <SurveySection
            section={currentSection}
            formData={formData}
            handleChange={handleChange}
            isFirstSection={currentSectionIndex === 0}
          />
          <div className="flex gap-4 mt-4">
            {currentSectionIndex > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="py-2 px-4 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
            >
              {currentSectionIndex < sections.length - 1 ? "Next" : "Submit"}
            </button>
          </div>
        </form>

        <div className="ml-auto">
          <h3 className="text-lg font-semibold">Results</h3>
          <ul>
            {sectionResults.map((result, index) => (
              <li key={index}>
                {result.section}: {result.percentage}%
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Survey

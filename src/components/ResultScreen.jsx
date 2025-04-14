import React from "react";

const ResultScreen = ({ questions, userAnswers, score }) => {
  return (
    <div className="bg-[#AFDBF5] p-6 rounded shadow-md w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Your Score: {score} / {questions.length}
      </h2>
      {questions.map((q, i) => (
        <div key={i} className="mb-4">
          <p className="text-lg font-semibold">
            Q{i + 1}: {q.sentence}
          </p>
          <p>
            Your Answer:{" "}
            <span
              className={
                userAnswers[i].join() === q.answers.join()
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {userAnswers[i].join(", ")}
            </span>
          </p>
          {userAnswers[i].join() !== q.answers.join() && (
            <p>
              Correct Answer:{" "}
              <span className="text-green-700">{q.answers.join(", ")}</span>
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ResultScreen;

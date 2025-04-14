import React, { useEffect, useState } from "react";

const QuestionCard = ({ question, onNext, index }) => {
  const [selected, setSelected] = useState(question.answers.map(() => null));
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0) handleSubmit();
  }, [timer]);

  const handleSelect = (word) => {
    const idx = selected.findIndex((s) => s === null);
    if (idx !== -1) {
      const updated = [...selected];
      updated[idx] = word;
      setSelected(updated);
    }
  };

  const handleUnselect = (idx) => {
    const updated = [...selected];
    updated[idx] = null;
    setSelected(updated);
  };

  const handleSubmit = () => {
    onNext(selected);
  };

  const blanks = question.sentence.split("_").map((part, i) => (
    <span key={i} className="text-lg">
      {part}
      {i < selected.length && (
        <button
          className="bg-blue-100 px-2 py-1 rounded mx-1"
          onClick={() => handleUnselect(i)}
        >
          {selected[i] ?? "____"}
        </button>
      )}
    </span>
  ));

  return (
    <div className="bg-[#AFDBF5]  p-6 rounded shadow-md w-full max-w-2xl mx-auto">
      <div className="mb-4 flex justify-between">
        <h2 className="text-xl font-bold">Question {index + 1}</h2>
        <span className="text-red-500 font-bold">{timer}s</span>
      </div>
      <div className="mb-4 text-xl">{blanks}</div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {question.options.map((word, i) => (
          <button
            key={i}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => handleSelect(word)}
            disabled={selected.includes(word)}
          >
            {word}
          </button>
        ))}
      </div>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={handleSubmit}
        disabled={selected.includes(null)}
      >
        Next
      </button>
    </div>
  );
};

export default QuestionCard;

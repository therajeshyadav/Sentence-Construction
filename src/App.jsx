import React, { useEffect, useState } from "react";
import QuestionCard from "./components/QuestionCard";
import ResultScreen from "./components/ResultScreen";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setQuestions(data);
        setUserAnswers(Array(data.length).fill([]));
      })
      .catch((err) => {
        console.error("Failed to fetch questions:", err);
      });
  }, []);

  const handleNext = (answers) => {
    const correct = answers.every(
      (a, i) => a === questions[currentIndex].answers[i]
    );
    if (correct) setScore((prev) => prev + 1);

    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentIndex] = answers;
    setUserAnswers(updatedAnswers);

    if (currentIndex + 1 === questions.length) {
      setIsFinished(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#7FFFD4]">
      {!isFinished ? (
        questions.length > 0 && (
          <QuestionCard
            key={questions[currentIndex].id}
            question={questions[currentIndex]}
            onNext={handleNext}
            index={currentIndex}
          />
        )
      ) : (
        <ResultScreen
          questions={questions}
          userAnswers={userAnswers}
          score={score}
        />
      )}
    </div>
  );
};

export default App;

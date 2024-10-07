import { createContext, useState } from "react";

export const QuizAppContext = createContext();

export const QuizAppProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [error, setError] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [quizSetup, setQuizSetup] = useState(null);

  const onAnswer = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (answer === currentQuestion.correct_answer) {
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIncorrectAnswers(incorrectAnswers + 1);
    }

    setAnswers([...answers, answer]);
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setIsFinished(true);
    }
  };

  const handleStartQuiz = (setup) => {
    setQuizSetup(setup);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <QuizAppContext.Provider
      value={{
        questions,
        setQuestions,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        answers,
        setAnswers,
        isFinished,
        setIsFinished,
        error,
        setError,
        hasFetched,
        setHasFetched,
        correctAnswers,
        setCorrectAnswers,
        incorrectAnswers,
        setIncorrectAnswers,
        quizSetup,
        setQuizSetup,
        onAnswer,
        handleStartQuiz,
        currentQuestion,
      }}
    >
      {children}
    </QuizAppContext.Provider>
  );
};

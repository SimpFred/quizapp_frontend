import { createContext, useState } from "react";

/**
 * QuizAppContext
 *
 * This context provides the state and functions for managing the quiz application.
 * It includes state for questions, answers, quiz setup, and various flags for handling
 * the quiz flow.
 */
export const QuizAppContext = createContext();

/**
 * QuizAppProvider Component
 *
 * This component provides the QuizAppContext to its children. It manages the state
 * and functions required for the quiz application.
 *
 * @component
 * @example
 * // To use the QuizAppProvider, wrap it around your component tree.
 * return (
 *   <QuizAppProvider>
 *     <YourComponent />
 *   </QuizAppProvider>
 * )
 *
 * @param {Object} props - The props for the component.
 * @param {React.ReactNode} props.children - The child components that will have access to the context.
 * @returns {JSX.Element} The QuizAppProvider component with context values.
 */
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
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [topResults, setTopResults] = useState([]);
  const [updateScoreboard, setUpdateScoreboard] = useState(false);
  const [hasSaveDialogBeenOpened, setHasSaveDialogBeenOpened] = useState(false);

  /**
   * Handles the user's answer to a question.
   * Updates the correct and incorrect answers count, and moves to the next question.
   *
   * @param {string} answer - The user's selected answer.
   */
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

  /**
   * Handles the start of the quiz by setting up the quiz configuration.
   *
   * @param {Object} setup - The quiz setup configuration.
   */
  const handleStartQuiz = (setup) => {
    setQuizSetup(setup);
  };

  /**
   * Closes the save dialog.
   */
  const handleCloseSaveDialog = () => {
    setOpenSaveDialog(false);
  };

  /**
   * Handles the event when the quiz result is saved.
   * Updates the state to reflect that the result has been saved.
   */
  const handleResultSaved = () => {
    setHasSaveDialogBeenOpened(true);
    setUpdateScoreboard(true);
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
        openSaveDialog,
        setOpenSaveDialog,
        topResults,
        setTopResults,
        updateScoreboard,
        setUpdateScoreboard,
        hasSaveDialogBeenOpened,
        setHasSaveDialogBeenOpened,
        handleCloseSaveDialog,
        handleResultSaved,
      }}
    >
      {children}
    </QuizAppContext.Provider>
  );
};

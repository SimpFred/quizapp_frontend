import React from "react";
import Quiz from "./components/Quiz";
import { QuizAppProvider } from "./context";

function App() {
  return (
    <div className="App">
      <QuizAppProvider>
        <Quiz />
      </QuizAppProvider>
    </div>
  );
}

export default App;

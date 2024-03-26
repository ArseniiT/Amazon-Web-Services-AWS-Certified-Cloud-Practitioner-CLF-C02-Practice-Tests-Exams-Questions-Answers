import './App.css';
import React, { useState } from 'react';
import questions from './aws-qa.json';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelection = (answerId) => {
    const selectedIndex = selectedAnswers.indexOf(answerId);
    if (selectedIndex === -1) {
      setSelectedAnswers([...selectedAnswers, answerId]);
    } else {
      setSelectedAnswers(selectedAnswers.filter(id => id !== answerId));
    }
  };

  const handleCheckAnswer = () => {
    const correctAnswers = currentQuestion.answers.filter(answer => answer.isCorrect).map(answer => answer.id);
    const isCorrect = selectedAnswers.length === correctAnswers.length && selectedAnswers.every(id => correctAnswers.includes(id));
    setIsCorrect(isCorrect);
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    setSelectedAnswers([]);
    setShowFeedback(false);
    setIsCorrect(false);
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  return (
    <div className="App">
      <h1>AWS Quiz App</h1>
      {currentQuestion && (
        <>
          <h2>{currentQuestion.question.text}</h2>
          {currentQuestion.answers.map(answer => (
            <div key={answer.id}>
              <input
                type="checkbox"
                id={answer.id}
                name="answer"
                value={answer.id}
                checked={selectedAnswers.includes(answer.id)}
                onChange={() => handleAnswerSelection(answer.id)}
                disabled={showFeedback}
              />
              <label htmlFor={answer.id} className={`${isCorrect && answer.isCorrect ? 'bold' : ''} ${isCorrect && !answer.isCorrect ? 'incorrect' : ''}`}>
                {answer.text}
              </label>
            </div>
          ))}
          <button onClick={handleCheckAnswer}>
            Check
          </button>
          {showFeedback && (
            <p className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
              {isCorrect ? 'Correct!' : `Incorrect. The correct answer${currentQuestion.answers.filter(answer => answer.isCorrect).length > 1 ? 's are' : ' is'}: `}
              {currentQuestion.answers.filter(answer => answer.isCorrect).map(answer => (
                <span key={answer.id} className="bold"> {answer.text} </span>
              ))}
            </p>
          )}
          <button onClick={handleNextQuestion} disabled={!showFeedback}>
            Next
          </button>
        </>
      )}
    </div>
  );
}

export default App;

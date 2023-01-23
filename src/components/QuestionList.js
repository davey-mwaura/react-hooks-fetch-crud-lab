import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions,deleteQuestion }) {

  const [empty, setEmpty] = useState(questions.length === 0);

  useEffect(() => {
    setEmpty(questions.length === 0);
  }, [questions]);

  if (empty) {
    return <div>No questions yet</div>;
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
      {questions.map((question) => (
        <QuestionItem key={question.id} question={question}  deleteQuestion={deleteQuestion}/>
      ))}
    </ul>
    </section>
  );
}

export default QuestionList;

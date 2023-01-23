import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch("http://localhost:4000/questions");
        const data = await response.json();
        setQuestions(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchQuestions();
  }, []);

  const addNewQuestion = async (question) => {
    try {
    const response = await fetch("http://localhost:4000/questions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(question),
    });
    const data = await response.json()
    setQuestions([...questions, data])
    } catch (err) {
    console.error(err);
    }
    }

    async function deleteQuestion(id) {
      try {
        await fetch(`http://localhost:4000/questions/${id}`, {
          method: "DELETE",
        });
        setQuestions(questions.filter((question) => question.id !== id));
      } catch (err) {
        console.error(err);
      }
    }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm addNewQuestion={addNewQuestion} /> : <QuestionList questions={questions} deleteQuestion={deleteQuestion}/>}
    </main>
  );
}

export default App;

import React, { useRef, useState } from "react";
import "../index.css";
import { database } from "../utils/firebase/firebase.config";
import { collection, addDoc } from "firebase/firestore";
import { useFirebaseFetch } from "../components/hooks/useFirebaseFetch";

type QuizData = {
  etap_id: string;
  id_course: string;
  course_name: string;
  questiones: Question[];
};
type Option = {
  id: number;
  text: string;
  isCorrect: boolean;
};
type Question = {
  text: string;
  options: Option[];
};

interface Stages {
  id: string;
  name: string;
}

interface Courses {
  name: string;
  id_course: string;
}

function AddQuiz() {
  const etapRef = useRef<HTMLSelectElement>(null);
  const courseRef = useRef<HTMLSelectElement>(null);
  const courseNameRef = useRef<HTMLSelectElement>(null);
  const optionsTextRef = useRef<HTMLInputElement>(null);
  const idRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLInputElement>(null);
  const isCorrectRef = useRef<HTMLInputElement>(null);
  const [questiones, setQuestiones] = useState<Question[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [isButtonClicked, setIsButtonClicked] = useState<Boolean>(false);

  const stagesCollection = useFirebaseFetch<Stages>("etaps");
  const coursesCollection = useFirebaseFetch<Courses>("courses");
  // Push Function
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Create new option object
    const newOption: Option = {
      id: parseInt(idRef.current?.value ?? "0"),
      text: textRef.current?.value ?? "",
      isCorrect: Boolean(isCorrectRef.current?.checked),
    };

    // Find the question in questiones array
    const updatedQuestiones = questiones.map((question) => {
      if (question.text === optionsTextRef.current?.value) {
        // Add new option to existing question
        return {
          ...question,
          options: [...question.options, newOption],
        };
      } else {
        return question;
      }
    });

    // If the question doesn't exist yet, create a new one
    if (updatedQuestiones.every((question) => question.text !== optionsTextRef.current?.value)) {
      // Create new question object
      const newQuestion: Question = {
        text: optionsTextRef.current?.value ?? "",
        options: [newOption],
      };

      // Add new question to questiones array
      updatedQuestiones.push(newQuestion);
    }

    // Update questiones state with new question
    setQuestiones(updatedQuestiones);
    // Clear form input values
    idRef.current!.value = "";
    textRef.current!.value = "";
    isCorrectRef.current!.checked = false;

    // Display success message
    setMessage("Dodano quiz do bazy");
    setTimeout(() => setMessage(null), 2000);

    setNewQuestion();
  }
  // handle button to reset for new question
  function setButtonClickedFn() {
    setIsButtonClicked(true);
  }

  //Set newQueston
  function setNewQuestion() {
    if (isButtonClicked === true) {
      optionsTextRef.current!.value = "";
      idRef.current!.value = "";
      textRef.current!.value = "";
      isCorrectRef.current!.checked = false;
      setTimeout(() => setIsButtonClicked(false), 500);
    } else {
      idRef.current!.value = "";
      textRef.current!.value = "";
      isCorrectRef.current!.checked = false;
    }
  }
  //reset refrences after save quiz
  function resetQuiz() {
    etapRef.current!.value = "";
    courseRef.current!.value = "";
    courseNameRef.current!.value = "";
    optionsTextRef.current!.value = "";
    idRef.current!.value = "";
    textRef.current!.value = "";
    isCorrectRef.current!.value = "";
  }
  // Save quiz data to database
  function saveQuiz() {
    const quizRef = collection(database, "quiz");
    const newQuiz: QuizData = {
      etap_id: etapRef.current?.value ?? "",
      id_course: courseRef.current?.value ?? "",
      course_name: courseNameRef.current?.value ?? "",
      questiones: questiones,
    };
    addDoc(quizRef, newQuiz)
      .then(() => {
        setMessage("Quiz został zapisany w bazie danych.");
        setTimeout(() => setMessage(null), 2000); // clear message after 5 seconds
      })
      .catch(() => setMessage("Wystąpił błąd podczas zapisywania quizu."));
    setQuestiones([]);
    resetQuiz();
  }

  return (
    <div style={{ display: "flex" }}>
      <div style={{ margin: "30px", width: "450px", fontSize: "13px" }}>
        <h3>INSTRUKCJA:</h3>
        <p style={{ fontSize: "11px" }}>
          Tworząc quiz podaj niezbędne informacje takie jak: id etapu ( po najechaniu na nr id po chwili pojawi się podpowiedź do jakiego kursu odnosi się id), id kursu oraz nazwę
          kursu, a następnie postępuj zgodnie z poniszą instrukcją
        </p>
        <p>
          1. Aby dodać kolejne odpowiedzi do tego samego pytania wpisz kolejno: Pytanie, Nr odpowiedzi, Treść odpowiedzi oraz zaznacz czy jest prawidłowa i kliknij "Dodaj kolejną
          odpowiedź".
        </p>
        <p>
          2. Chcąc dodać kolejne pytanie pamiętaj, aby po wpisaniu ostatniej odpowiedzi z pkt 1 tym razem wcisnąć przycisk "Dodaj pytanie", a następnie postępować zgodnie z krokami
          z pkt. 1
        </p>
        <p>3. Jeśli chcesz wysłać juz gotowy quiz to po dodaniu ostatniej odpowiedzi do danego pytania po prostu kliknij w przycisk "Zapisz quiz w bazie"</p>
      </div>
      <div>
        <p>Dodaj quiz do bazy</p>
        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="etap_id">ID etapu</label>
          <select ref={etapRef} required>
            <option value="">Filtruj po ID etapu</option>
            {stagesCollection.map((stage) => (
              <option key={stage.id} value={stage.id} title={stage.name ? stage.name : stagesCollection.find((s) => s.id === stage.id)?.name}>
                {stage.id}
              </option>
            ))}
          </select>
          <label htmlFor="course_id">ID kursu</label>
          <select ref={courseRef} required>
            <option value="">Filtruj po ID kursu</option>
            {coursesCollection.map((course) => (
              <option key={course.id} value={course.id}>
                {course.id_course ? course.id_course : coursesCollection.find((id) => id.id === course.id)?.id_course}
              </option>
            ))}
          </select>
          <label htmlFor="course_name">Nazwa kursu</label>
          <select ref={courseNameRef} required>
            <option value="">Filtruj po nazwie kursu</option>
            {coursesCollection.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name ? course.name : coursesCollection.find((id) => id.id === course.id)?.name}
              </option>
            ))}
          </select>
          <label htmlFor="optionsText">Pytanie</label>
          <input type="text" id="optionsText" ref={optionsTextRef} />
          <label htmlFor="optionId">Nr odpowiedzi</label>
          <input type="text" id="optionisCorrect" ref={idRef} />
          <label htmlFor="optionText">Tekst odpowiedzi</label>
          <input type="text" id="optionText" ref={textRef} />
          <label htmlFor="isCorrect">Jeśli odpowiedź jest poprawna zaznacz checkbox</label>
          <input type="checkbox" id="isCorrect" ref={isCorrectRef} />
          <button type="submit">Dodaj kolejną odpowiedź</button>
          <button type="submit" onClick={setButtonClickedFn}>
            Dodaj pytanie
          </button>
        </form>
        <button onClick={saveQuiz}>Zapisz quiz w bazie</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default AddQuiz;

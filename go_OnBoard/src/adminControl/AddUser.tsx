import { useRef, FormEvent, useState } from "react";
import { database } from "../utils/firebase/firebase.config";
import {
  collection,
  addDoc,
  serverTimestamp,
  Timestamp,
  FieldValue,
} from "firebase/firestore";
import { EtapsContainer } from "../components/activities/ProgressEtap.styled";

interface User {
  email: string;
  name: string;
  gender: string;
  id_course: string;
  role: string;
  start_course: Timestamp | FieldValue;
}

function AddUser() {
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const id_courseRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLSelectElement>(null);
  const start_courseRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Push user to table
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const usersRef = collection(database, "initUser");
    const start_course = start_courseRef.current?.value
      ? Timestamp.fromDate(new Date(start_courseRef.current.value))
      : serverTimestamp();
    const newUser: User = {
      email: emailRef.current?.value || "",
      name: usernameRef.current?.value || "",
      gender: genderRef.current?.value || "",
      id_course: id_courseRef.current?.value || "",
      role: roleRef.current?.value || "",
      start_course: start_course,
    };
    addDoc(usersRef, newUser)
      .then(() => {
        setMessage("User added successfully");
        setTimeout(() => setMessage(null), 2000); // clear message after 2 seconds
      })
      .catch((error) => {
        console.error(error);
        setMessage("Error adding user");
      });
  }

  return (
    <EtapsContainer>
      <p>Dodaj użytkownika do bazy</p>
      <form
        onSubmit={onSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label htmlFor="E-mail">E-mail</label>
        <input
          ref={emailRef}
          type="email"
          required
        />
        <label htmlFor="Imię kursanta">Imię kursanta</label>
        <input
          ref={usernameRef}
          required
        />
        <label htmlFor="Płeć">Płeć</label>
        <select
          ref={genderRef}
          required>
          <option value="">Wybierz płeć</option>
          <option value="M">M</option>
          <option value="K">K</option>
        </select>
        <label htmlFor="Sygnatura kursu">Sygnatura kursu</label>
        <input
          ref={id_courseRef}
          required
        />
        <label htmlFor="Rola">Rola</label>
        <select
          ref={roleRef}
          required>
          <option value="">Wybierz rolę</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <label htmlFor="Rozpoczęcie kursu">Rozpoczęcie kursu</label>
        <input
          ref={start_courseRef}
          type="datetime-local"
          required
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </EtapsContainer>
  );
}

export default AddUser;

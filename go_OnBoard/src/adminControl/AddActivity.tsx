import React, { useRef, useState } from "react";

import { database } from "../utils/firebase/firebase.config";
import { collection, addDoc } from "firebase/firestore";
import { EtapsContainer } from "../components/activities/ProgressEtap.styled";

interface ActivityData {
  etap_id: string;
  comment: boolean;
  description: string;
  id_course: string;
  link: string;
  name: string;
  set: number;
  sort: number;
  test: string;
  type: string;
  movie: string;
  action: string;
}

function AddActivity() {
  const etapRef = useRef<HTMLInputElement>(null);
  const courseRef = useRef<HTMLInputElement>(null);
  const setRef = useRef<HTMLInputElement>(null);
  const sortRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLInputElement>(null);
  const commentRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const testRef = useRef<HTMLInputElement>(null);
  const movieRef = useRef<HTMLInputElement>(null);
  const actionRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Push Function
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const activityRef = collection(database, "activities");
    const newActivity: ActivityData = {
      etap_id: etapRef.current?.value ?? "",
      comment: Boolean(commentRef.current?.value),
      description: descRef.current?.value ?? "",
      id_course: courseRef.current?.value ?? "",
      link: linkRef.current?.value ?? "",
      name: nameRef.current?.value ?? "",
      set: parseInt(setRef.current?.value ?? "0"),
      sort: parseInt(sortRef.current?.value ?? "0"),
      test: testRef.current?.value ?? "",
      type: typeRef.current?.value ?? "",
      movie: movieRef.current?.value ?? "",
      action: actionRef.current?.value ?? "",
    };
    addDoc(activityRef, newActivity)
      .then(() => {
        setMessage("Dodano do aktywności");
        setTimeout(() => setMessage(null), 2000); // clear message after 5 seconds
      })
      .catch(() => setMessage("Error"));
  }

  return (
    <EtapsContainer>
      <p>Dodaj aktywność do bazy</p>
      <form
        onSubmit={onSubmit}
        style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="Name">etap</label>
        <input ref={etapRef} />
        <label htmlFor="Name">course</label>
        <input ref={courseRef} />
        <label htmlFor="Name">set</label>
        <input ref={setRef} />
        <label htmlFor="Name">desc</label>
        <input ref={descRef} />
        <label htmlFor="Name">comment</label>
        <input ref={commentRef} />
        <label htmlFor="Name">link</label>
        <input ref={linkRef} />
        <label htmlFor="Name">name</label>
        <input ref={nameRef} />
        <label htmlFor="Name">sort</label>
        <input ref={sortRef} />
        <label htmlFor="Name">test</label>
        <input ref={testRef} />
        <label htmlFor="Name">type</label>
        <input ref={typeRef} />
        <label htmlFor="Name">movie</label>
        <input ref={movieRef} />
        <label htmlFor="Name">action</label>
        <input ref={actionRef} />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </EtapsContainer>
  );
}

export default AddActivity;

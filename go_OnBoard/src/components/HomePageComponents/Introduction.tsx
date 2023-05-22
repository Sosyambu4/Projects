import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import ReactPlayer from "react-player";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { firebaseConfig, database } from "../../utils/firebase/firebase.config";
import { initializeApp } from "firebase/app";
import { useUser } from "../RequireAuth/context/AuthContext";
import { updateDoc, doc } from "firebase/firestore";

initializeApp(firebaseConfig);
ReactModal.setAppElement("#root");

function Introduction() {
  const [showModal, setShowModal] = useState<boolean>(true);
  const [fileName, setFileName] = useState<string>("");
  const [downloadURL, setDownloadURL] = useState<string>("");
  const [key, setKey] = useState<number>(Date.now());
  const user = useUser();

  useEffect(() => {
    async function downloadFile() {
      const storage = getStorage();
      const fileRef = ref(storage, "hello.mp4");
      const url = await getDownloadURL(fileRef);
      const name = fileRef.name;
      setDownloadURL(url);
      setFileName(name);
    }
    downloadFile();
  }, []);

  function handleCloseModal() {
    setShowModal(false);
    if (user) {
      const userRef = doc(database, "users", user.uid);
      updateDoc(userRef, { introduction: true });
    }
  }

  function handlePlayerReady(player: any) {
    if (player && typeof player.play === "function") {
      player.play();
    }
  }

  function handleRestartVideo() {
    setKey(Date.now());
  }

  return (
    <div>
      <ReactModal
        overlayClassName="Overlay"
        className="ModalIntro"
        isOpen={showModal}
        contentLabel="Minimal Modal Example">
        {fileName && (
          <ReactPlayer
            key={key}
            url={downloadURL}
            playing
            controls={false}
            onReady={handlePlayerReady}
          />
        )}
        <button onClick={handleRestartVideo}>Odtwórz jeszcze raz</button>
        <button onClick={handleCloseModal}>Rozpocznij kurs</button>
      </ReactModal>
    </div>
  );
}

export default Introduction;

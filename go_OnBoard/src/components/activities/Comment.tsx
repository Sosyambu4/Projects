import React, { useRef, useState, useEffect } from "react";
import { database } from "../../utils/firebase/firebase.config";
import {
  collection,
  getDoc,
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { CommentContainer, CommentUser, StyledH5 } from "./Comment.styled";
import { useUser } from "../RequireAuth/context/AuthContext";

interface UserComment {
  comment: string;
  user_activity_id: string;
  create: any;
  user_id: string;
}

interface Props {
  activitiesId: string | null;
}

const CommentActivity: React.FC<Props> = (props) => {
  const user = useUser() || null;

  const activiti = props.activitiesId;

  const userCommentRef = useRef<HTMLInputElement>(null);
  const [hasCommented, setHasCommented] = useState(false); //state to check if user add comment
  const [isLoading, setIsLoading] = useState(true); //state to check if data is still being loaded

  useEffect(() => {
    setIsLoading(true);
    const commentRef = collection(database, "user_comment");
    const userCommentDocRef = doc(
      commentRef,
      `${activiti}`,
      "users",
      user?.uid || ""
    );

    // check if the user has already added a comment for this activity
    getDoc(userCommentDocRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        const commentData = docSnapshot.data();
        if (commentData?.user_id === (user?.uid || "")) {
          setHasCommented(true);
          if (userCommentRef.current) {
            userCommentRef.current.value = commentData?.comment;
          }
        }
      }
      setIsLoading(false);
    });
  }, [activiti, user]);

  function addComment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const commentRef = collection(database, "user_comment");
    const userCommentDocRef = doc(
      commentRef,
      `${activiti}`,
      "users",
      user?.uid || ""
    );

    // check if the document with user comment exists
    getDoc(userCommentDocRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        // document already exists, update the comment field
        updateDoc(userCommentDocRef, { comment: userCommentRef.current?.value })
          .then(() => console.log("Comment updated successfully"))
          .catch(() => console.log("Error updating comment"));
      } else {
        // document doesn't exist, create a new one
        const newComment: UserComment = {
          comment: userCommentRef.current?.value ?? "",
          user_activity_id: activiti || "",
          user_id: user?.uid || "",
          create: serverTimestamp(),
        };
        setDoc(userCommentDocRef, newComment)
          .then(() => {
            console.log("Comment added successfully");
            setHasCommented(true);
          })
          .catch(() => console.log("Error adding comment"));
      }
    });
  }

  return (
    <form onSubmit={addComment}>
      <CommentContainer>
        <StyledH5>Wpisz tekst swojej notatki</StyledH5>

        <CommentUser ref={userCommentRef} />

        <button
          type="submit"
          className="confirmButton"
          disabled={isLoading}>
          {isLoading
            ? "..."
            : hasCommented
            ? "Aktualizuj NOTATKĘ"
            : "Zapisz NOTATKĘ"}
        </button>
      </CommentContainer>
    </form>
  );
};

export default CommentActivity;

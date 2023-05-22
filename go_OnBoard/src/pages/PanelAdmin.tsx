import { useState } from "react";
import AddActivity from "../adminControl/AddActivity";
import AddUser from "../adminControl/AddUser";
import ProgressUser from "../adminControl/ProgressUser";
import ButtonLogout from "../components/RequireAuth/ButtonLogout";
import AddQuiz from "../adminControl/AddQuiz";

function PanelAdmin() {
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showProgressUser, setShowProgressUser] = useState(false);
  const [showAddQuiz, setShowQuiz] = useState(false);

  const handleShowAddActivity = () => {
    setShowAddActivity(true);
    setShowAddUser(false);
    setShowProgressUser(false);
    setShowQuiz(false);
  };

  const handleShowAddUser = () => {
    setShowAddActivity(false);
    setShowAddUser(true);
    setShowProgressUser(false);
    setShowQuiz(false);
  };

  const handleShowProgressUser = () => {
    setShowAddActivity(false);
    setShowAddUser(false);
    setShowProgressUser(true);
    setShowQuiz(false);
  };

  const handleShowAddQuiz = () => {
    setShowQuiz(true);
    setShowAddActivity(false);
    setShowAddUser(false);
    setShowProgressUser(false);
  };

  return (
    <>
      <h1>Panel Admina</h1>
      <div>
        <button onClick={handleShowAddActivity}>AddActivity</button>
        <button onClick={handleShowAddUser}>AddUser</button>
        <button onClick={handleShowProgressUser}>ProgressUser</button>
        <button onClick={handleShowAddQuiz}>AddQuiz</button>
        <ButtonLogout />
      </div>
      {showAddActivity && <AddActivity />}
      {showAddUser && <AddUser />}
      {showProgressUser && <ProgressUser />}
      {showAddQuiz && <AddQuiz />}
    </>
  );
}

export default PanelAdmin;

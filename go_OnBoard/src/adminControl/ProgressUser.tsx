import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../utils/firebase/firebase.config";

interface User {
  id: string;
  name: string;
  email: string;
  id_course: string;
  progress?: number;
}

function ProgressUser() {
  const [users, setUsers] = useState<User[]>([]);
  const [isProgressCalculated, setIsProgressCalculated] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    column: keyof User;
    direction: "asc" | "desc";
  }>({
    column: "name",
    direction: "asc",
  }); //learn how its work
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      const usersRef = collection(database, "users");
      const q = query(usersRef, where("role", "==", "user"));
      const usersData = await getDocs(q);
      const usersArray: User[] = [];
      usersData.forEach((doc) => {
        usersArray.push({
          id: doc.id,
          name: doc.data().name,
          email: doc.data().email,
          id_course: doc.data().id_course,
        });
      });
      setUsers(usersArray);
    };

    getUsers();
  }, []);

  useEffect(() => {
    if (users.length && !isProgressCalculated) {
      const calculateProgress = async () => {
        const activitiesRef = collection(database, "activities");
        const activitiesData = await getDocs(activitiesRef);
        const activitiesCount = activitiesData.size;

        const updatedUsers = await Promise.all(
          users.map(async (user) => {
            const userActivityRef = collection(database, "user_activities");
            const userActivitiesData = await getDocs(
              query(userActivityRef, where("user_id", "==", user.id))
            );
            const userActivitiesCount = userActivitiesData.size;
            const progress = (userActivitiesCount / activitiesCount) * 100;
            return { ...user, progress };
          })
        );

        setUsers(updatedUsers);
        setIsProgressCalculated(true);
      };

      calculateProgress();
    }
  }, [users, isProgressCalculated]);

  const columns: (keyof User)[] = ["name", "email", "id_course", "progress"];

  //copy paste from net, need to lear how its work
  const sortColumn = (column: keyof User) => {
    let newDirection: "asc" | "desc" = "asc";
    if (sortConfig.column === column && sortConfig.direction === "asc") {
      newDirection = "desc";
    }
    setSortConfig({ column, direction: newDirection });
  };

  const sortedUsers = [...users]
    .filter((user) => {
      if (selectedCourse && user.id_course !== selectedCourse) {
        return false;
      }
      if (
        searchTerm &&
        user.name &&
        !user.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      const column = sortConfig.column;
      const directionMultiplier = sortConfig.direction === "asc" ? 1 : -1;

      if (column === "progress") {
        return directionMultiplier * ((b.progress || 0) - (a.progress || 0));
      }

      // Check if both properties exist before comparing them
      if (a[column] && b[column]) {
        return directionMultiplier * a[column].localeCompare(b[column]);
      }

      // Handle missing properties
      if (!a[column]) return directionMultiplier * 1;
      if (!b[column]) return directionMultiplier * -1;

      // If both properties are missing, consider them equal
      return 0;
    });

  const courseIds = Array.from(new Set(users.map((user) => user.id_course)));

  return (
    <div>
      <input
        type="text"
        placeholder="Wyszukaj po imieniu"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        value={selectedCourse}
        onChange={(e) => setSelectedCourse(e.target.value)}>
        <option value="">Wszystkie kursy</option>
        {courseIds.map((courseId) => (
          <option
            key={courseId}
            value={courseId}>
            {courseId}
          </option>
        ))}
      </select>
      <table style={{ border: "1px solid black", minWidth: "800px" }}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                onClick={() => sortColumn(column)}
                style={{ cursor: "pointer", border: "1px solid black" }}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              {columns.map((column) => (
                <td
                  key={`${user.id}-${column}`}
                  style={{ border: "1px solid black" }}>
                  {column === "progress"
                    ? `${user.progress?.toFixed(0) ?? "0.00"}%`
                    : user[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProgressUser;

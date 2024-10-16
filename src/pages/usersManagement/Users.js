import React, { useState, useEffect } from "react";
import axios from "axios";
import UserData from "./UserData";
import UserFilter from "./UserFilter";
import "./user.scss";

const serverUrl = process.env.REACT_APP_SERVER_URL;
function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  console.log(users);
  // fetch all users
  async function fetchAllUsers() {
    try {
      const usersRes = await axios.get(`${serverUrl}/admin/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setUsers(usersRes.data.reverse());
      setFilteredUsers(usersRes.data.reverse());
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);

  // ---------------  filter data ------------

  const handleFilterChange = ({ username, status, email, role }) => {
    let filtered = users;
    // Filter by role if a role is selected
    if (role) {
      filtered = filtered.filter((user) => user.role === role);
    }
    // Filter by status if a status is selected
    if (status === "active") {
      filtered = filtered.filter((user) => user.isActive === true);
    } else if (status === "inactive") {
      filtered = filtered.filter((user) => user.isActive === false);
    }
    // Filter by usernmae if a usernmae is entered
    if (username) {
      filtered = filtered.filter((user) =>
        user.username.toLowerCase().includes(username.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  };
  return (
    <div className="user-container">
      <div className="users-title-container">
        <h1>Users</h1>
      </div>

      <UserFilter onFilterChange={handleFilterChange} />
      <UserData filteredUsers={filteredUsers} />
    </div>
  );
}

export default Users;

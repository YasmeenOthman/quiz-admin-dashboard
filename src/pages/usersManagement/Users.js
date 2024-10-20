import React, { useState, useEffect } from "react";
import axios from "axios";
import UserData from "./UserData";
import UserFilter from "./UserFilter";
import BasicButton from "../../components/BasicButton";
import "./user.scss";
import UserEditModal from "./UserEditModal";

const serverUrl = process.env.REACT_APP_SERVER_URL;
function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // --------- fetch all users ---------------
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

  // ----------Edit user-------------

  const handleEditUser = (user) => {
    console.log(user);
    setSelectedUser(user); // Open the modal and set the user to be edited
  };

  const handleSaveUser = async (updatedUser) => {
    try {
      await axios.put(
        `${serverUrl}/admin/users/${updatedUser._id}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      fetchAllUsers();
      setSelectedUser(null);
    } catch (error) {
      console.error(error);
    }
  };
  // ------------Delete user ---------------
  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${serverUrl}/admin/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        fetchAllUsers(); // Refresh the list
      } catch (error) {
        console.error("Error deleting user", error);
      }
    }
  };

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

  // ------------------------------------------------------------------------
  return (
    <div className="user-container">
      <div className="users-title-container">
        <h1>Users</h1>
        <BasicButton
          value="Create New User"
          type="button"
          style={{ color: "white" }}
        />
      </div>

      <UserFilter onFilterChange={handleFilterChange} />
      <UserData
        filteredUsers={filteredUsers}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
      />
      {selectedUser && (
        <UserEditModal
          user={selectedUser}
          onSave={handleSaveUser}
          onCancel={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}

export default Users;

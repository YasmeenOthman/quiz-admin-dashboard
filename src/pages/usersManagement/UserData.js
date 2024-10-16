import axios from "axios";
import React, { useEffect, useState } from "react";

const serverUrl = process.env.REACT_APP_SERVER_URL;

function UserData({ filteredUsers }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Format the date (e.g., 27 Feb, 2024)
    const formattedDate = date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    // Format the time (e.g., 13:39)
    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // 24-hour format
    });

    return { formattedDate, formattedTime };
  };

  return (
    <div className="user-table-container">
      <table className="table">
        <thead>
          <tr className="table-row-header">
            <th></th>
            <th>User name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Registration date</th>
            <th>Quizzez taken</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => {
            const { formattedDate, formattedTime } = formatDate(
              user.dateRegistered
            );
            return (
              <tr className="table-row-data" key={user._id}>
                <td>
                  <input className="table-checkbox" type="checkbox" />
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.isActive ? "Active" : "Not  Active"}</td>
                <td>
                  <div className="formattedDate">{formattedDate}</div>
                  <div className="formattedTime">{formattedTime}</div>
                </td>
                <td>{user.quizzesTaken.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserData;

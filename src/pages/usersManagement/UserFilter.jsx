import React, { useState, useEffect } from "react";

const initialData = {
  role: "",
  status: "",
  username: "",
  email: "",
};
function UserFilter({ onFilterChange }) {
  const [filteredData, setFilteredData] = useState(initialData);

  function handleChange(e) {
    const { name, value } = e.target;
    setFilteredData({ ...filteredData, [name]: value });
  }

  useEffect(() => {
    handleFilterChange();
  }, [filteredData.status, filteredData.username, filteredData.role]); // Trigger filter change whenever category, status, or title changes

  const handleFilterChange = () => {
    onFilterChange(filteredData);
  };

  return (
    <div className="user-filter-container">
      <input
        className="user-filter-inputs"
        type="text"
        placeholder="Filter by name"
        value={filteredData.username}
        name="username"
        onChange={handleChange}
      />
      <select
        className="user-filter-inputs"
        value={filteredData.role}
        name="role"
        onChange={handleChange}
      >
        <option value="">All Role</option>
        <option value="student">student</option>
        <option value="admin">admin</option>
      </select>
      <select
        className="user-filter-inputs"
        value={filteredData.status}
        name="status"
        onChange={handleChange}
      >
        <option value="">All Statuses</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
}

export default UserFilter;

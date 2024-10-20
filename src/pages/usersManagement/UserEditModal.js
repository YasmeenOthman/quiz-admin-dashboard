import { useState } from "react";


function UserEditModal({ user, onSave, onCancel }) {
  const [formData, setFormData] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <input name="email" value={formData.email} onChange={handleChange} />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="admin">Admin</option>
          <option value="student">Student</option>
        </select>
        <select name="status" value={formData.isActive} onChange={handleChange}>
          <option value="true">Activate</option>
          <option value="false">Deactivate</option>
          {/* <option value="deleted">Delete</option> */}
        </select>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default UserEditModal;

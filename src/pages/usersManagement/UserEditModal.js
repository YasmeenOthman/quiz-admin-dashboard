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
    <div className="blurBackground">
      <div className="edit-user-modal">
        <div className="modal-header">
          <h2>Edit User</h2>
          <button className="close-btn" onClick={onCancel}>
            &times;
          </button>
        </div>
        <form className="modal-body" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="admin">Admin</option>
              <option value="student">Student</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.isActive}
              onChange={handleChange}
            >
              <option value="true">Activate</option>
              <option value="false">Deactivate</option>
            </select>
          </div>
          <div className="modal-footer">
            <button className="save-btn" type="submit">
              Save
            </button>
            <button className="cancel-btn" type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserEditModal;

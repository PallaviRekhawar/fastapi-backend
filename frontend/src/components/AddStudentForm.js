import React, { useState } from 'react';
import axios from 'axios';

const AddStudentForm = ({ onStudentAdded }) => {
  const [form, setForm] = useState({ name: '', email: '', course: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // FIX: use relative URL (was missing trailing slash which caused 307 redirect issues)
      await axios.post('/students/', form);
      setForm({ name: '', email: '', course: '' });
      onStudentAdded();
    } catch (err) {
      alert('Failed to add student');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Course"
        value={form.course}
        onChange={(e) => setForm({ ...form, course: e.target.value })}
        required
      />
      <button type="submit">Add Student</button>
    </form>
  );
};

export default AddStudentForm;

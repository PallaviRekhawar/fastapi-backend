import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddStudentForm from './AddStudentForm';
import StudentList from './StudentList';

const StudentDashboard = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  const fetchStudents = async () => {
    try {
      // FIX: use relative URL so axios baseURL applies
      const res = await axios.get('/students/');
      setStudents(res.data);
      setError('');
    } catch (err) {
      setError('Failed to load students');
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const onStudentAdded = () => fetchStudents();
  const onStudentDeleted = () => fetchStudents();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="dashboard">
      <button
        onClick={handleLogout}
        className="logout-btn"
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: '#f56565',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '30px',
          cursor: 'pointer',
          zIndex: 1000,
          fontWeight: 'bold'
        }}
      >
        Logout
      </button>
      <h1>Student Management System</h1>
      {error && <div className="error">{error}</div>}
      <AddStudentForm onStudentAdded={onStudentAdded} />
      <StudentList students={students} onStudentDeleted={onStudentDeleted} />
    </div>
  );
};

export default StudentDashboard;

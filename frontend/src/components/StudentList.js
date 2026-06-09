import React, { useState } from 'react';
import axios from 'axios';

const StudentList = ({ students, onStudentDeleted }) => {
  const [recommendations, setRecommendations] = useState(null);
  const [loadingRec, setLoadingRec] = useState(false);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this student?')) {
      // FIX: use relative URL
      await axios.delete(`/students/${id}`);
      onStudentDeleted();
    }
  };

  const handleRecommendations = async (id) => {
    setLoadingRec(true);
    try {
      // FIX: use relative URL
      const res = await axios.get(`/student/${id}/study_recommendations`);
      setRecommendations(res.data);
    } catch (err) {
      alert('Failed to get recommendations');
    } finally {
      setLoadingRec(false);
    }
  };

  const closeModal = () => setRecommendations(null);

  return (
    <div>
      <h2>Students</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.course}</td>
              <td>
                <button onClick={() => handleRecommendations(s.id)} disabled={loadingRec}>
                  Study Recs
                </button>
                <button onClick={() => handleDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loadingRec && <div className="loading">Loading recommendations...</div>}
      {recommendations && (
        <>
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal">
            <h3>Recommendations for {recommendations.course}</h3>
            <pre>{recommendations.recommendations}</pre>
            <button onClick={closeModal}>Close</button>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentList;

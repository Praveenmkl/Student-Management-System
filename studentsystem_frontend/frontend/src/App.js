import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [students, setStudents] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    const newStudent = { name, address };

    fetch("http://localhost:8080/student/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStudent)
    }).then(() => {
      console.log("New Student Added");
      setName('');
      setAddress('');
      fetchStudents(); // Refresh student list after adding
    });
  };

  const fetchStudents = () => {
    fetch("http://localhost:8080/student/getAll")
      .then(res => res.json())
      .then((result) => {
        setStudents(result);
        console.log("Student list:", result);
      });
  };

  // 🔥 DELETE student by ID
  const handleDelete = (id) => {
    fetch(`http://localhost:8080/student/delete?id=${id}`, {
      method: "DELETE"
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to delete student");
        }
        fetchStudents(); 
        // handle success (e.g., refresh data or update state)
      })
      .catch(error => {
        console.error("Error deleting student:", error);
      });
  };

  useEffect(() => {
    fetchStudents(); // Load students on component mount
  }, []);

  return (
    <div>
      <div className="navbar">
        <h2>STUDENT MANAGEMENT SYSTEM</h2>
      </div>

      <div className="form-container">
        <h3 className="form-title">Add Student</h3>
        <form>
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Student Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <button type="submit" onClick={handleClick}>Add</button>
        </form>
      </div>

      <div className="student-list">
        <h3>Records</h3>
        <table className="student-table">
          <thead className="table-header">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.address}</td>
                <td>
                  <button className="btn btn-secondary me-2">Edit</button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
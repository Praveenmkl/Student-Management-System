import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [students, setStudents] = useState([])
  const [student , setStudent] = useState([])

  const handleClick = (e) => {
    e.preventDefault()
    const student = { name, address }

    console.log(student)
    fetch("http://localhost:8080/student/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student)
    }).then(() => {
      console.log("New Student Added")
      setStudent(student)
    })
  }

  useEffect(() => {
    fetch("http://localhost:8080/student/getAll")
      .then(res => res.json())
      .then((result) => {
        setStudents(result);
        console.log("student list", result);
      });
  }, [student]);



  return (
    <div>
      <div className="navbar">
        <h2>Student Management System</h2>
      </div>

      <div className="form-container">
        <h3 className="form-title">Add Student</h3>
        <form >
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
          <button type="submit" onClick={handleClick}>SUBMIT</button>
        </form>

      </div>

      <div className="student-list">
        <h3>Students</h3>
        {students.length > 0 ? (
          students.map((student) => (
            <div className="student-card" key={student.id}>
              <p><strong>Id:</strong> {student.id}</p>
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Address:</strong> {student.address}</p>
            </div>
          ))
        ) : (
          <p>No students available</p>
        )}
      </div>
    </div>
  );
}

export default App;

package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.Student;

import java.util.List;

public interface StudentService {
    public void saveStudent(Student student);
    public List<Student> getAllStudents();
}

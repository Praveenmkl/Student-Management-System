package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.Student;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface StudentService {
    public void deleteStudentById(@RequestParam long id);
    public void saveStudent(Student student);
    public List<Student> getAllStudents();

    Student updateStudent(Long id, Student student);
}



import Student from '../models/student.modal.js';

// Registration function
export const register = async (req, res) => {
  const { studentName, studentEmail, studentId, studentRollNumber, externalSetNumber, internalSetNumber, vivaSetNumbersArray } = req.body;

  // Validate the input data
  if (!studentName || !studentEmail || !studentId || !studentRollNumber || externalSetNumber === undefined || internalSetNumber === undefined || !Array.isArray(vivaSetNumbersArray)) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if a student with this email, ID, or roll number already exists
    const existingStudent = await Student.findOne({ 
      $or: [
        { studentEmail }, 
        { studentId }, 
        { studentRollNumber }
      ] 
    });

    if (existingStudent) {
      return res.status(409).json({ error: "Student with this email, ID, or roll number already exists" });
    }

    // Create a new student
    const newStudent = new Student({
      studentName,
      studentEmail,
      studentId,
      studentRollNumber,
      externalSetNumber,
      internalSetNumber,
      vivaSetNumbersArray,
    });

    // Save the new student to the database
    await newStudent.save();

    // Registration successful
    return res.status(201).json({
      message: "Registration successful",
      student: {
        studentName: newStudent.studentName,
        studentEmail: newStudent.studentEmail,
        studentId: newStudent.studentId,
        studentRollNumber: newStudent.studentRollNumber,
        externalSetNumber: newStudent.externalSetNumber,
        internalSetNumber: newStudent.internalSetNumber,
        vivaSetNumbersArray: newStudent.vivaSetNumbersArray,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Login function (for returning users)
export const login = async (req, res) => {
  const { studentId, studentEmail, studentRollNumber } = req.body;

  // Validate the input data
  if (!studentId || !studentEmail || !studentRollNumber) {
    return res.status(400).json({ error: "Student ID, email, and roll number are required" });
  }

  try {
    // Search for the student by studentId, studentEmail, and studentRollNumber
    const student = await Student.findOne({ studentId, studentEmail, studentRollNumber });

    // If no student is found
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // If student is found, return success message
    return res.status(200).json({
      message: "Login successful",
      student: {
        studentName: student.studentName,
        studentEmail: student.studentEmail,
        studentId: student.studentId,
        studentRollNumber: student.studentRollNumber,
        externalSetNumber: student.externalSetNumber,
        internalSetNumber: student.internalSetNumber,
        vivaSetNumbersArray: student.vivaSetNumbersArray,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

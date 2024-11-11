import Student from '../models/student.modal.js';
import VivaQuestionResponse from '../models/viva.modals.js';

// Registration function
export const register = async (req, res) => {
  const { studentName, studentEmail, studentId, studentRollNumber, externalSetNumber, internalSetNumber, vivaSetNumbersArray, className } = req.body;

  // Validate the input data
  if (!studentName || !studentEmail || !studentId || !studentRollNumber || externalSetNumber === undefined || internalSetNumber === undefined || !Array.isArray(vivaSetNumbersArray) || vivaSetNumbersArray.length !== 10 || !className) {
    return res.status(400).json({ error: "All fields are required, vivaSetNumbersArray should have exactly 10 numbers, and className is required" });
  }

  try {
    // Check if a student with this email, ID, or roll number already exists
    const existingStudent = await Student.findOne({
      $or: [
        { studentEmail },
        { studentId }
      ]
    });

    if (existingStudent) {
      return res.status(409).json({ error: "Student with this email, ID, or roll number already exists" });
    }

    // Create a new student with className
    const newStudent = new Student({
      studentName,
      studentEmail,
      studentId,
      studentRollNumber,
      externalSetNumber,
      internalSetNumber,
      vivaSetNumbersArray,
      className, // Include className
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
        className: newStudent.className, // Include className in response
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: error.message });
  }
};

// Login function (for returning users)
export const login = async (req, res) => {
  const { studentId, studentEmail } = req.body;

  // Validate the input data
  if (!studentId || !studentEmail ) {
    return res.status(400).json({ error: "Student ID, email, and roll number are required" });
  }

  try {
    // Search for the student by studentId, studentEmail, and studentRollNumber
    const student = await Student.findOne({ studentId, studentEmail });

    // If no student is found
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // If student is found, return success message with className
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
        className: student.className, // Include className in response
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Create or update viva response function
export const createOrUpdateVivaResponse = async (req, res) => {
  const { studentId, vivaResponse } = req.body;

  // Validate the input data
  if (!studentId || !Array.isArray(vivaResponse)) {
    return res.status(400).json({ error: "Student ID and vivaResponse array are required" });
  }

  try {
    // Check if the student already has a viva response record
    const existingResponse = await VivaQuestionResponse.findOne({ studentId });

    // If the student already has a record, update it
    if (existingResponse) {
      existingResponse.vivaResponse = vivaResponse;
      await existingResponse.save();
      return res.status(200).json({
        message: "Viva responses updated successfully",
        vivaResponse: existingResponse,
      });
    } else {
      // Otherwise, create a new viva response record for the student
      const newVivaResponse = new VivaQuestionResponse({
        studentId,
        vivaResponse,
      });
      await newVivaResponse.save();
      return res.status(201).json({
        message: "Viva responses created successfully",
        vivaResponse: newVivaResponse,
      });
    }
  } catch (error) {
    console.error("Viva Response error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Route to get viva responses for a specific student
export const getVivaResponses = async (req, res) => {
  const { studentId } = req.params;

  try {
    // Find the viva responses by studentId
    const vivaResponse = await VivaQuestionResponse.findOne({ studentId });

    if (!vivaResponse) {
      return res.status(404).json({ error: "Viva responses not found for this student" });
    }

    // Return the student's viva responses
    return res.status(200).json({
      message: "Viva responses fetched successfully",
      vivaResponse,
    });
  } catch (error) {
    console.error("Viva Response fetch error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

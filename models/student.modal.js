import mongoose from "mongoose";

// Define the student schema
const studentSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
    },
    studentEmail: {
      type: String,
      required: true,
      unique: true, // Ensures each email is unique
      lowercase: true,
      trim: true,
    },
    studentId: {
      type: String,
      required: true,
      unique: true, // Ensures each student ID is unique
    },
    studentRollNumber: {
      type: String,
      required: true,
      unique: true, // Ensures each roll number is unique
    },
    externalSetNumber: {
      type: Number,
      required: true,
    },
    internalSetNumber: {
      type: Number,
      required: true,
    },
    vivasetNumbersArray: {
      type: [Number], // Array of numbers
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export the model based on the schema
const Student = mongoose.model("CSE6", studentSchema);

export default Student;

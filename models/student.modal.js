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
    className: {  // New field added
      type: String,
      required: true,  // You can set this as required or not, depending on your needs
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export the model based on the schema
const Student = mongoose.model("CSE_13-11", studentSchema);

export default Student;

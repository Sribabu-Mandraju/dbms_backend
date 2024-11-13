import mongoose from "mongoose";

// Define the viva question response schema
const vivaQuestionResponseSchema = new mongoose.Schema(
  {
    studentId: {
      type: String, // Student ID as a string (e.g., N210522)
      required: true, // Makes the studentId field required
    },
    className: {
      type: String, // Student ID as a string (e.g., N210522)
      required: true, // Makes the studentId field required
    },
    vivaResponse: [
      {
        question: {
          type: String,
          required: true, // Ensures that the question is provided
        },
        answer: {
          type: String,
          required: true, // Ensures that an answer is provided
        },
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export the model based on the schema
const VivaQuestionResponse = mongoose.model("VivaQuestionResponse_13-11", vivaQuestionResponseSchema);

export default VivaQuestionResponse;

// some edited

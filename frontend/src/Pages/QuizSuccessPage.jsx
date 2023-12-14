
import React from 'react';

import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const QuizSuccessPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md flex flex-col gap-4">
        <div className="text-4xl text-green-500 mb-4">
          <FaCheckCircle />
        </div>
        <h2 className="text-2xl font-bold mb-4">Quiz Successfully Completed!</h2>
        <p className="text-gray-600">
          Congratulations! You have successfully completed the quiz.
        </p>
        <Link to={"/"} className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default QuizSuccessPage;

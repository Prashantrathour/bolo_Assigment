import React from 'react';

import { useNavigate } from "react-router-dom";

const FormCard = ({ form, onEdit, onDelete }) => {
  const { _id, title, image, questions, createdAt } = form;
  const Navigate = useNavigate();

  const handleEdit = () => {
    
    onEdit(_id);
  };

  const handleDelete = () => {
   
    onDelete(_id);
  };

  return (
    <div className="border p-4 mb-4 rounded-md">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex items-center space-x-2">
        
          <button onClick={handleDelete} className="text-red-600 hover:underline font-semibold">
            Delete
          </button>
        
          <button onClick={()=>Navigate(`/view/${_id}`)} className="text-green-600 font-semibold hover:underline">
            Preview
          </button>
        
        </div>
      </div>
      {image && <img src={image} alt="Form" className="mb-2 rounded-md w-24 h-24" />}
      <p className="text-gray-600">{`Number of Questions: ${Object.keys(questions).length}`}</p>
      <p className="text-gray-600">{`Created at: ${new Date(createdAt).toLocaleString()}`}</p>
    </div>
  );
};

export default FormCard;

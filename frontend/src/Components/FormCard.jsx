import React from 'react';

const FormCard = ({ form, onEdit, onDelete }) => {
  const { _id, title, image, questions, createdAt } = form;

  const handleEdit = () => {
    // Implement your edit logic here, e.g., pass form ID to a parent component
    onEdit(_id);
  };

  const handleDelete = () => {
    // Implement your delete logic here, e.g., pass form ID to a parent component
    onDelete(_id);
  };

  return (
    <div className="border p-4 mb-4 rounded-md">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex items-center space-x-2">
          <button onClick={handleEdit} className="text-blue-600 hover:underline">
            Edit
          </button>
          <button onClick={handleDelete} className="text-red-600 hover:underline">
            Delete
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

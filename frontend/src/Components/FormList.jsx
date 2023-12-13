import React from 'react';
import FormCard from './FormCard';

const FormList = ({ data, handleEditForm, handleDeleteForm }) => {
    
  return (
    <div>
      {data?.map((form) => (
        <FormCard
          key={form._id}
          form={form}
          onEdit={handleEditForm}
          onDelete={handleDeleteForm}
        />
      ))}
    </div>
  );
};

export default FormList;

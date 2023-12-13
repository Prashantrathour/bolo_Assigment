import React, { useEffect } from 'react'
import {useSelector,useDispatch} from "react-redux"
import { getQuestion } from '../Redux/AllQuestion/action'
import FormList from './FormList'
function AllQuestions() {
    const {data}=useSelector((store)=>store.allquestionreducer)
    const dispatch =useDispatch()
console.log(data)

const handleEditForm = (formId) => {
    // Implement your edit logic here, e.g., navigate to the edit form page
    console.log(`Edit form with ID: ${formId}`);
  };

  const handleDeleteForm = (formId) => {
    // Implement your delete logic here, e.g., send a delete request to the API
    console.log(`Delete form with ID: ${formId}`);
  };
    useEffect(()=>{
        dispatch(getQuestion)
    },[])
  return (
    <div>
         <FormList data={data} handleEditForm={handleEditForm} handleDeleteForm={handleDeleteForm} />
    </div>
  )
}

export default AllQuestions
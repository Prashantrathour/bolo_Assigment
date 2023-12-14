import React, { useEffect, useState } from 'react'
import {useSelector,useDispatch} from "react-redux"
import { getQuestion } from '../Redux/AllQuestion/action'
import FormList from './FormList'
import { deleteform } from '../Redux/AddForm/action'
import { errorAlert, succesAlert } from './Notification'
import {ToastContainer} from "react-toastify"
import Loader from './Loader'
function AllQuestions() {
  const [update,setupdate]=useState(false)
    const res=useSelector((store)=>store.allquestionreducer)
    const {data,isLoading}=res
    const dispatch =useDispatch()


const handleEditForm = (formId) => {
    
    console.log(`Edit form with ID: ${formId}`);
  };

  const handleDeleteForm = async(formId) => {
    try {
      let res=await dispatch(deleteform(formId))
      console.log(res)
      succesAlert(res.data.message)
      setupdate(!update)
    } catch (error) {
      console.log(error)
      errorAlert(error?.response?.data?.message)
    }
  };
    useEffect(()=>{
        dispatch(getQuestion)
    },[update])
    if(isLoading){
      return <div className='absolute left-0 right-0 top-0 z-10 bg-black opacity-50 w-screen h-screen flex justify-center items-center'><Loader/></div>
    }

    console.log(res)
  return (
    <div>
      <ToastContainer/>
         <FormList data={data} handleEditForm={handleEditForm} handleDeleteForm={handleDeleteForm} />
    </div>
  )
}

export default AllQuestions
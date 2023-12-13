import axios from "axios"
import { Question_Error, Question_request, Question_success } from "./actiontype"

export const getQuestion=async(dispatch)=>{
    dispatch({type:Question_request})
        try {
            const res=await axios.get(process.env.REACT_APP_URL+'/form')
            dispatch({type:Question_success,payload:res.data})


        } catch (error) {
            dispatch({type:Question_Error})
        }
}
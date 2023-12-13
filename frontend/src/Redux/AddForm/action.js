import axios from "axios"
import { FORM_Error, FORM_request, FORM_success } from "./actiontype"

export const getFORM=async(dispatch)=>{
    dispatch({type:FORM_request})
        try {
            const res=await axios.get(process.env.REACT_APP_URL+'/form')
            dispatch({type:FORM_success,payload:res.data})


        } catch (error) {
            dispatch({type:FORM_Error})
        }
}
export const postform=(data)=>async(dispatch)=>{
    dispatch({type:FORM_request})
        try {
            const res=await axios.post(process.env.REACT_APP_URL+'/form',data)
            
            dispatch({type:FORM_success,payload:res?.data?.data})

            return res
        } catch (error) {
            dispatch({type:FORM_Error})
        }
}
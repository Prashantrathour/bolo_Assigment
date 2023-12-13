import { Question_Error, Question_request, Question_success } from "./actiontype";

   const initialstate={
    isLoading: false,
    data:[],
    isError: false
   }


export const reducer=(state=initialstate,{type,payload})=>{
    switch (type) {
        case Question_request:
            return {...state,isLoading:true}
        case Question_success:
            return {...state,isLoading:false,data:payload}
        case Question_Error:
            return {...state,isLoading:false,isError:true}
    
        default:
            return state;
    }
}
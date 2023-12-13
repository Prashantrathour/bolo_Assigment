import { FORM_Error, FORM_request, FORM_success } from "./actiontype";

   const initialstate={
    isLoading: false,
    data:[],
    isError: false
   }


export const reducer=(state=initialstate,{type,payload})=>{
    switch (type) {
        case FORM_request:
            return {...state,isLoading:true}
        case FORM_success:
            return {...state,isLoading:false,data:payload}
        case FORM_Error:
            return {...state,isLoading:false,isError:true}
    
        default:
            return state;
    }
}
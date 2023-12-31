
import React, { useEffect, useRef, useState } from "react";
import QuestionCard from "./QuestionCard";
import {useDispatch,useSelector} from "react-redux"
import { IoCloudUploadOutline, IoTicketOutline } from "react-icons/io5";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { CiSettings } from "react-icons/ci";
import { FaCheck, FaCross, FaRegEye, FaTruckLoading } from "react-icons/fa";
import { FaFolderPlus, FaPlus } from "react-icons/fa6";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { postform } from "../Redux/AddForm/action";
import {ToastContainer} from "react-toastify"
import { errorAlert, succesAlert, warningAlert } from "./Notification";
function CreateForm() {
  let [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();

  const [question, setQuestions] = useState([
    {
      type: "Categorize",
      question: "",
      image: "",
      categories: [""],
      items: [{ value: "", belong: "" }],
    },
  ]);

  // state and ref for form Header
  const [header, setHeader] = useState("");
  const [FormID, setFormID] = useState("");
  const [image, setImage] = useState("");
  const [loading,setLoading]=useState(false)
  const getdata=useSelector((store)=>store.addform)
   const {isLoading,data}=getdata
  const formName = useRef();
const dispatch =useDispatch()
 
  const Navigate = useNavigate();
  async function handleSubmit() {
    if (header == "") {
      warningAlert("Form Header required");
      formName.current.focus();
    } else {
      try {
      
        if (searchParams.get("page")== "add-questions") {
          const res= await dispatch(postform({
            title: header,
            image: image,
            questions: question,
          }));
          
          setFormID(res?.data?.data?._id)
        
          succesAlert(res.data.message)
        }
        
      } catch (error) {
        console.log(error?.res?.data?.message||"error", "error");
        errorAlert("error please refress")
      }
    }
  }

  
  async function uploadImage(e) {
    const image = e.target.files[0];
    const images = new FormData();
    images.append("file", image);
    images.append("upload_preset", "prashant_cloud");
    images.append("cloud_name", "djpuwf2xv");

    try {
      setLoading(true);
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/djpuwf2xv/image/upload`,
        images
      );
      
      setImage(res?.data?.url);
      succesAlert("Image uploaded successfully");
      setLoading(false);
    } catch (error) {
      console.error(error);
      errorAlert("Image upload failed");
      setLoading(false);
    }
  }

  return (
    <div className="p-0 m-0">
      <ToastContainer/>
      <div className="flex justify-end w-full items-center text-center">
        <div className="flex gap-3  items-center text-center px-3 ">
          <FaFolderPlus className="font-bold text-2xl" />
          <FaRegEye className="font-bold text-2xl" />
          <CiSettings className="font-bold text-2xl" />
          <button onClick={()=>setQuestions([
    {
      type: "Categorize",
      question: "",
      image: "",
      categories: [""],
      items: [{ value: "", belong: "" }],
    },
  ])} className="p-2 px-3 text-white bg-red-600 text-md font-semibold rounded-lg">
            Cancel
          </button>
          <button onClick={handleSubmit} className="p-2 px-3 w-[200px] text-center text-white bg-blue-600 text-md font-semibold rounded-lg">
           { !isLoading?"Save & Proceed":<h1>Loading...</h1>}
          </button>

        </div>
        </div>
      <div className="flex justify-between border w-full gap-4 p-4">
        <input
          onChange={(e) => setHeader(e.target.value)}
          ref={formName}
          value={header}
          type="text"
          className="w-1/2 p-2"
          placeholder="Enter form Name"
        />
      <div
        onClick={() => document.getElementById("getFile").click()}
        className="text-center text-white font-bold flex flex-col justify-center rounded-xl cursor-pointer  bg-green-400 p-4"
      >
        {!loading?<h4 className="font-bold flex justify-center items-center gap-3">
          <IoCloudUploadOutline />{" "}
          <span className="overflow-hidden"> Optional</span>
        </h4>:"loading...."}
        
        <input
          type="file"
          onChange={(e) => uploadImage(e)}
          id="getFile"
          style={{ display: "none" }}
        />
      </div>
      </div>

      {/* mapping questions */}
      {question.map((el, ind) => (
        <QuestionCard
          key={ind}
          data={el}
          ind={ind}
          question={question}
          setQuestions={setQuestions}
        />
      ))}

    

     
    </div>
  );
}

export default CreateForm;

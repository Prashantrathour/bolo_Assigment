import axios from "axios";
import React, { useEffect, useState } from "react";
import { RxReset } from "react-icons/rx";
import { ToastContainer } from "react-toastify";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { FaImage } from "react-icons/fa6";
import CategorizePreview from "../Components/CategorizePreview";
import ClozePreview from "../Components/ClozePreview";
import ComprehensionPreview from "../Components/ComprehensionPreview";
import { useNavigate, useParams } from "react-router-dom";
import { errorAlert, succesAlert } from "../Components/Notification";
import { IoMdExit } from "react-icons/io";
function Preview() {
  const {
    isOpen: messageIsOpen,
    onOpen: messageOnOpen,
    onClose: messageOnClose,
  } = useDisclosure();
  const [data, setData] = useState({});
  const [Loading, setLoading] = useState(false);
  const [ques, setques] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showImage, setShowImage] = useState("");
  const Navigate = useNavigate();
  const params = useParams();

  async function fetchData() {
    let res = await axios.get(`${process.env.REACT_APP_URL}/form/${params.id}`);

    setData(res.data);
    setques(Object.values(res.data.questions));
  }

  async function handleSubmit() {
    const { questions, _id } = data;

    try {
      setLoading(true);
      const res = await axios.post(process.env.REACT_APP_URL + "/response", {
        questions,
        formid: _id,
        user: "admin",
        marks: 34,
      });
      setLoading(false);
      succesAlert(res.data.message);
      setTimeout(() => {
        Navigate("/successPage");
      }, 2000);
    } catch (error) {
      console.log(error);
      setLoading(false);
      errorAlert(error?.response?.data?.message || "Error");
    }
  }
  console.log(data);
  useEffect(() => {
    fetchData();
  }, []);
  if (!data) {
    return "no data";
  }
  return (
    <div className="p-5">
      <ToastContainer />
      <nav className="flex gap-5  rounded-lg items-center border-b justify-between p-2 w-full">
        <div>
          <div className="flex justify-between mx-2">
            <h2 className="font-bold text-md ">Description:</h2>
          </div>
          <h2 className="font-semibold text-md ">{data?.title}</h2>
        </div>
        
            <div className="flex gap-4 items-center">
        <FaImage
        className="cursor-pointer"
          size={"40px"}
          onClick={() => {
            setShowImage(data.image);
            onOpen();
          }}
        />
              <button
                onClick={fetchData}
                className="p-2 px-4 bg-blue-950 text-white flex gap-2 rounded-md justify-center items-center text-center"
              >
                <RxReset className="text-md font-bold" />
                <span>(Reset)</span>
              </button>
              <button
                onClick={() => Navigate(-1)}
                className="p-2 px-4 bg-blue-950 text-white flex gap-2 rounded-md justify-center items-center text-center"
              >
                <IoMdExit className="text-md font-bold" />
                <span>(exit)</span>
              </button>
            </div>
      </nav>

      
      {!data.title ? (
        <h2 className="text-center text-[20px] font-semibold my-5">
          No Data 
        </h2>
      ) : null}

      {ques?.map((el, ind) => (
        <div
          key={ind}
          className="p-3 my-3 rounded-lg border-l-8 border-l-blue-400 border-2 border-gray-300 "
        >
          {el.type == "Categorize" ? (
            <CategorizePreview
              ind={ind}
              currentdata={el}
              data={data}
              setData={setData}
              setShowImage={setShowImage}
              onOpen={onOpen}
            />
          ) : null}
          {el.type == "Cloze" ? (
            <ClozePreview
              ind={ind}
              currentdata={el}
              data={data}
              setData={setData}
              setShowImage={setShowImage}
              onOpen={onOpen}
            />
          ) : null}
          {el.type == "Comprehension" ? (
            <ComprehensionPreview
              ind={ind}
              currentdata={el}
              data={data}
              setData={setData}
              setShowImage={setShowImage}
              onOpen={onOpen}
            />
          ) : null}
        </div>
      ))}

      {data.title ? (
        <footer className="flex justify-center gap-5 w-full">
          <button
          disabled={Loading}
            onClick={handleSubmit}
            className="bg-green-700 hover:bg-green-600 py-1 px-3 text-white font-samibold text-[25px] rounded-lg w-1/4"
          >
           {Loading?"Loading...": "Save Response"}
          </button>
        </footer>
      ) : null}

      {/* modal for image and form submit */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton bg={"white"} />
          <ModalBody padding={"20px"}>
            <img src={showImage} alt="" />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={messageIsOpen} onClose={messageOnClose}>
        <ModalOverlay />
        <ModalContent height={"400px"}>
          <ModalCloseButton />
          <ModalBody
            padding={"40px 0px"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"end"}
          >
            <h3 className="font-bold text-center text-[25px] my-3">
              Form Submitted Successfully
            </h3>
            <div className="flex gap-10">
              <button
                className="py-1 px-3 bg-blue-500 text-white rounded-lg text-[25px]"
                onClick={() => Navigate("/")}
              >
                Home
              </button>
              <button
                className="py-1 px-3 bg-blue-500 text-white rounded-lg text-[25px]"
                onClick={messageOnClose}
              >
                Close
              </button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Preview;

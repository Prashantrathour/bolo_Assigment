import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import Categorize from "./Categorize";
import Comprehension from "./Comprehension";
import Cloze from "./Cloze";
import { FaCopy, FaPlusCircle } from "react-icons/fa";

function QuestionCard({ data, ind, question, setQuestions }) {
  function handleDelete() {
    if (question.length == 1) {
      return;
    }
    setQuestions((prev) => prev.filter((el, I) => I != ind));
  }
  function handleadd() {
   
    setQuestions((prev) => [
      ...prev,
      {
        type: "Categorize",
        question: "",
        image: "",
        categories: [""],
        items: [{ value: "", belong: "" }],
      },
    ])
  }
  function handlecopy() {
  
    setQuestions((prev) => [
      ...prev,
      {
        type: "Categorize",
        question: "",
        image: "",
        categories: [""],
        items: [{ value: "", belong: "" }],
      },
    ])
  }

  function handleTypeChange(type) {
    let newdata = [...question];
    if (type == "Categorize") {
      newdata[ind] = {
        type: "Categorize",
        question: "",
        image: "",
        categories: [""],
        items: [{ value: "", belong: "" }],
      };
    } else if (type == "Cloze") {
      newdata[ind] = { type: "Cloze", image: "", question: "", option: [] };
    } else {
      newdata[ind] = {
        type: "Comprehension",
        passage: "",
        questions: [{ question: "", image: "", option: ["", ""], answer: "" }],
      };
    }
    setQuestions(newdata);
  }

  return (
    <div className="questionCard w-full relative border-2 border-gray-300 border-l-8 border-l-blue-500 p-[20px] my-5 rounded-lg">
     <div className="flex w-full">
      <div className="w-full">
        <div className="flex gap-5 justify-center">
          <select
            id="category"
            className="bg-blue-200 rounded-md py-1 px-3 font-semibold"
            onChange={(e) => handleTypeChange(e.target.value)}
          >
            <option
              className="bg-white"
              selected={data.type == "Categorize" ? true : false}
              value="Categorize"
            >
              Categorize
            </option>
            <option
              className="bg-white"
              selected={data.type == "Cloze" ? true : false}
              value="Cloze"
            >
              Cloze
            </option>
            <option
              className="bg-white"
              selected={data.type == "Comprehension" ? true : false}
              value="Comprehension"
            >
              Comprehension
            </option>
          </select>
        </div>

        {/* rendering question components as per its type */}
        {data.type == "Categorize" ? (
          <Categorize
            data={data}
            ind={ind}
            question={question}
            setQuestions={setQuestions}
          />
        ) : data.type == "Comprehension" ? (
          <Comprehension
            data={data}
            ind={ind}
            question={question}
            setQuestions={setQuestions}
          />
        ) : data.type == "Cloze" ? (
          <Cloze
            data={data}
            ind={ind}
            question={question}
            setQuestions={setQuestions}
          />
        ) : null}
      </div>
      <div className="flex justify-center flex-col gap-2 p-1">
      <button onClick={handleDelete}>
        <MdDeleteOutline size={"25px"} />
      </button>
      <button onClick={handleadd}>
        <FaCopy size={"25px"} />
      </button>
      <button onClick={handlecopy}>
        <FaPlusCircle size={"25px"} />
      </button>

      </div>

     </div>
    </div>
  );
}

export default QuestionCard;

import { Input, Select } from "@chakra-ui/react";
import axios from "axios";
import React, { useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useToast } from '@chakra-ui/react'
import { RxDragHandleHorizontal } from "react-icons/rx";
import { errorAlert, succesAlert } from "./Notification";
function Categorize({ data, ind, question, setQuestions }) {
  const [Loading,setLoading]=useState(false)
  
  const CatDragStart = useRef(0);
  const CatDragEnd = useRef(0);

  const ItemDragStart = useRef(0);
  const ItemDragEnd = useRef(0);

  const toast = useToast()

  function handletitleChange(e) {
  
    let newdata = [...question];
    newdata[ind].question = e.target.value;
    setQuestions(newdata);
  }
  function handleAddCategory(e) {
    console.log(e.target.value)
    if (e.target.value != "") {
      let newdata = [...question];
    
      if (!newdata[ind].categories.includes(e.target.value)) {
        newdata[ind].categories.push(e.target.value);
        setQuestions(newdata);
        e.target.value = "";
      }
    }
  }
  // change the value of categories
  function handleChangeCategory(i, value) {
    let newdata = [...question];
    newdata[ind].categories[i] = value;
    setQuestions(newdata);
  }

  // delete category 
  function handleDeleteCategory(i) {
    let newdata = [...question];
    if (newdata[ind].categories.length == 1) {
      return;
    }
    newdata[ind].categories = newdata[ind].categories.filter((el, I) => I != i);
    setQuestions(newdata);
  }

  // add Element to items
  // if it inculdes categories already then return
  function handleAddItems(e) {
    if (e.target.value != "") {
      let newdata = [...question];

      for (let i = 0; i < newdata[ind].items.length; i++) {
        if (newdata[ind].items[i].value == e.target.value) {
          return;
        }
      }

      newdata[ind].items.push({
        value: e.target.value,
        belong: newdata[ind].categories[0],
      });
      setQuestions(newdata);
      e.target.value = "";
    }
  }

  // changing the values
  function handleChangeItems(i, value) {
    let newdata = [...question];
    newdata[ind].items[i].value = value;
    setQuestions(newdata);
  }
  // add or change category
  function handleChangeItemsCategory(i, value) {
    let newdata = [...question];
    newdata[ind].items[i].belong = value;
    setQuestions(newdata);
  }

  //  delete the items 
  function handleDeleteItems(i) {
    let newdata = [...question];
    if (newdata[ind].items.length == 1) {
      return;
    }
    newdata[ind].items = newdata[ind].items.filter((el, I) => I != i);
    setQuestions(newdata);
  }

  function handleCategoryDrag() {
    let newdata = [...question];
   
    let temp = newdata[ind].categories[CatDragStart.current];
    newdata[ind].categories[CatDragStart.current] =
      newdata[ind].categories[CatDragEnd.current];
    newdata[ind].categories[CatDragEnd.current] = temp;

    setQuestions([...newdata]);
  }

  function handleItemsDrag() {
    let newdata = [...question];
    
    let temp = newdata[ind].items[ItemDragStart.current];
    newdata[ind].items[ItemDragStart.current] =
      newdata[ind].items[ItemDragEnd.current];
    newdata[ind].items[ItemDragEnd.current] = temp;

    setQuestions([...newdata]);
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
      let newdata = [...question];
    newdata[ind].image = res?.data?.url;
    setQuestions(newdata);
      
      succesAlert("Image uploaded successfully");
      setLoading(false);
    } catch (error) {
      console.error(error);
      errorAlert("Image upload failed");
      setLoading(false);
    }
  }

  return (
    <div className="p-1">
      <h5 htmlFor="question" className="font-semibold">
        Question {ind + 1}
      </h5>
      <div className="flex justify-between">
      <input
        type="text"
        className="w-1/2 p-2"
        defaultValue={data.question}
        onChange={handletitleChange}
        placeholder="Enter description for the question"
      />

      <div
        onClick={() => document.getElementById(`${ind}getFile`).click()}
        
        className="text-center p-4 px-4 bg-green-400 hover:bg-green-500 text-white   border-2 border-gray flex flex-col justify-center rounded-xl cursor-pointer"
      >
        {!Loading?<h4 className="font-bold  flex justify-center items-center gap-3">
          <IoCloudUploadOutline  />{" "}
          <span>Image ( Optional )</span>
        </h4>:<h1 className="w-full px-4">Loading.....</h1>}
      
        <input type="file" onChange={uploadImage} id={`${ind}getFile`} style={{ display: "none" }} />
      </div>

      </div>
      <p className="my-3 font-semibold">Categories</p>

      <div>
        {data?.categories.map((el, i) => (
          <div
            draggable
            key={i}
            className="flex gap-3 my-3 items-center"
            onDragStart={(e) => (CatDragStart.current = i)}
            onDragEnter={() => (CatDragEnd.current = i)}
            onDragEnd={handleCategoryDrag}
          >
            <RxDragHandleHorizontal size={"20px"} />
            <Input
              type="text"
              placeholder={`Category ${i+1}`}
              width={"300px"}
              value={el}
              onChange={(e) => handleChangeCategory(i, e.target.value)}
            />
            <button onClick={() => handleDeleteCategory(i)}>
              <b>X</b>
            </button>
          </div>
        ))}
        <Input
          type="text"
          width={"250px"}
          className="ml-[50px] mt-3"
          onBlur={(e) => handleAddCategory(e)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddCategory(e);
            }
          }}
          placeholder="Add Category (optional)"
        />
      </div>

   
      <div className="w-full">
        <h5 className="font-semibold my-3">Items</h5>
        {data?.items.map((el, i) => (
          <div
            draggable
            key={i}
            className="flex justify-between my-3"
            onDragStart={(e) => (ItemDragStart.current = i)}
            onDragEnter={() => (ItemDragEnd.current = i)}
            onDragEnd={handleItemsDrag}
          >
            <div className="flex items-center gap-3">
              <RxDragHandleHorizontal size={"20px"} />
              <Input
                type="text"
                placeholder={`Item ${i+1}`}
                width={"300px"}
                value={el.value}
                onChange={(e) => handleChangeItems(i, e.target.value)}
              />
              <button onClick={() => handleDeleteItems(i)}>
                <b>X</b>
              </button>
            </div>
            <Select
              width={"300px"}
              onChange={(e) => handleChangeItemsCategory(i, e.target.value)}
            >
              {data?.categories.map((e) => (
                <option key={e} value={e} selected={e == el.belong}>
                  {e}
                </option>
              ))}
            </Select>
          </div>
        ))}
        <Input
          type="text"
          width={"250px"}
          className="ml-[50px] mt-3"
          onBlur={(e) => handleAddItems(e)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddItems(e);
            }
          }}
          placeholder="Add items (optional)"
        />
      </div>
    </div>
  );
}

export default Categorize;

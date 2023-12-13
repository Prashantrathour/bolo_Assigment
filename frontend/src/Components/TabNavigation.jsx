import React, { useEffect, useState } from "react";
import AllQuestions from "./AllQuestions";
import CreateForm from "./CreateFormCard";
import { useSearchParams } from "react-router-dom";
const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState("all-questions");
  let [searchParams, setSearchParams] = useSearchParams();
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  function randorContent() {
    switch (activeTab) {
      case "all-questions":
        return <AllQuestions/>;
      case "add-questions":
        return <CreateForm/>;
      case "preview":
        return "PriView Questions";
      default:
        return null;
    }
  }
  useEffect(()=>{
  setSearchParams({page:activeTab})
  },[activeTab])
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        <li className="me-2">
          <a
            href="#"
            onClick={() => handleTabClick("all-questions")}
            className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group ${
              activeTab === "all-questions"
                ? "text-blue-600 border-blue-600"
                : ""
            }`}
          >
            All Questions
          </a>
        </li>
        <li className="me-2">
          <a
            href="#"
            onClick={() => handleTabClick("add-questions")}
            className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group ${
              activeTab === "add-questions"
                ? "text-blue-600 border-blue-600"
                : ""
            }`}
          >
            Add Questions
          </a>
        </li>
        <li className="me-2">
          <a
            href="#"
            onClick={() => handleTabClick("preview")}
            className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group ${
              activeTab === "preview" ? "text-blue-600 border-blue-600" : ""
            }`}
          >
            Preview
          </a>
        </li>
      </ul>

      <div className="tab-content">
       {randorContent()}
      </div>
    </div>
  );
};

export default TabNavigation;

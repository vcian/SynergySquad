import { useState } from "react";
import "../../App.css";
import {
  Button,
  IconButton,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { postChat } from "./chat.service";
import "./chat.page.css";
import ChatTable from "../../Components/ChatTable.component";
import Barchart from "../../Components/BarChart.component";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { deleteLocalStorageKey } from "../../utils/local-storage.service";

const ChatPage = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const chatForm = useFormik({
    initialValues: {
      prompt: "",
    },
    onSubmit: async (values) => {
      setIsLoading(() => true);
      const response = await postChat(values).catch((error) => {
        console.log(error);
        toast({
          status: "error",
          duration: 900,
          colorScheme: "red",
          variant: "solid",
          title: error.message,
        });
      });
      setData(() => {
        console.log(typeof response.data);
        if (typeof response.data === "string") {
          try {
            const json = JSON.parse(response.data);
            return json;
          } catch (error) {
            return response.data;
          }
        } else if (response.data && Array.isArray(response.data)) {
          return response.data;
        } else if (response.data && typeof response.data === "object") {
          return response.data;
        }
        return "Prompt Is Not Proper";
      });
      setIsLoading(() => false);
    },
  });

  return (
    <div className="chatbox-container bg-gray-600">
      <IconButton
        aria-label="Back"
        onClick={() => {
          deleteLocalStorageKey("session_id");
          navigate("/login");
        }}
        className="relative right-[20%] bottom-[40%]"
        colorScheme="facebook"
        icon={<ChevronLeftIcon></ChevronLeftIcon>}
      ></IconButton>
      <div className="chatbox-main">
        <div className="chatbox">
          {data && chatForm.values.prompt.includes("bar chart") ? (
            <Barchart data={data} />
          ) : data && Array.isArray(data) && data.length > 0 ? (
            <ChatTable columns={Object.keys(data[0])} data={data} />
          ) : data ? (
            <div className="text-white text-center">{data}</div>
          ) : (
            <div className="icon-and-text">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="h-12 w-12 text-white self-center mb-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                ></path>
              </svg>
              <p className="text-center text-white">
                Please submit or select a question to get started
              </p>
            </div>
          )}
        </div>
        <div className="textbox-main">
          <textarea
            className="text-white px-[8px] py-[5px]"
            //className="py-2 px-3 rounded-md flex-1 text-white bg-zinc-600 resize-none h-fit max-h"
            placeholder="Ask a question"
            onChange={chatForm.handleChange}
            value={chatForm.values.prompt}
            name="prompt"
            rows="3"
          ></textarea>

          <Button
            onClick={chatForm.handleSubmit}
            colorScheme="red"
            isLoading={isLoading}
            loadingText="Processing"
          >
            Submit
          </Button>
          {/* <button onClick={chatForm.handleSubmit} className="submit-btn">
            Submit
          </button> */}
          <button
            onClick={() => {
              chatForm.values.prompt = "";
              setData(() => null);
            }}
            className="clear-btn"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { convertToRawUrl } from "../../../utils/helpers";

export default function ReadmeInput() {
  const [readmeURL, setReadmeURL] = useState("");
  const [readmePreview, setReadmePreview] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleURLChange = (event) => {
    setReadmeURL(event.target.value);
  };

  const fetchReadme = async (url) => {
    setErrorMessage("");
    const rawUrl = convertToRawUrl(url);
    try {
      const response = await fetch(rawUrl);
      if (!response.ok) throw new Error("Network response was not ok");
      const markdownText = await response.text();
      setReadmePreview(markdownText);
    } catch (error) {
      console.error("Error fetching README:", error);
      setErrorMessage("Failed to fetch README. Please check the URL.");
      setReadmePreview("");
    }
  };

  const handlePaste = async () => {
    const pastedText = await navigator.clipboard.readText();
    setReadmeURL(pastedText);
    fetchReadme(pastedText);
  };

  return (
    <div className="w-full h-full">
      {errorMessage && (
        <div className="flex justify-between gap-x-12 mb-4 opacity-100">
          <p className="text text-red-500 font-bold">{errorMessage}</p>
          <HiOutlineExclamationCircle size={24} color="red" />
        </div>
      )}
      <label htmlFor="readmeURL" className="cursor-pointer">
        <div className="flex justify-center items-center p-5 h-full border-2 border-gray-300">
          <input
            type="text"
            id="readmeURL"
            placeholder="Enter README URL"
            className="border p-2 w-full"
            value={readmeURL}
            onChange={handleURLChange}
            onPaste={handlePaste}
          />
        </div>
      </label>
      <div className="mt-4">
        <div className="markdown-body bg-white! text-black!">
          <ReactMarkdown remarkPlugins={[gfm]}>{readmePreview}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";

import { getRawReadmeUrl } from "../../../utils/helpers";
import { Controller, useFormContext } from "react-hook-form";
import axios from "axios";
import FormInput from "../../form/FormInput";
import ReadmeViewer from "./ReadmeViewer";

export default function ReadmeInput({ name, placeholder, label }) {
  const [readmePreview, setReadmePreview] = useState("");
  const {
    watch,
    setError,
    control,
    formState: { errors },
  } = useFormContext();

  const githubUrl = watch(name);

  useEffect(() => {
    (async () => {
      const containsRepo = githubUrl && githubUrl.includes("github.com");
      if (containsRepo) {
        await fetchReadme();
      }
    })();
  }, [githubUrl]);

  const fetchReadme = async () => {
    try {
      const rawMainBranchUrl = getRawReadmeUrl(githubUrl, "main");
      const mainBranchResponse = await axios.get(rawMainBranchUrl);

      setReadmePreview(mainBranchResponse.data);
      return;
    } catch {
      try {
        const rawMasterBranchUrl = getRawReadmeUrl(githubUrl, "master");
        const rawMasterBranchResponse = await axios.get(rawMasterBranchUrl);
        setReadmePreview(rawMasterBranchResponse.data);
      } catch {
        setError("github", {
          type: "manual",
          message: "Kunde inte hämta README.md",
        });
        setReadmePreview("");
      }
    }
  };

  const translateDefaultErrorMessage = (messageKey) => {
    const message = errors && errors[messageKey] ? errors[messageKey].message : undefined;
    return message === "Required" ? "Fältet får inte vara tomt" : message;
  };

  // const fetchReadme = async (url) => {
  //   setErrorMessage("");
  //   const rawUrl = convertToRawUrl(url);
  //   try {
  //     const response = await fetch(rawUrl);
  //     if (!response.ok) throw new Error("Network response was not ok");
  //     const markdownText = await response.text();
  //     setReadmePreview(markdownText);
  //   } catch (error) {
  //     console.error("Error fetching README:", error);
  //     setErrorMessage("Failed to fetch README. Please check the URL.");
  //     setReadmePreview("");
  //   }
  // };

  // const handlePaste = async () => {
  //   const pastedText = await navigator.clipboard.readText();
  //   setReadmeURL(pastedText);
  //   fetchReadme(pastedText);
  // };

  return (
    <div className="">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormInput
            label={label}
            type="url"
            value={field.value}
            placeholder={placeholder}
            isRequired={true}
            errorMessage={translateDefaultErrorMessage(name)}
            onChange={field.onChange}
          />
        )}
      />
      <div className="my-10">
        <ReadmeViewer readmePreview={readmePreview} />
      </div>
    </div>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { getRawReadmeUrl } from "../../../utils/helpers";

export default function ReadmeViewer({ githubUrl, setError }) {
  const [readmePreview, setReadmePreview] = useState("");

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
      const rawMainBranchUrl = getRawReadmeUrl(githubUrl.trim(), "main");
      const mainBranchResponse = await axios.get(rawMainBranchUrl);

      setReadmePreview(mainBranchResponse.data);
      return;
    } catch {
      try {
        const rawMasterBranchUrl = getRawReadmeUrl(githubUrl.trim(), "master");
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

  return (
    <div className="mt-4">
      <div className="markdown-body bg-white! text-black!">
        <ReactMarkdown remarkPlugins={[gfm]}>{readmePreview}</ReactMarkdown>
      </div>
    </div>
  );
}

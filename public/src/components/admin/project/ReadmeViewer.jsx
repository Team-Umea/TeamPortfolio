import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

export default function ReadmeViewer({ readmePreview }) {
  return (
    <div className="mt-4">
      <div className="markdown-body bg-white! text-black!">
        <ReactMarkdown remarkPlugins={[gfm]}>{readmePreview}</ReactMarkdown>
      </div>
    </div>
  );
}

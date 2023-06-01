// import upload, { checkImage } from "@/utils/upload";
import React, { useEffect, useRef, useCallback } from "react";
//@ts-ignore
//import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import dynamic from "next/dynamic";
//import ReactQuill from "react-quill";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const TextAreaHtml = ({ setBody, value,
    //  setLoading, image, title
      }) => {
  let container = [
    //[{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown

    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ script: "sub" }, { script: "super" }], // superscript/subscript

    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction
    [{ align: [] }],

    // ["clean", "link", "image", "video"],
  ];
//   if (image) {
//     container.push(["clean", "link", "image", "video"]);
//   }
  const quillRef = useRef(null);

  const modules = { toolbar: { container } };

  // Custom image
  //   const handleChangeImage = useCallback(() => {
  //     let input;
  //     if (typeof window !== "undefined") {
  //       input = document?.createElement("input");
  //     }
  //     input.type = "file";
  //     input.accept = "image/*";
  //     input.click();

  //     input.onchange = async () => {
  //       const files = input.files;

  //       if (!files) return toast.error("File does not exist.");

  //       const file = files[0];
  //       const check = checkImage(file);

  //       setLoading(true);
  //       const photo = await upload(file);

  //       const quill = quillRef.current;
  //       const range = quill?.getEditor().getSelection()?.index;
  //       if (range !== undefined) {
  //         quill?.getEditor().insertEmbed(range, "image", `${photo}`);
  //       }

  //       setLoading(false);
  //     };
  //   }, []);

  //   useEffect(() => {
  //     const quill = quillRef.current;
  //     if (!quill) return;

  //     let toolbar = quill.getEditor().getModule("toolbar");
  //     toolbar.addHandler("image", handleChangeImage);
  //   }, [handleChangeImage]);

  return (
    // <label className="block   bg-pruple p-1 rounded-xl">
    //   <span className="block text-center font-bold py-2 ">{title}</span>
      <ReactQuill
        theme="snow"
        modules={modules}
        placeholder="Write somethings..."
        onChange={(e) => setBody(e)}
        // ref={quillRef}
        value={value}
      />
    // </label>
  );
};

export default TextAreaHtml;

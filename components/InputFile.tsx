import { useState } from "react";
// import imageCompression from "browser-image-compression"
// const options = {
//     maxSizeMB: 0.1,
//     maxWidthOrHeight: 100,
//     useWebWorker: true,
// }
const InputFile = (Props) => {
  const uploadToClient = async (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      Props.setFile(i);
      
      Props.setUploadedImage(URL.createObjectURL(i));
      console.log(i)
      // setCreateObjectURL(URL.createObjectURL(i))
      // const compressedFile = await imageCompression(i, options)
      // Props.setUploadedImage(new File([compressedFile], compressedFile.name))
    }
  };
  return (
    <>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          {Props.image ? 
                            <img
                                className="w-full h-full object-cover"
                                src={
                                    Props.image 
                                }
                                alt={Props.image}
                            /> :       <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              aria-hidden="true"
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>}
          <input id="dropzone-file" type="file" className="hidden"  accept="image/*"
                                onChange={uploadToClient} />
        </label>
      </div>
      {/* <div className="flex flex-col justify-center items-center py-8 border-2 border-gray-300 border-dashed bg-gray-50 rounded-2xl">
                <div className="relative flex items-center justify-center h-32 w-40 md:w-72 mb-6">
                    <div
                        className={
                            "absolute z-0 rounded-md h-32 w-40 md:w-72 top-0 left-0 " +
                            (Props.image
                                ? "ring-2 ring-green-600 border-4"
                                : "ring-4 ring-purple-600 animate-pulse")
                        }
                    >
                        <span></span>
                    </div>
                    <div className="z-10">
                        <label className="flex">
                            <input
                                type="file"
                                style={{ display: "none" }}
                                accept="image/*"
                                onChange={uploadToClient}
                            />
                            {Props.image ? 
                            <img
                                className="mx-auto h-32 w-40 md:w-72 rounded-md shadow object-cover"
                                src={
                                    Props.image
                                }
                                alt={Props.image}
                            /> :        
                            //  <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="mx-auto h-12 w-12 text-pruple ">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>
                            }
                        </label>
                    </div>
                </div>
                <div className="text-sm inline-flex space-x-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <p>Upload your file</p>
                </div>
            </div> */}
    </>
  );
};
export default InputFile;

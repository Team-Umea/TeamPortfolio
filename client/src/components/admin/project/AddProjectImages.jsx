import React, { useState } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { GoPlus } from "react-icons/go";
import ImageInput from "../../form/ImageInput";
import DefaultBtn from "../../btn/DefaultBtn";
import { useFormContext } from "react-hook-form";

export default function AddProjectImages({ project }) {
  const images = project.images;
  const [numImages, setNumImages] = useState(images ? images.length : 1);
  const { setValue } = useFormContext();

  const addImageInput = () => {
    if (numImages >= 3) return;

    setNumImages((prev) => prev + 1);
  };

  const removeImageInput = () => {
    if (numImages <= 0) return;

    setValue(`${images}.${numImages - 1}`, "");
    setNumImages((prev) => prev - 1);
  };

  return (
    <div className="mt-8 w-full">
      <div className="flex justify-between">
        <p className="text-lg text-slate-600 font-medium">Ladda up bilder av projektet</p>
        <div className="flex gap-x-2">
          <DefaultBtn onClick={removeImageInput}>
            <AiOutlineMinus size={24} />
          </DefaultBtn>
          <DefaultBtn onClick={addImageInput}>
            <GoPlus size={24} />
          </DefaultBtn>
        </div>
      </div>
      <ul className="flex flex-col gap-y-8">
        {Array.from({ length: numImages }, (_, index) => {
          return (
            <ImageInput
              key={index}
              name={`images.${index}`}
              imagePlaceHolder={images && images[index] ? images[index] : null}
            />
          );
        })}
      </ul>
    </div>
  );
}

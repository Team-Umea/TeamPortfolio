import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { GoPlus } from "react-icons/go";

export default function ImageInput({ name, imagePlaceHolder }) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [imagePreview, setImagePreview] = useState(imagePlaceHolder);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue(name, file);
    }
  };

  const errorMessage = errors?.[name]?.message;

  return (
    <div className="w-full h-full">
      <div
        className={`flex justify-between gap-x-12 mb-4 ${
          errorMessage ? "opacity-100" : "opacity-0"
        }`}>
        <p className="text text-red-500 font-bold">{errorMessage}</p>
        <HiOutlineExclamationCircle size={24} color="red" />
      </div>
      <label htmlFor="profileImage" className="cursor-pointer">
        <div className="flex justify-center items-center p-5 h-full border-2 border-gray-300">
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="flex">
              <GoPlus size={24} />
              <p>Lägg till en bild</p>
            </div>
          )}
        </div>
      </label>
      <input
        type="file"
        id="profileImage"
        accept="image/webp"
        className="hidden"
        {...register(name)}
        onChange={handleImageChange}
      />
    </div>
  );
}

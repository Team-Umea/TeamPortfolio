import { GoPlus } from "react-icons/go";
import { useFormContext } from "react-hook-form";
import AddTechInput from "./AddTechInput";
import PrimaryBtn from "../../btn/PrimaryBtn";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useEffect } from "react";

export default function AddTech() {
  const {
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const techStack = watch("techStack");

  useEffect(() => {
    const filledFields = techStack.filter((field) => field);
    const isValid = filledFields.length >= 3;
    const hasAddedFields = techStack.length >= 3;

    if (isValid) {
      clearErrors("techStack");
    }

    if (!hasAddedFields && techStack.length > 0) {
      setError("techStack", {
        type: "manual",
        message: "Minst 3 av teknologierna måste vara ifyllda",
      });
    }
  }, [techStack.join("")]);

  const addEmptyTech = () => {
    if (techStack.length >= 10) return;

    if (techStack.length >= 2) {
      clearErrors("techStack");
    }

    const updatedTechStack = [...techStack, ""];
    setValue("techStack", updatedTechStack);
  };

  const deleteTech = (index) => {
    if (techStack.length <= 3) {
      setError("techStack", {
        type: "manual",
        message: "Minst 3 teknologier krävs",
      });
      return;
    }

    const filteredTechStack = techStack.filter((_, ind) => ind !== index);
    setValue("techStack", filteredTechStack);
  };

  const errorMessage =
    errors?.techStack?.techStack?.message ||
    errors?.techStack?.message ||
    errors?.techStack?.root?.message;

  return (
    <div className="flex flex-col gap-y-6 w-full">
      <div
        className={`flex justify-between gap-x-12 ${errorMessage ? "opacity-100" : "opacity-0"}`}>
        <p className="text text-red-500 font-bold">{errorMessage}</p>
        <HiOutlineExclamationCircle size={24} color="red" />
      </div>
      <div
        className={`flex justify-between items-center p-4 border-2 rounded-md ${
          errorMessage ? "border-red-500" : "border-transparent"
        }`}>
        <label className="text-lg text-slate-600 font-medium">Visa projektets tech-stack</label>
        <div className="w-fit">
          <PrimaryBtn onClick={addEmptyTech}>
            <GoPlus size={24} />
            <span>Lägg till teknologi</span>
          </PrimaryBtn>
        </div>
      </div>
      <ul className="flex flex-col gap-y-4">
        {techStack.map((_, index) => {
          const name = `techStack.${index}`;
          return (
            <AddTechInput
              key={index}
              name={name}
              number={index + 1}
              onDelete={() => deleteTech(index)}
            />
          );
        })}
      </ul>
    </div>
  );
}

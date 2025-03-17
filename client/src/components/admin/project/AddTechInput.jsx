import { IoMdClose } from "react-icons/io";
import DefaultBtn from "../../btn/DefaultBtn";
import FormInputBox from "../../form/FormInputBox";
import { Controller, useFormState } from "react-hook-form";

export default function AddTechInput({ name, number, onDelete }) {
  const { control } = useFormState();

  return (
    <div className="flex items-start w-full">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormInputBox
            label={`Teknologi ${number}`}
            value={field.value}
            placeholder="Ange teknologi namn"
            onChange={field.onChange}
          />
        )}
      />
      <div className="mt-6">
        <DefaultBtn onClick={onDelete}>
          <IoMdClose size={24} />
        </DefaultBtn>
      </div>
    </div>
  );
}

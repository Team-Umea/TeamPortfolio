import { Controller, useFormContext } from "react-hook-form";
import FormInput from "../../form/FormInput";
import ReadmeViewer from "./ReadmeViewer";

export default function ReadmeInput({ name, placeholder, label }) {
  const {
    watch,
    setError,
    control,
    formState: { errors },
  } = useFormContext();

  const githubUrl = watch(name);

  const translateDefaultErrorMessage = (messageKey) => {
    const message = errors && errors[messageKey] ? errors[messageKey].message : undefined;
    return message === "Required" ? "Fältet får inte vara tomt" : message;
  };

  return (
    <div className="w-full">
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
        <ReadmeViewer githubUrl={githubUrl} setError={setError} />
      </div>
    </div>
  );
}

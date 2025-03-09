import { Controller, useFormContext } from "react-hook-form";
import FormInput from "../../form/FormInput";

export default function SecurityQuestionForm({ securityQuestion }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-y-8 w-full">
      <h2 className="text-2xl text-gray-600 font-semibold">Verify Authenticity!</h2>
      <p className="text-gray-700 font-semibold">{securityQuestion}</p>
      <Controller
        name="securityQuestion.securityQuestion"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormInput
            label="Security question"
            value={field.value}
            errorMessage={errors?.securityQuestion?.securityQuestion?.message}
            onChange={field.onChange}
          />
        )}
      />
    </div>
  );
}

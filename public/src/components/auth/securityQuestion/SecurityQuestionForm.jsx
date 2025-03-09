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
      <div className="space-y-2">
        <p className="text-red-700 font-semibold">
          Answer your security question as the verification code provided is incorrect
        </p>
        <p className="text-gray-700 font-semibold">{securityQuestion}</p>
      </div>
      <Controller
        name="questionAnswer.questionAnswer"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormInput
            label="Security question"
            value={field.value}
            errorMessage={errors?.questionAnswer?.questionAnswer?.message}
            autoFocus={true}
            onChange={field.onChange}
          />
        )}
      />
    </div>
  );
}

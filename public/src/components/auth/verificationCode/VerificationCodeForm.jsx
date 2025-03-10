import { Controller, useFormContext } from "react-hook-form";
import FormInput from "../../form/FormInput";

export default function VerificationCodeForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col my-8 w-full">
      <Controller
        name="verificationCode.verificationCode"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormInput
            label="Verifieringskod"
            value={field.value}
            errorMessage={errors?.verificationCode?.verificationCode?.message}
            autoFocus={true}
            onChange={field.onChange}
          />
        )}
      />
    </div>
  );
}

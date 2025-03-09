import { Controller, useFormContext } from "react-hook-form";
import FormInput from "../../form/FormInput";

export default function VerificationCodeForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-y-8 w-full">
      <h2 className="text-2xl text-gray-600 font-semibold">Verify Access!</h2>
      <Controller
        name="verificationCode.verificationCode"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormInput
            label="Verification Code"
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

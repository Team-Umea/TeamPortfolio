import { Controller, useFormContext } from "react-hook-form";
import FormInput from "../../form/FormInput";

export default function PasswordForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-y-8 w-full">
      <h2 className="text-2xl text-gray-600 font-semibold">Final Step!</h2>
      <Controller
        name="password.password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormInput
            label="Password"
            value={field.value}
            errorMessage={errors?.password?.password?.message}
            autoFocus={true}
            onChange={field.onChange}
          />
        )}
      />
    </div>
  );
}

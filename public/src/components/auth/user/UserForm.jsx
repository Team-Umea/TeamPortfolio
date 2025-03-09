import { Controller, useFormContext } from "react-hook-form";
import FormInput from "../../form/FormInput";

export default function UserForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-y-8 w-full">
      <h2 className="text-2xl text-gray-600 font-semibold">Access Account!</h2>
      <Controller
        name="user.user"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormInput
            label="Username or email"
            value={field.value}
            errorMessage={errors?.user?.user?.message}
            autoFocus={true}
            onChange={field.onChange}
          />
        )}
      />
    </div>
  );
}

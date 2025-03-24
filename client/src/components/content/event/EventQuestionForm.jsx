import { Controller, FormProvider, useForm } from "react-hook-form";
import PrimaryBtn from "../../btn/PrimaryBtn";
import { PuffLoader } from "react-spinners";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useScrollTo from "../../../hooks/useScrollTo";
import FormInput from "../../form/FormInput";
import Toast from "../../common/Toast";
import { useParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventQuestionSchema } from "../../../validations/content/eventQuestion";
import { addEventQuestion } from "../../../api/admin/event";

export default function EventQuestionForm() {
  const { eventid: eventID } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { scrollToTopSmooth } = useScrollTo();

  const formMethods = useForm({
    resolver: zodResolver(eventQuestionSchema),
  });

  const {
    control,
    watch,
    clearErrors,
    setError,
    reset,
    formState: { errors },
    handleSubmit,
  } = formMethods;

  useEffect(() => {
    const subscription = watch(() => {
      clearErrors("root");
    });

    return () => subscription.unsubscribe();
  }, [clearErrors]);

  const eventQuestionMutation = useMutation({
    mutationFn: addEventQuestion,
    onMutate: () => setIsLoading(true),
    onSuccess: (data) => {
      setToastMessage(data.message);
      reset();
    },
    onError: (error) => {
      setError("root", {
        type: "manual",
        message: error.message,
      });
      setToastMessage(error.message);
    },
    onSettled: () => setIsLoading(false),
  });

  const onSubmit = (data) => {
    const eventQuestionData = { ...data, eventID };
    eventQuestionMutation.mutate(eventQuestionData);
  };

  const onError = () => {
    scrollToTopSmooth();
  };

  const translateDefaultErrorMessage = (messageKey) => {
    const message =
      errors && errors[messageKey] ? errors[messageKey].message : undefined;
    return message === "Required" ? "Fältet får inte vara tomt" : message;
  };

  const hasRootError = errors?.root?.message;

  return (
    <>
      <FormProvider {...formMethods}>
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="flex flex-col items-center gap-y-32 m-auto w-[90%] max-w-[900px] "
        >
          <Controller
            name="question"
            control={control}
            render={({ field }) => (
              <FormInput
                label="Fråga eller önskemål"
                type="textarea"
                value={field.value}
                minLength={20}
                maxLength={400}
                placeholder="Ange eventuella frågor eller önskemål inför evenemanget"
                isRequired={true}
                errorMessage={translateDefaultErrorMessage("question")}
                onChange={field.onChange}
              />
            )}
          />
          <div className="w-fit m-auto mt-8">
            <PrimaryBtn type="submit">
              <span className="flex justify-center items-center gap-x-2 mx-4">
                <span className="text-lg">Skicka</span>
                {isLoading && <PuffLoader size={28} color="white" />}
              </span>
            </PrimaryBtn>
          </div>
        </form>
      </FormProvider>
      <Toast
        message={toastMessage}
        show={!!toastMessage}
        isError={hasRootError}
        visibilityDuration={5}
        onClose={() => setToastMessage("")}
      />
    </>
  );
}

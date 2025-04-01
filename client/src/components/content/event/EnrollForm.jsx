import { Controller, FormProvider, useForm } from "react-hook-form";
import PrimaryBtn from "../../btn/PrimaryBtn";
import { PuffLoader } from "react-spinners";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useScrollTo from "../../../hooks/useScrollTo";
import { enrollUser } from "../../../api/admin/event";
import FormInput from "../../form/FormInput";
import Toast from "../../common/Toast";
import { Navigate, useParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { enrollmentSchema } from "../../../validations/content/enroll";
import { useNavigate } from "react-router";
export default function EnrollForm() {
  const navigate = useNavigate();
  const { eventid: eventID } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { scrollToTopSmooth } = useScrollTo();

  const formMethods = useForm({
    resolver: zodResolver(enrollmentSchema),
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

  const enrollMutation = useMutation({
    mutationFn: enrollUser,
    onMutate: () => setIsLoading(true),
    onSuccess: (data) => {
      setToastMessage(data.message);
      reset();
      navigate("/events");
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
    const enrollmentData = { ...data, eventID };
    enrollMutation.mutate(enrollmentData);
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
          className="flex flex-col items-center gap-y-32 m-auto w-[90%] max-w-[900px]"
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <FormInput
                label="Namn"
                value={field.value}
                placeholder="Ange ditt namn"
                isRequired={true}
                errorMessage={translateDefaultErrorMessage("name")}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="org"
            control={control}
            render={({ field }) => (
              <FormInput
                label="Organisation eller företag"
                value={field.value}
                placeholder="Ange organisation eller företag"
                isRequired={true}
                errorMessage={translateDefaultErrorMessage("org")}
                onChange={field.onChange}
              />
            )}
          />
          <div className="w-fit m-auto mt-8">
            <PrimaryBtn type="submit">
              <span className="flex justify-center items-center gap-x-2 mx-4">
                <span className="text-lg">Slutför</span>
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

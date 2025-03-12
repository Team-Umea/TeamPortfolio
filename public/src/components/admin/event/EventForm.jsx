import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { profileSchema } from "../../../validations/admin/profile";
import { useMutation } from "@tanstack/react-query";
import Toast from "../../common/Toast";
import useScrollTo from "../../../hooks/useScrollTo";
import FormInput from "../../form/FormInput";
import { addEvent } from "../../../api/admin/event";
import PrimaryBtn from "../../btn/PrimaryBtn";
import { PuffLoader } from "react-spinners";
import { FiPlus } from "react-icons/fi";
import { eventSchema } from "../../../validations/admin/event";
import { getTodayString } from "../../../utils/helpers";
import ImageInput from "../../form/ImageInput";

export default function EventForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { scrollToTopSmooth } = useScrollTo();

  const formMethods = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      date: getTodayString(),
    },
  });

  const {
    // setError,
    clearErrors,
    watch,
    control,
    formState: { errors },
    handleSubmit,
  } = formMethods;

  useEffect(() => {
    const subscription = watch(() => {
      clearErrors("root");
    });

    return () => subscription.unsubscribe();
  }, [clearErrors]);

  const addEventMuation = useMutation({
    mutationFn: addEvent,
    onMutate: () => setIsLoading(true),
    onSuccess: () => {
      setToastMessage("Evenemang har lagts till");
    },
    onError: (error) => {
      setToastMessage(error.message);
    },
    onSettled: () => setIsLoading(false),
  });

  const onSubmit = (data) => {
    console.log("Event data: ", data);
    // addEventMuation(data);
  };

  const onError = (err) => {
    scrollToTopSmooth();
  };

  const translateDefaultErrorMessage = (messageKey) => {
    const message = errors && errors[messageKey] ? errors[messageKey].message : undefined;
    return message === "Required" ? "Fältet får inte vara tomt" : message;
  };

  const hasRootError = errors?.root?.message;

  return (
    <>
      <FormProvider {...formMethods}>
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="flex flex-col items-center gap-y-6 m-auto w-[90%]">
          <Controller
            name="event"
            control={control}
            render={({ field }) => (
              <FormInput
                label="Namn för evenemang"
                value={field.value}
                placeholder="Ange evenemangnamn"
                isRequired={true}
                autoFocus={true}
                errorMessage={translateDefaultErrorMessage("event")}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <FormInput
                label="Datum"
                type="date"
                min={getTodayString()}
                value={field.value}
                placeholder="Ange när evenemanget ska arrangeras"
                isRequired={true}
                errorMessage={translateDefaultErrorMessage("date")}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <FormInput
                label="Beskrivning av evenemang"
                type="textarea"
                value={field.value}
                minLength={50}
                maxLength={500}
                placeholder="Ange en beskrivning evenemanget"
                isRequired={true}
                errorMessage={translateDefaultErrorMessage("description")}
                onChange={field.onChange}
              />
            )}
          />
          <div className="mx-auto mb-12 w-full px-6 h-[600px]">
            <ImageInput name="image" />
          </div>

          <div className="w-fit m-auto mt-8">
            <PrimaryBtn type="submit">
              <span className="flex justify-center items-center gap-x-2 mx-4">
                <span className="text-lg">Lägg till</span>
                {isLoading ? <PuffLoader size={28} color="white" /> : <FiPlus size={28} />}
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

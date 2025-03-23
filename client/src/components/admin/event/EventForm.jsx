import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "../../common/Toast";
import useScrollTo from "../../../hooks/useScrollTo";
import FormInput from "../../form/FormInput";
import { addEvent, editEvent } from "../../../api/admin/event";
import PrimaryBtn from "../../btn/PrimaryBtn";
import { PuffLoader } from "react-spinners";
import { FiPlus } from "react-icons/fi";
import { eventSchema } from "../../../validations/admin/event";
import { getTodayString } from "../../../utils/helpers";
import ImageInput from "../../form/ImageInput";
import { useNavigate } from "react-router";

export default function EventForm({ event }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { scrollToTopSmooth } = useScrollTo();

  const formMethods = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      ...(event ? event : { date: getTodayString() }),
    },
  });

  const {
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
      queryClient.invalidateQueries(["events"]);
      navigate("/admin/events");
    },
    onError: (error) => {
      setToastMessage(error.message);
    },
    onSettled: () => setIsLoading(false),
  });

  const editEventMuation = useMutation({
    mutationFn: editEvent,
    onMutate: () => setIsLoading(true),
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
      navigate("/admin/events");
    },
    onError: (error) => {
      setToastMessage(error.message);
    },
    onSettled: () => setIsLoading(false),
  });

  const onSubmit = (data) => {
    if (event) {
      editEventMuation.mutate(data);
    } else {
      addEventMuation.mutate(data);
    }
  };

  const onError = () => {
    scrollToTopSmooth();
  };

  const translateDefaultErrorMessage = (messageKey) => {
    const message = errors && errors[messageKey] ? errors[messageKey].message : undefined;
    return message === "Required" ? "Fältet får inte vara tomt" : message;
  };

  const eventImage = event?.image;
  const hasRootError = errors?.root?.message;

  return (
    <>
      <FormProvider {...formMethods}>
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="flex flex-col items-center gap-y-6 m-auto w-[90%] max-w-[900px]">
          <Controller
            name="event"
            control={control}
            render={({ field }) => (
              <FormInput
                label="Namn på evenemang"
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
            name="place"
            control={control}
            render={({ field }) => (
              <FormInput
                label="Plats"
                value={field.value}
                placeholder="Ange var evenemanget ska arrangeras"
                isRequired={true}
                errorMessage={translateDefaultErrorMessage("place")}
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
            name="time"
            control={control}
            render={({ field }) => (
              <FormInput
                label="Tid"
                type="time"
                value={field.value}
                placeholder="Ange tid när evenemanget ska arrangeras"
                errorMessage={translateDefaultErrorMessage("time")}
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
                minLength={100}
                maxLength={2000}
                placeholder="Ange en beskrivning evenemanget"
                isRequired={true}
                errorMessage={translateDefaultErrorMessage("description")}
                onChange={field.onChange}
              />
            )}
          />
          <div className="mx-auto mb-12 w-full px-6 h-[600px]">
            <ImageInput name="image" imagePlaceHolder={eventImage} />
          </div>

          <div className="w-fit m-auto mt-8">
            <PrimaryBtn type="submit">
              <span className="flex justify-center items-center gap-x-2 mx-4">
                <span className="text-lg">{event ? "Uppdatera evenemang" : "Lägg till"}</span>
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

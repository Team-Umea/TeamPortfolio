import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, FormProvider, set, useForm } from "react-hook-form";
import { profileSchema } from "../../../validations/admin/profile";
import useAuthStore from "../../../hooks/useAuthStore";
import FormInput from "../../form/FormInput";
import PrimaryBtn from "../../btn/PrimaryBtn";
import { FiPlus } from "react-icons/fi";
import { useMutation } from "@tanstack/react-query";
import { createProfile, editProfile } from "../../../api/admin";
import { PuffLoader } from "react-spinners";
import Toast from "../../common/Toast";
import useProfileStore from "../../../hooks/useProfileStore";

export default function ProfileForm() {
  const { username, email } = useAuthStore();
  const { profile, updateProfile } = useProfileStore();
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const formMethods = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      ...(profile ? profile : { name: username, email: email }),
    },
  });
  const {
    control,
    setError,
    clearErrors,
    watch,
    formState: { errors },
    handleSubmit,
  } = formMethods;

  useEffect(() => {
    const subscription = watch(() => {
      clearErrors("root");
    });

    return () => subscription.unsubscribe();
  }, [clearErrors]);

  const createProfileMuation = useMutation({
    mutationFn: createProfile,
    onMutate: () => setIsLoading(true),
    onSuccess: () => {
      setToastMessage("Profil har skapats");
    },
    onError: (error) => {
      setToastMessage(error.message);
      setRootError(error.message);
    },
    onSettled: () => setIsLoading(false),
  });

  const editProfileMuation = useMutation({
    mutationFn: editProfile,
    onMutate: () => setIsLoading(true),
    onSuccess: (updatedProfile) => {
      setToastMessage("Profil har uppdaterats");
      updateProfile(updatedProfile);
    },
    onError: (error) => {
      setToastMessage(error.message);
      setRootError(error.message);
    },
    onSettled: () => setIsLoading(false),
  });

  const onSubmit = (data) => {
    if (profile) {
      editProfileMuation.mutate(data);
    } else {
      createProfileMuation.mutate(data);
    }
  };

  const setRootError = (message) => {
    setError("root", {
      type: "manual",
      message: message,
    });
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
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-y-6 m-auto w-[90%] max-w-[800px]">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <FormInput
                label="Namn"
                value={field.value}
                placeholder="Ange namn"
                isRequired={true}
                errorMessage={translateDefaultErrorMessage("name")}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <FormInput
                label="Mejl"
                type="email"
                value={field.value}
                placeholder="Ange email"
                isRequired={true}
                errorMessage={translateDefaultErrorMessage("email")}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <FormInput
                label="Ålder"
                type="number"
                min={1}
                max={100}
                value={field.value}
                placeholder="Ange ålder"
                isRequired={true}
                errorMessage={translateDefaultErrorMessage("age")}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <FormInput
                label="Telefonnummer"
                value={field.value}
                placeholder="Ange telefonnummer"
                isRequired={true}
                errorMessage={translateDefaultErrorMessage("phone")}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <FormInput
                label="Titel"
                value={field.value}
                placeholder="Ange titel"
                isRequired={true}
                errorMessage={translateDefaultErrorMessage("title")}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="linkedin"
            control={control}
            render={({ field }) => (
              <FormInput
                label="Linkedin"
                type="url"
                value={field.value}
                placeholder="Ange linkedin url"
                isRequired={true}
                errorMessage={translateDefaultErrorMessage("linkedin")}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="github"
            control={control}
            render={({ field }) => (
              <FormInput
                label="Github"
                type="url"
                value={field.value}
                placeholder="Ange github url"
                isRequired={true}
                errorMessage={translateDefaultErrorMessage("github")}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="portfolio"
            control={control}
            render={({ field }) => (
              <FormInput
                label="Portfölj"
                type="url"
                value={field.value}
                placeholder="Valfritt ange portfölj url"
                errorMessage={translateDefaultErrorMessage("portfolio")}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="bio"
            control={control}
            render={({ field }) => (
              <FormInput
                label="Självbiografi"
                type="textarea"
                value={field.value}
                minLength={50}
                maxLength={500}
                placeholder="Ange en beskrivning av dig själv"
                isRequired={true}
                errorMessage={translateDefaultErrorMessage("bio")}
                onChange={field.onChange}
              />
            )}
          />
          <div className="w-fit m-auto mt-8">
            <PrimaryBtn type="submit">
              <span className="flex justify-center items-center gap-x-2 mx-4">
                <span className="text-lg">{profile ? "Uppdatera profil" : "Skapa profil"}</span>
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

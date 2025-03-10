import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { profileSchema } from "../../../validations/admin/profile";
import useAuthStore from "../../../hooks/useAuthStore";
import FormInput from "../../form/FormInput";
import PrimaryBtn from "../../btn/PrimaryBtn";
import { FiPlus } from "react-icons/fi";
import { useMutation } from "@tanstack/react-query";
import { createProfile } from "../../../api/admin";
import { PuffLoader } from "react-spinners";

export default function ProfileForm() {
  const { username, email } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const formMethods = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: username,
      email: email,
      title: "Student",
    },
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = formMethods;

  const createProfileMuation = useMutation({
    mutationFn: createProfile,
    onMutate: () => setIsLoading(true),
    onSuccess: (data) => {
      console.log("Profile created successfully", data);
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: () => setIsLoading(false),
  });

  const onSubmit = (data) => {
    createProfileMuation.mutate(data);
  };

  const translateDefaultErrorMessage = (messageKey) => {
    const message = errors && errors[messageKey] ? errors[messageKey].message : undefined;
    return message === "Required" ? "Fältet får inte vara tomt" : message;
  };

  return (
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
            <span className="text-lg">Skapa profil</span>
            {isLoading ? <PuffLoader size={28} color="white" /> : <FiPlus size={28} />}
          </PrimaryBtn>
        </div>
      </form>
    </FormProvider>
  );
}

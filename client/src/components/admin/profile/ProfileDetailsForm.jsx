import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import FormInput from "../../form/FormInput";
import PrimaryBtn from "../../btn/PrimaryBtn";
import useProfileStore from "../../../hooks/useProfileStore";
import { PuffLoader } from "react-spinners";
import { FiPlus } from "react-icons/fi";

export default function ProfileDetailsForm({ isLoading }) {
  const { profile } = useProfileStore();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const translateDefaultErrorMessage = (messageKey) => {
    const message = errors && errors[messageKey] ? errors[messageKey].message : undefined;
    return message === "Required" ? "Fältet får inte vara tomt" : message;
  };

  return (
    <div className="flex flex-col gap-y-6 w-full">
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
    </div>
  );
}

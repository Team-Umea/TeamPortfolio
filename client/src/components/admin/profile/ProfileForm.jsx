import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { profileSchema } from "../../../validations/admin/profile";
import useAuthStore from "../../../hooks/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { createProfile, editProfile } from "../../../api/admin/profile";
import Toast from "../../common/Toast";
import useProfileStore from "../../../hooks/useProfileStore";
import ProfileDetailsForm from "./ProfileDetailsForm";
import ImageInput from "../../form/ImageInput";
import useScrollTo from "../../../hooks/useScrollTo";

export default function ProfileForm() {
  const { username, email } = useAuthStore();
  const { profile, updateProfile } = useProfileStore();
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { scrollToTopSmooth } = useScrollTo();

  const formMethods = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      ...(profile ? profile : { name: username, email: email, title: "Student" }),
    },
  });

  const {
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
    onSuccess: (createdProfile) => {
      updateProfile(createdProfile);
      setToastMessage("Profil har skapats");
    },
    onError: (error) => {
      setToastMessage(error.message);
      setRootError(error.message);
      scrollToTopSmooth();
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

  const onError = () => {
    scrollToTopSmooth();
  };

  const setRootError = (message) => {
    setError("root", {
      type: "manual",
      message: message,
    });
  };

  const hasRootError = errors?.root?.message;
  const profileImage = profile?.profileImage;

  return (
    <>
      <FormProvider {...formMethods}>
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="flex flex-col items-center gap-y-6 m-auto w-[90%]">
          <div className="flex flex-col-reverse md:flex-row justify-between gap-x-24 w-full">
            <ProfileDetailsForm isLoading={isLoading} />
            <div className="mx-auto w-full md:w-[600px] max-w-[400px] h-[500px]">
              <ImageInput name="profileImage" imagePlaceHolder={profileImage} />
            </div>
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

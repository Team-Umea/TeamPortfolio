import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "../../common/Toast";
import useScrollTo from "../../../hooks/useScrollTo";
import PrimaryBtn from "../../btn/PrimaryBtn";
import { PuffLoader } from "react-spinners";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router";
import AddColleagues from "./AddColleagues";
import { projectSchema } from "../../../validations/admin/project";
import { getFutureDateString, getTodayString } from "../../../utils/helpers";
import AddTech from "./AddTech";
import FormInput from "../../form/FormInput";
import ReadmeInput from "./ReadmeInput";
import useProfileStore from "../../../hooks/useProfileStore";
import { addProject, editProject } from "../../../api/admin/project";
import AddProjectImages from "./AddProjectImages";

export default function ProjectForm({ project }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { scrollToTopSmooth } = useScrollTo();
  const { profile } = useProfileStore();

  const formMethods = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      ...(project
        ? project
        : {
            startDate: getTodayString(),
            github: "",
            colleagues: [],
            techStack: [],
            images: [],
          }),
    },
  });

  const {
    clearErrors,
    watch,
    control,
    getValues,
    formState: { errors },
    handleSubmit,
  } = formMethods;

  useEffect(() => {
    const subscription = watch(() => {
      clearErrors("root");
    });

    return () => subscription.unsubscribe();
  }, [clearErrors]);

  const addProjectMuation = useMutation({
    mutationFn: addProject,
    onMutate: () => setIsLoading(true),
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
      navigate("/admin/projects");
    },
    onError: (error) => {
      setToastMessage(error.message);
    },
    onSettled: () => setIsLoading(false),
  });

  const editProjectMuation = useMutation({
    mutationFn: editProject,
    onMutate: () => setIsLoading(true),
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
      navigate("/admin/projects");
    },
    onError: (error) => {
      setToastMessage(error.message);
    },
    onSettled: () => setIsLoading(false),
  });

  const onSubmit = (data) => {
    const projectData = {
      ...data,
      colleagues: [...data.colleagues, profile].map((coll) => coll._id),
    };

    if (project) {
      editProjectMuation.mutate(projectData);
    } else {
      addProjectMuation.mutate(projectData);
    }
  };

  const onError = () => {
    console.log(getValues());

    scrollToTopSmooth();
  };

  const translateDefaultErrorMessage = (messageKey) => {
    const message = errors && errors[messageKey] ? errors[messageKey].message : undefined;
    return message === "Required" ? "Fältet får inte vara tomt" : message;
  };

  const hasRootError = errors?.root?.message;

  const startDate = watch("startDate");
  const minEndDate = getFutureDateString(startDate, 7);

  console.log("err; ", errors);

  return (
    <>
      <FormProvider {...formMethods}>
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="flex flex-col items-center gap-y-6 m-auto w-[90%] max-w-[900px]">
          <Controller
            name="project"
            control={control}
            render={({ field }) => (
              <FormInput
                label="Namn på projekt"
                value={field.value}
                placeholder="Ange projektnamn"
                isRequired={true}
                autoFocus={true}
                errorMessage={translateDefaultErrorMessage("project")}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <FormInput
                label="Startdatum"
                type="date"
                value={field.value}
                placeholder="Ange när projektet påbörjades"
                isRequired={true}
                errorMessage={translateDefaultErrorMessage("startDate")}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <FormInput
                label="Slutdatum"
                type="date"
                value={field.value}
                min={minEndDate}
                placeholder="Ange när projektet avlutades om det har avslutats"
                errorMessage={translateDefaultErrorMessage("endDate")}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="website"
            control={control}
            render={({ field }) => (
              <FormInput
                label="Domän"
                type="url"
                value={field.value}
                placeholder="Valfritt ange en domän"
                errorMessage={translateDefaultErrorMessage("website")}
                onChange={field.onChange}
              />
            )}
          />
          <ReadmeInput name="github" placeholder="Ange github URL" label="Github" />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <FormInput
                label="Beskrivning av projet"
                type="textarea"
                value={field.value}
                minLength={100}
                maxLength={2000}
                placeholder="Valfritt Ange en beskrivning projektet"
                errorMessage={translateDefaultErrorMessage("description")}
                onChange={field.onChange}
              />
            )}
          />
          <AddColleagues />
          <AddTech />
          <AddProjectImages project={project} />
          <div className="w-fit m-auto mt-8">
            <PrimaryBtn type="submit">
              <span className="flex justify-center items-center gap-x-2 mx-4">
                <span className="text-lg">{project ? "Uppdatera projekt" : "Lägg till"}</span>
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

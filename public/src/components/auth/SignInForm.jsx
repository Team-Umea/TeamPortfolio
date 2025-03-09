import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormProvider, useForm } from "react-hook-form";
import { useEffect, useReducer, useState } from "react";
import { PuffLoader } from "react-spinners";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import UserForm from "./user/UserForm";
import SecurityQuestionForm from "./securityQuestion/SecurityQuestionForm";
import VerificationCodeForm from "./verificationCode/VerificationCodeForm";
import PrimaryBtn from "../btn/PrimaryBtn";
import { signInFormSchema, SignInTypeEnum } from "../../validations/auth/signIn";
import {
  requestVerificationCode,
  signIn,
  validateSecurityQuestion,
  verifyVerificationCode,
} from "../../api/authecho";
import PasswordForm from "./password/PasswordForm";

export default function SignInForm() {
  const formMethods = useForm({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      signInType: SignInTypeEnum.User,
    },
  });

  const [securityQuestion, setSecurityQuestion] = useState("");

  const {
    watch,
    getValues,
    setError,
    formState: { isSubmitting, errors },
    reset,
    handleSubmit,
  } = formMethods;

  const requestVerificationCodeMutation = useMutation({
    mutationFn: requestVerificationCode,
    onSuccess: (data) => {
      setSecurityQuestion(data.data.question);
      setSignInType(SignInTypeEnum.VerificationCode);
    },
    onError: (error) => {
      setError("user.user", { type: "manual", message: error.message });
    },
  });

  const verifyVerificationCodeMutation = useMutation({
    mutationFn: verifyVerificationCode,
    onSuccess: () => {
      console.log("Success");
      setSignInType(SignInTypeEnum.Password);
    },
    onError: () => {
      setSignInType(SignInTypeEnum.SecurityQuestion);
    },
  });

  const validateSecurityQuestionMutation = useMutation({
    mutationFn: validateSecurityQuestion,
    onSuccess: () => {
      setSignInType(SignInTypeEnum.VerificationCode);
    },
    onError: (error) => {
      setError("securityQuestion.securityQuestion", { type: "manual", message: error.message });
    },
  });

  const signInMutation = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      console.log("Signed in");
    },
    onError: (error) => {
      setError("password.password", { type: "manual", message: error.message });
    },
  });

  const signInType = watch("signInType");
  const signInTypeIsUser = signInType === "user";
  const signInTypeIsVerificationCode = signInType === "verificationCode";
  const signInTypeIsSecurityQuestion = signInType === "securityQuestion";
  const signInTypeIsPassword = signInType === "password";

  const isValid = Object.keys(errors).length === 0;

  const setSignInType = (signInType) => {
    formMethods.setValue("signInType", signInType);
  };

  const getFormFieldValues = () => {
    const { formType, ...formData } = getValues();
    return formData[formType];
  };

  const onSubmit = async () => {
    const data = getValues();

    let payload;

    switch (signInType) {
      case "user":
        payload = { user: data.user.user };
        requestVerificationCodeMutation.mutate(payload);
        break;
      case "verificationCode":
        payload = {
          user: data.user.user,
          verificationCode: data.verificationCode.verificationCode,
        };

        verifyVerificationCodeMutation.mutate(payload);
        break;
      case "securityQuestion":
        payload = {
          user: data.user.user,
          securityQuestion: data.securityQuestion.securityQuestion,
        };

        validateSecurityQuestionMutation.mutate(payload);
        break;
      case "password":
        payload = {
          user: data.user.user,
          verificationCode: data.verificationCode.verificationCode,
          password: data.password.password,
        };
        signInMutation.mutate(payload);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <FormProvider {...formMethods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center px-6 pt-12 pb-6 rounded-xl shadow-lg bg-slate-200">
          {signInTypeIsUser && <UserForm />}
          {signInTypeIsVerificationCode && <VerificationCodeForm />}
          {signInTypeIsSecurityQuestion && (
            <SecurityQuestionForm securityQuestion={securityQuestion} />
          )}
          {signInTypeIsPassword && <PasswordForm />}
          <div className="mt-22 w-full">
            <PrimaryBtn type="submit">
              <span className="text-lg font-medium">Continue</span>
            </PrimaryBtn>
          </div>
          <a
            href="https://authecho.com"
            target="_blank"
            className="mt-6 max-w-[90%] text-blue-700 cursor-pointer border-b-[1px] border-transparent transition-all duration-300 ease hover:border-blue-700">
            {signInTypeIsUser
              ? "Don't have an accout? Sign up here!"
              : "Forgot your credentials? Manage your account here."}
          </a>
        </form>
      </FormProvider>
    </div>
  );
}

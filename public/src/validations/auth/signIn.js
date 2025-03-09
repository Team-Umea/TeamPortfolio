import { z } from "zod";
import { securityQuestionSchema } from "./securityQuestion";
import { verificationCodeSchema } from "./verificationCode";
import { passwordSchema } from "./password";
import { userSchema } from "./user";

export const SignInTypeEnum = {
  User: "user",
  VerificationCode: "verificationCode",
  SecurityQuestion: "securityQuestion",
  Password: "password",
};

export const signInFormSchema = z.discriminatedUnion("signInType", [
  z.object({
    signInType: z.literal(SignInTypeEnum.User),
    user: userSchema,
  }),
  z.object({
    signInType: z.literal(SignInTypeEnum.VerificationCode),
    verificationCode: verificationCodeSchema,
  }),
  z.object({
    signInType: z.literal(SignInTypeEnum.SecurityQuestion),
    securityQuestion: securityQuestionSchema,
  }),
  z.object({
    signInType: z.literal(SignInTypeEnum.Password),
    password: passwordSchema,
  }),
]);

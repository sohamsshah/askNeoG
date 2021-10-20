import * as yup from "yup";

export const signUpSchema = yup.object({
  firstName: yup.string().required("First name is a required field."),
  lastName: yup.string().required("Last name is a required field."),
  email: yup
    .string()
    .email("Please make sure entered email is valid.")
    .required("Email is a required field"),
  password: yup
    .string()
    .min(8, "Password must be atleast 8 characters long")
    .max(256)
    .required("Password is a required field.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, mix of numbers and alphabets."
    ),
});

export const signInSchema = yup.object({
  email: yup
    .string()
    .required("Email is required to sign in.")
    .email("Make sure email is valid."),
  password: yup.string().required("Password is required to sign in."),
});

export type SignUpBody = yup.InferType<typeof signUpSchema>;
export type SignInBody = yup.InferType<typeof signInSchema>;

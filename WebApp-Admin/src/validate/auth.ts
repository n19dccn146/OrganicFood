import * as yup from "yup";

export const signInSchema = yup.object().shape({
  username: yup.string().email().required("Please enter the required field"),
  password: yup
    .string()
    .required("Please enter the required field")
    .min(6, "Password must have at least 6 character"),
});

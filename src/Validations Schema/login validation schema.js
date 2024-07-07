import * as yup from "yup";

const schema = yup.object({
  email: yup.string().required("field required").email("invalid email format"),

  // phone: yup.string() /*.required("phone is required")*/,

  password: yup
    .string()
    .required("field required")
    .min(8, "less than 8 characters"),
});

export default schema;

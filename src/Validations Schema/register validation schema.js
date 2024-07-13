import * as yup from "yup";

const schema = yup.object({
  firstName: yup
    .string()
    .required("field required")
    .max(10, "more than 10 characters"),

  lastName: yup
    .string()
    .required("field required")
    .max(10, "more than 10 characters"),

  email: yup.string().required("field required").email("invalid email format"),
  // phone: yup.string() /*.required("phone is required")*/,

  // address: yup.object().shape({
  //   country: yup.string().required("country is required "),
  //   city: yup.string().required("city is required "),
  // }),
  country: yup.string().required("field required"),
  city: yup.string().required("field required"),

  password: yup
    .string()
    .required("field required")
    .min(8, "less than 8 characters"),
});

export default schema;

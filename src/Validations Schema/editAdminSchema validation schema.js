import * as yup from "yup";

const schema = yup.object({
  firstName: yup.string().max(10, "more than 10 characters"),

  lastName: yup.string().max(10, "more than 10 characters"),

  email: yup.string().email("invalid email format"),

  country: yup.string(),
  city: yup.string(),

  password: yup.string().min(8, "less than 8 characters"),
});

export default schema;

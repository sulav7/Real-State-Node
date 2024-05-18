import { z } from "zod";

const userSchema = z.object({
  firstName: z
    .string({
      required_error: "First Name is required",
      invalid_type_error: "First Name should be string",
    })
    .min(1, "First Name should be of at least 2 digit"),

  lastName: z
    .string({
      required_error: "Last Name is required",
      invalid_type_error: "Last Name should be string",
    })
    .min(1, "Last Name should be of at least 2 digit"),

  userName: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username should be string",
    })
    .min(6, "Username must be of 7 characters")
    .max(20, "Username can't be longer than 20 characters"),

  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be string",
    })
    .email("Invalid Email Type"),

  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be string",
    })
    .min(8, "Password must be of 8 character")
    .max(15, "Password should not be more than 15 character")
    .regex(
      new RegExp(".*[A-Z].*"),
      "Password must have one uppercase character"
    )
    .regex(
      new RegExp(".*[a-z].*"),
      "Password must have one lowercase character"
    )
    .regex(new RegExp(".*\\d.*"), "Password must have one number")
    .regex(
      new RegExp(".*[!@#$%^&*()].*"),
      "Password must have one special character"
    ),
});

export default userSchema;

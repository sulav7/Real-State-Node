import z from "zod";

const customerSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
  phone: z
    .string()
    .regex(/^\d{10}$/)
    .optional(),
  address: z.string().min(1).max(255),
});

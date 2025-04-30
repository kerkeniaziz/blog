import { z } from "zod";


// Zod schema
const forgotSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
});

export default forgotSchema;
export type ForgotFormData = z.infer<typeof forgotSchema>;
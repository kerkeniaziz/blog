import { z } from "zod";


// Zod schema
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default loginSchema;
export type LoginFormData = z.infer<typeof loginSchema>;
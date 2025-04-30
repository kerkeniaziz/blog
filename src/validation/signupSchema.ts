import { z } from "zod";


// Zod schema
const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }).max(20),
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default schema;
export type FormData = z.infer<typeof schema>;
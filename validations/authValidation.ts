import { z } from "zod";

const Auth = z.object({
  email: z.string().email(),
});

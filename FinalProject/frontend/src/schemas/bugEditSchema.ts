import {z} from "zod";

const bugEditSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  stepsToReproduce: z.string().optional()
})

export default bugEditSchema
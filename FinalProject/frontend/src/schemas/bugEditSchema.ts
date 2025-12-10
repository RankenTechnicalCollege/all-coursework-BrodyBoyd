import {z} from "zod";

const bugEditSchema = z.object({
  title: z.string(),
  bugDescription: z.string(),
  stepsToReproduce: z.string()
})
  

export default bugEditSchema
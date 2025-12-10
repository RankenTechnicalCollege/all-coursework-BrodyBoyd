import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { getClient, connect } from "./database.js"



const client = await getClient();
const db = await connect();

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:2023",
  trustedOrigins: ["http://localhost:5173", "http://localhost:8080","http://localhost:3000","http://localhost:2023" ],
    database: mongodbAdapter(db, {
      client
    }),
    emailAndPassword: { 
    enabled: true, 
  },
  user: {
    additionalFields: {
      role: {
        type:"object",
        required: false
      },
      fullName: {
        type:"string",
        required: false
      },
    }

  }

});


export default auth
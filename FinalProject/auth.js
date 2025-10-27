import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { getClient, connect } from "./database.js"



const client = await getClient();
const db = await connect();

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:8080",
  trustedOrigins: ["http://localhost:5173", "http://localhost:8080","http://localhost:3000", "https://issuetracker-service-627308096057.us-central1.run.app/"],
    database: mongodbAdapter(db, {
      client
    }),
    emailAndPassword: { 
    enabled: true, 
  },
  user: {
    additionalFields: {
      givenName: {
        type:"string",
        required: true
      },
      familyName: {
        type: "string",
        required: true,
      },
      fullName: {
        type:"string",
        required: true
      },
      role: {
        type: "object",
        required: true, 
      },
      createdBugs: {
        type: "object",
        required: false,
        defaultValue: []
      },
      assignedBugs: {
        type: "object",
        required: false,
        defaultValue: []
      }
    }

  }

});


export default auth
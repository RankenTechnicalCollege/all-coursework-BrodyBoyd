import { useState } from 'react'
import { Link } from 'react-router-dom';
import { authClient } from "../auth-client.js";
import { useNavigate } from "react-router-dom";
import UserSchema from '../schemas/registerSchema.ts'
import type { FormEvent } from "react";

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate();


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      console.log('working')
      e.preventDefault();

      const newUser = UserSchema.safeParse({
        email: email,
        password: password,
        role: role,
      });

      if (!newUser.success) {
          setErrorMessage(newUser.error.issues[0].message)
          return
        }

      if (confirmPassword === password){
      try {
        const res = await authClient.signUp.email({
        email: email, // required
        password: password, // required
        name: `${firstName} ${lastName}`, // required
      }, {
        onRequest: (ctx) => {
            // Parse the body if it's a string, otherwise use as-is
            const bodyData =
              typeof ctx.body === "string"
                ? JSON.parse(ctx.body)
                : ctx.body;

            // Add custom fields
            const updatedBody = {
              ...bodyData,
              role: [role],
              familyName: lastName,
              givenName: firstName
            };

            // Stringify the body back
            ctx.body = JSON.stringify(updatedBody);

            // Return the full context
            return ctx;
          },
        });
      if(res.error) {
          console.error("Login error:", res.error.message);
          setErrorMessage(res.error.message || "An error occurred")
        }else{
          console.log(`Login successful! ${JSON.stringify(res)}`);
          navigate("/");
        }
    } catch (error) {
      const err: any = error;
      if (err?.response?.data) {
        console.error("Login failed:", err.response.data);
        setErrorMessage(err.response.data?.message || JSON.stringify(err.response.data));
      } else if (err instanceof Error) {
        console.error("Login failed:", err.message);
        setErrorMessage(err.message);
      } else {
        console.error("Login failed:", err);
        setErrorMessage("An unexpected error occurred");
      }
    }
    } else {
      setErrorMessage("Passwords must be the same!")
    }
  }

  return (
    <>
     <div className='bg-blue-300 h-screen w-screen flex justify-center flex-1 items-center'> 
      <div className="flex justify-center flex-1 items-center px-6 ">
        <div className="w-full xl:w-3/4 lg:w-11/12 flex ">
          <div
            className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg backgroundArea"></div>
          <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
            <h3 className="pt-4 text-4xl text-center font-thin">Create an Account!</h3>
            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={(e) => handleSubmit(e)}>
              <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => {setFirstName(e.target.value)}}
                  />
                </div>
                <div className="md:ml-2">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => {setLastName(e.target.value)}}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {setEmail(e.target.value)}}
                />
              </div>
              <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                    Role
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="role"
                    type="text"
                    value={role} 
                    onChange={(e) => {setRole(e.target.value)}}
                  />
                </div>
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="******************"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="md:ml-2">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="c_password">
                    Confirm Password
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="c_password"
                    type="password"
                    placeholder="******************"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              {errorMessage ? (
                <p style={{color: 'red'}}>{errorMessage}</p>        
                ) : (
                    <p></p>
                  )}
              <div className="mb-6 text-center">
                <button
                  className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Register Account
                </button>
              </div>
              <hr className="mb-6 border-t" />
              <div className="text-center">
                <a
                  className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="text-center">
                <Link
                  className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                  to="/Login"
                >
                  Already have an account? Login!
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Register

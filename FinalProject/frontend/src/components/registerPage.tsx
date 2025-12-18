import { useState } from 'react'
import { Link } from 'react-router-dom';
import { authClient } from "../auth-client.js";
import { useNavigate } from "react-router-dom";
import UserSchema from '../schemas/registerSchema.ts'
import type { FormEvent } from "react";

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const navigate = useNavigate();
  const handleCheckboxChange = (role: any) => {
    setSelectedRoles((prevSelected: any) =>
      prevSelected.includes(role)
        ? prevSelected.filter((r: any) => r !== role) // Remove if already selected
        : [...prevSelected, role] // Add if not selected
    );
  };

  const roles = [
  'developer',
  'business analyst',
  'quality analyst',
  'product manager',
  'technical manager',
];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      console.log('working')
      e.preventDefault();
      setErrors({});

      // Check if passwords match
      if (confirmPassword !== password){
        setErrors(prev => ({ ...prev, confirmPassword: "Passwords must be the same!" }));
        return;
      }

      const newUser = UserSchema.safeParse({
        email: email,
        password: password,
        role: selectedRoles,
      });

      if (!newUser.success) {
          const fieldErrors: Record<string, string> = {};
          newUser.error.issues.forEach(issue => {
            const fieldName = String(issue.path[0]);
            fieldErrors[fieldName] = issue.message;
          });
          setErrors(fieldErrors);
          console.log('Validation error:', newUser.error);
          return
        }

      console.log('Validation passed, sending:', newUser.data);

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
              role: Array.isArray(selectedRoles)
                ? selectedRoles.map(r => r.toLowerCase()) // flat array of lowercase strings
                : [String(selectedRoles).toLowerCase()],
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
          setErrors({ submit: res.error.message || "An error occurred" });
        }else{
          console.log(`Login successful! ${JSON.stringify(res)}`);
          navigate("/");
        }
    } catch (error) {
      const err = error as Record<string, any>;
      if (err?.response?.data) {
        console.error("Login failed:", err.response.data);
        setErrors({ submit: err.response.data?.message || JSON.stringify(err.response.data) });
      } else if (err instanceof Error) {
        console.error("Login failed:", err.message);
        setErrors({ submit: err.message });
      } else {
        console.error("Login failed:", err);
        setErrors({ submit: "An unexpected error occurred" });
      }
    }
  }

  return (
    <>
     <div className='bg-blue-300 w-screen min-h-screen flex justify-center flex-1 py-6'> 
      <div className="flex justify-center flex-1 items-start px-6 ">
        <div className="w-full xl:w-3/4 lg:w-11/12 flex max-h-[calc(100vh-200px)] overflow-y-auto">
          <div
            className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg backgroundArea"></div>
          <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none overflow-y-auto">
            <h3 className="pt-2 text-3xl text-center font-thin">Create an Account!</h3>
            <form className="px-6 pt-4 pb-6 mb-4 bg-white rounded" onSubmit={(e) => handleSubmit(e)}>
              <div className="mb-3 md:flex md:justify-between">
                <div className="mb-3 md:mr-2 md:mb-0">
                  <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    className="w-full px-3 py-1 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => {setFirstName(e.target.value)}}
                  />
                  {errors.firstName && <p style={{color: 'red', fontSize: '0.75rem'}}>{errors.firstName}</p>}
                </div>
                <div className="md:ml-2">
                  <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    className="w-full px-3 py-1 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => {setLastName(e.target.value)}}
                  />
                  {errors.lastName && <p style={{color: 'red', fontSize: '0.75rem'}}>{errors.lastName}</p>}
                </div>
              </div>
              <div className="mb-3">
                <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-full px-3 py-1 mb-1 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {setEmail(e.target.value)}}
                />
                {errors.email && <p style={{color: 'red', fontSize: '0.75rem'}}>{errors.email}</p>}
              </div>
              <div className="mb-3 md:flex md:justify-between">
                 <div className="w-full">
                <label className="text-xs text-gray-800 font-bold">Role</label>
                <div className="w-full inline-flex border text-sm">
                  <div className="pt-1 w-1/12 bg-gray-100">
                    <svg
                      fill="none"
                      className="w-4 text-gray-400 mx-auto"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>

                 <div className="input-group flex flex-wrap gap-1 p-2">
                  {roles.map((role, index) => (
                    <label key={index} className="checkbox text-xs">
                      <input
                        className="checkbox__input"
                        type="checkbox"
                        name={`role-${index}`}
                        value={role}
                        checked={selectedRoles.includes(role)}
                        onChange={() => handleCheckboxChange(role)}
                      />
                      <span className="checkbox__label">{role}</span>
                    </label>
                  ))}


                </div>

                </div>
              </div>
                <div className="mb-3 md:mr-2 md:mb-0">
                  <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="w-full px-3 py-1 mb-1 text-sm leading-tight text-gray-700 border  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="******************"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && <p style={{color: 'red', fontSize: '0.75rem'}}>{errors.password}</p>}
                </div>
                <div className="md:ml-2">
                  <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="c_password">
                    Confirm Password
                  </label>
                  <input
                    className="w-full px-3 py-1 mb-1 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="c_password"
                    type="password"
                    placeholder="******************"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {errors.confirmPassword && <p style={{color: 'red', fontSize: '0.75rem'}}>{errors.confirmPassword}</p>}
                </div>
              </div>
              {errors.submit && (
                <p style={{color: 'red', marginBottom: '0.5rem', fontSize: '0.875rem'}}>{errors.submit}</p>        
              )}
              {errors.role && (
                <p style={{color: 'red', fontSize: '0.75rem', marginBottom: '0.5rem'}}>{errors.role}</p>        
              )}
              <div className="mb-3 text-center">
                <button
                  className="w-full px-3 py-1 text-sm font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Register Account
                </button>
              </div>
              <hr className="mb-3 border-t" />
              <div className="text-center text-sm">
                <a
                  className="inline-block text-xs text-blue-500 align-baseline hover:text-blue-800"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="text-center text-sm">
                <Link
                  className="inline-block text-xs text-blue-500 align-baseline hover:text-blue-800"
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

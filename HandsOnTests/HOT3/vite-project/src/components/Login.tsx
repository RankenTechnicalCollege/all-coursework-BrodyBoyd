import { authClient } from "../auth-client";
import { useState, type FormEvent } from "react";
import { useNavigate } from 'react-router-dom';
import {loginSchema} from "../schemas/loginschema";
import { Link } from "react-router-dom";
import {toast } from 'react-toastify';
import Navbar from "./Navbar";
function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const navigate = useNavigate();

  function showError(message: string) {
    toast(message, { type: 'error', position: 'bottom-right' });
  }
  function showSuccess(message: string) {
    toast(message, { type: 'success', position: 'bottom-right' });
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log('working')
    e.preventDefault();
    setErrors({});
    
    try {
        const result = loginSchema.safeParse({ email, password });

        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            result.error.issues.forEach(issue => {
              const fieldName = String(issue.path[0]);
              fieldErrors[fieldName] = issue.message;
            });
            setErrors(fieldErrors);
            showError("Please fix the validation errors.");
            return
        }

        const res = await authClient.signIn.email({email: email, password: password});
        // console.log("Login successful:", res);
        if(res.error) {
          console.error("Login error:", res.error.message);
          setErrors({ submit: res.error.message || "An error occurred" });
          showError(res.error.message || "An error occurred");
        }else{
          console.log(`Login successful! ${JSON.stringify(res)}`)   
          showSuccess("Login successful!");      
          navigate("/");
        }
        }
          catch (error) {
    console.error("Login failed:", error);
    setErrors({ submit: "An unexpected error occurred" });
    }
  }

  return (
    <>
    <Navbar />
    <div className="font-sans">
      <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 ">
        <div className="relative sm:max-w-sm w-full">
          <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
          <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
          <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
            <label htmlFor="" className="block mt-3 text-sm text-gray-700 text-center font-semibold">
              Login
            </label>
            <form onSubmit={handleSubmit} action="#" className="mt-10">
                                      
              <div>
                <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="example@email.com" className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"/>
              </div>
              {errors.email && <p style={{color: 'red', fontSize: '0.875rem'}}>{errors.email}</p>}

          
              <div className="mt-7">                
                <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="password" className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"/>                           
              </div>
              {errors.password && <p style={{color: 'red', fontSize: '0.875rem'}}>{errors.password}</p>}
            
              <div className="mt-7">
                <button type="submit" className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                  Login
                </button>
              </div>

              <div className="mt-7">
                <div className="flex justify-center items-center">
                  <label className="mr-2" >New User?</label>
                    <Link to="/Register" className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                      Register here!
                    </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>  
    </div>
    </>
  );
}

export default Login;
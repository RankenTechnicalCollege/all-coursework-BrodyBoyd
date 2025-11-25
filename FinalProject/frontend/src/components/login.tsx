import { useState } from "react"
import { Link } from 'react-router-dom';
import { authClient } from "../auth-client.js";
import { useNavigate } from "react-router-dom";
import loginSchema from '../schemas/loginSchema'
function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    console.log('working')
    e.preventDefault();
    
    try {
        const result = loginSchema.safeParse({ email, password });

        if (!result.success) {
            setErrorMessage(result.error.issues[0].message)
            return
        }

        const res = await authClient.signIn.email({email: email, password: password});
        // console.log("Login successful:", res);
        if(res.error) {
          console.error("Login error:", res.error.message);
          setErrorMessage(res.error.message || "An error occurred")
        }else{
          console.log(`Login successful! ${JSON.stringify(res)}`)         
          navigate("/");
        }
        }
          catch (error: any) {
    console.error("Login failed:", error?.response?.data || error?.message || error);
    }
  }

  return (
    <>
      <div className="bg-blue-300 h-screen w-screen">
        <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
            <div className="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/2 bg-white sm:mx-0" style={{height: "500px"}}>
                <div className="flex flex-col w-full md:w-1/2 p-4">
                    <div className="flex flex-col flex-1 justify-center mb-8">
                        <h1 className="text-4xl text-center font-thin">Welcome Back</h1>
                        <div className="w-full mt-4">
                            <form className="form-horizontal w-3/4 mx-auto" method="POST" onSubmit={handleSubmit}>
                                {errorMessage ? (
                                        <p style={{color: 'red'}}>{errorMessage}</p>        
                                ) : (
                                    <p></p>
                                    )}
                                <div className="flex flex-col mt-4">
                                    <input id="email" type="text" className="flex-grow h-8 px-2 border rounded border-grey-400" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"></input>
                                </div>
                                <div className="flex flex-col mt-4">
                                    <input id="password" type="password" className="flex-grow h-8 px-2 rounded border border-grey-400" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                                </div>
                                <div className="flex items-center mt-4">
                                    <input type="checkbox" name="remember" id="remember" className="mr-2"/> <label htmlFor="remember" className="text-sm text-grey-dark">Remember Me</label>
                                </div>
                                <div className="flex flex-col mt-8">
                                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded">
                                        Login
                                    </button>
                                </div>
                                <div className="flex flex-col mt-3">
                                    <Link to='/Register' type="button" className="bg-gray-500 hover:bg-gray-600 text-center text-white text-sm font-semibold py-2 px-4 rounded">
                                        Register
                                    </Link>
                                </div>
                            </form>
                            <div className="text-center mt-4">
                                <a className="no-underline hover:underline text-blue-dark text-xs" href="#">
                                    Forgot Your Password?
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                  <div className="hidden md:block md:w-1/2 rounded-r-lg backgroundArea"></div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Login

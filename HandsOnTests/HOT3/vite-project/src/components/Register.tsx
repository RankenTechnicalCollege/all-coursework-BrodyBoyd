import { authClient } from "../auth-client";
import { useState, type FormEvent } from "react";
import { useNavigate } from 'react-router-dom';
import {registerSchema} from "../schemas/loginschema";
import { Link } from "react-router-dom";
import {toast } from 'react-toastify';
function Register() {
  const [email, setEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const [errors, setErrors] = useState<Record<string, string>>({})
  const navigate = useNavigate();

  const handleCheckboxChange = (role: any) => {
    setSelectedRoles((prevSelected: any) =>
      prevSelected.includes(role)
        ? prevSelected.filter((r: any) => r !== role) // Remove if already selected
        : [...prevSelected, role] // Add if not selected
    );
  };
  function showError(message: string) {
    toast(message, { type: 'error', position: 'bottom-right' });
  }
  function showSuccess(message: string) {
    toast(message, { type: 'success', position: 'bottom-right' });
  }

  const roles = [
  'Customer',
  'Product Manager',
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
      if (confirmEmail !== email){
        setErrors(prev => ({ ...prev, confirmEmail: "Emails must be the same!" }));
        return;
      }

      const newUser = registerSchema.safeParse({
        email: email,
        password: password,
        name: name,
        role: Array.isArray(selectedRoles)
          ? selectedRoles.map(r => r.toLowerCase())
          : [String(selectedRoles).toLowerCase()],
      });

      if (!newUser.success) {
          const fieldErrors: Record<string, string> = {};
          newUser.error.issues.forEach(issue => {
            const fieldName = String(issue.path[0]);
            fieldErrors[fieldName] = issue.message;
          });
          setErrors(fieldErrors);
          console.log('Validation error:', newUser.error);
          showError("Please fix the validation errors.");
          return
        }

      console.log('Validation passed, sending:', newUser.data);

      try {
        const res = await authClient.signUp.email({
        email: email, // required
        password: password, // required
        name: name, // required
        
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
            };

            // Stringify the body back
            ctx.body = JSON.stringify(updatedBody);

            // Return the full context
            return ctx;
          },
        });

      if(res.error) {
          console.error("Register error:", res.error.message);
          setErrors({ submit: res.error.message || "An error occurred" });
          showError(res.error.message || "An error occurred");
        }else{
          console.log(`Register successful! ${JSON.stringify(res)}`);
          showSuccess("Registration successful! You can now log in.");
          navigate("/");
        }
    } catch (error) {
      const err = error as Record<string, any>;
      if (err?.response?.data) {
        console.error("Register failed:", err.response.data);
        setErrors({ submit: err.response.data?.message || JSON.stringify(err.response.data) });
      } else if (err instanceof Error) {
        console.error("Register failed:", err.message);
        setErrors({ submit: err.message });
      } else {
        console.error("Register failed:", err);
        setErrors({ submit: "An unexpected error occurred" });
      }
    }
  }

  return (
    <div className="font-sans">
      <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 ">
        <div className="relative sm:max-w-sm w-full">
          <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
          <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
          <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
            <label htmlFor="" className="block mt-3 text-sm text-gray-700 text-center font-semibold">
              Register
            </label>
            <form onSubmit={handleSubmit} action="#" className="mt-10">

              <div>
                <label className="mr-2" >Full Name:</label>              
                <input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="Full Name" className="mt-1 block w-full border-2 border-gray-500 bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"/>
              </div>
              {errors.name && <p style={{color: 'red', fontSize: '0.875rem'}}>{errors.name}</p>}

              <div>
                <label className="mr-2" >Email:</label>              
                <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="example@email.com" className="mt-1 block w-full border-2 border-gray-500 bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"/>
              </div>
              {errors.email && <p style={{color: 'red', fontSize: '0.875rem'}}>{errors.email}</p>}
              
              <div>
                <label className="mr-2" >Confirm Email:</label>              
                <input type="email" onChange={(e) => setConfirmEmail(e.target.value)} value={confirmEmail} placeholder="example@email.com" className="mt-1 block w-full border-2 border-gray-500 bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"/>
              </div>
              {errors.confirmEmail && <p style={{color: 'red', fontSize: '0.875rem'}}>{errors.confirmEmail}</p>}

              <div className="mt-7">
                <label className="mr-2" >Password</label>              
                <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="password" className="mt-1 block w-full border-2 border-gray-500 bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"/>                           
              </div>
              {errors.password && <p style={{color: 'red', fontSize: '0.875rem'}}>{errors.password}</p>}

              <div className="mt-7">     
                <label className="mr-2" >Confirm Password</label>              
                <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} placeholder="password" className="mt-1 block w-full border-2 border-gray-500 bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"/>                           
              </div>
              {errors.confirmPassword && <p style={{color: 'red', fontSize: '0.875rem'}}>{errors.confirmPassword}</p>}            

              <label className="mr-2" >Role:</label>              
            {roles.map((role, index) => (
              <label key={index} className="checkbox text-xs">
                <input className="checkbox__input" type="checkbox" name={`role-${index}`} value={role} checked={selectedRoles.includes(role)} onChange={() => handleCheckboxChange(role)}/>
                  <span className="checkbox__label">{role}</span>
                </label>
            ))}

              <div className="mt-7">
                <button type="submit" className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                  Register
                </button>
              </div>

              <div className="mt-7">
                <div className="flex justify-center items-center">
                  <label className="mr-2" >Already have an account?</label>
                    <Link to="/Login" className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                      Login here!
                    </Link>
                    {errors.submit && <p style={{color: 'red', fontSize: '0.875rem'}}>{errors.submit}</p>}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>  
    </div>
  );
}

export default Register;
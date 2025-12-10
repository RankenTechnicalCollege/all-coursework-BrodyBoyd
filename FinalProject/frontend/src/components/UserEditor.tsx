
import { useNavigate  } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import api from '../api';
import userEditSchema from '../schemas/userEditSchema';
import { z } from "zod";


// type Props = {
// 	user: User
// }

function UserEditor({ showError, showSuccess }: { showError: (message: string) => void; showSuccess: (message: string) => void }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const navigate = useNavigate();
  // const [formData, setFormData] = useState({
  //   email: email,
  //   name: "",
  //   role: [] as string[],
  // });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const handleCheckboxChange = (role: any) => {
    setSelectedRoles((prevSelected: any) =>
      prevSelected.includes(role)
        ? prevSelected.filter((r: any) => r !== role) // Remove if already selected
        : [...prevSelected, role] // Add if not selected
    );
  };

  const roles = [
    { value: 'developer', label: 'Developer' },
    { value: 'business analyst', label: 'Business Analyst' },
    { value: 'quality analyst', label: 'Quality Analyst' },
    { value: 'product manager', label: 'Product Manager' },
    { value: 'technical manager', label: 'Technical Manager' },
    { value: 'admin', label: 'Admin' }
  ];


	const location = useLocation();
  const user = (location.state as { user: any }).user;
  const userId = user._id;

  useEffect(() => {
    if (user) {
      if (user.email) setEmail(user.email);
      if (user.name) setName(user.name);
      if (user.role) {
        if (Array.isArray(user.role)) {
          setSelectedRoles(user.role.map((r: any) => (typeof r === 'string' ? r.toLowerCase() : r)));
        } else if (typeof user.role === 'string') {
          setSelectedRoles([user.role.toLowerCase()]);
        }
      }
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});

    const formData = {
    email: email,
    name: name,
    role: selectedRoles
  }
  console.log(userId)
    try {
      const validatedData = userEditSchema.parse(formData);
      // const validData = JSON.stringify(validatedData)
      await api.patch(`/api/user/${userId}`, validatedData);
      showSuccess("User updated successfully");
      navigate('/UserList');
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.issues.forEach((issue) => {
          if (issue.path.length > 0) {
            fieldErrors[issue.path[0] as string] = issue.message;
          }
        });
        setValidationErrors(fieldErrors);
        return;
      }
      showError("Failed to update user");
      console.error("Error updating user:", err);
    }
  };

  // const handleRoleChange = (role: string, checked: boolean) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     role: checked
  //       ? [...prev.role, role]
  //       : prev.role.filter((r) => r !== role),
  //   }));
  // };

  return (
    <>
    <section className="py-40 bg-blue-100  bg-opacity-50 h-full">
      <div className="mx-auto container max-w-2xl md:w-3/4 shadow-md">
        <div className="bg-gray-200 p-4 border-t-2 bg-opacity-5 border-indigo-400 rounded-t">
          <div className="max-w-sm mx-auto md:w-full md:mx-0">
            <div className="inline-flex items-center space-x-4">
            
              <h1 className="text-gray-800">{name || user.name}</h1>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
        <div className="bg-white space-y-6">
          <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
            <h2 className="md:w-1/3 max-w-sm mx-auto text-gray-800">Account</h2>
            <div className="md:w-2/3 max-w-sm mx-auto">
              <label className="text-sm text-gray-800">Email</label>
              <div className="w-full inline-flex border">
                <div className="pt-2 w-1/12 bg-gray-100 bg-opacity-50">
                  <svg
                    fill="none"
                    className="w-6 text-gray-400 mx-auto"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <input
                  type="email"
                  className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                  // placeholder={user.email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                
              </div>
              {validationErrors.email && (
                <p className="text-sm text-red-500">{validationErrors.email}</p>
              )}
            </div>
          </div>

          <hr />
          
          <div className="md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-gray-500 items-center">
            <h2 className="md:w-1/3 mx-auto max-w-sm text-gray-800">Personal info</h2>
            <div className="md:w-2/3 mx-auto max-w-sm space-y-5">
              <div>
                <label className="text-sm text-gray-800">Full name</label>
                <div className="w-full inline-flex border">
                  <div className="w-1/12 pt-2 bg-gray-100">
                    <svg
                      fill="none"
                      className="w-6 text-gray-400 mx-auto"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    // placeholder={user.name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                {validationErrors.name && (
                <p className="text-sm text-red-500">{validationErrors.name}</p>
              )}
              </div>
              
              <div>
                <label className="text-sm text-gray-800">Role</label>
                <div className="w-full inline-flex border">
                  <div className="pt-2 w-1/12 bg-gray-100">
                    <svg
                      fill="none"
                      className="w-6 text-gray-400 mx-auto"
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

                 <div className="input-group">
                  {roles.map((role, index) => (
                    <label key={index} className="checkbox">
                      <input
                        className="checkbox__input"
                        type="checkbox"
                        name={`role-${index}`}
                        value={role.value}
                        checked={selectedRoles.includes(role.value)}
                        onChange={() => handleCheckboxChange(role.value)}
                      />
                      <span className="checkbox__label">{role.label}</span>
                    </label>
                  ))}

                  {/* Optional: Display selected roles */}
                  <div style={{ marginTop: '1rem' }}>
                    <strong>Selected Roles:</strong> {selectedRoles.join(', ') || 'None'}
                  </div>


                </div>

                </div>
              </div>
            </div>
          </div>
          <hr/>
          <div className="md:inline-flex w-full space-y-4 md:space-y-0 p-8 text-gray-500 items-center">
            <h2 className="md:w-4/12 max-w-sm mx-auto text-gray-800">Change password</h2>

            <div className="md:w-5/12 w-full md:pl-9 max-w-sm mx-auto space-y-5 md:inline-flex pl-2">
              <div className="w-full inline-flex border-b">
                <div className="w-1/12 pt-2">
                  <svg
                    fill="none"
                    className="w-6 text-gray-400 mx-auto"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type="password"
                  className="w-11/12 focus:outline-none focus:text-gray-600 p-2 ml-4"
                  placeholder="New"
                  value='coming soon'
                  disabled
                />
              </div>
            </div>

            <div className="md:w-3/12 text-center md:pl-6">
              <button type='submit' className="text-white w-full mx-auto max-w-sm rounded-md text-center bg-indigo-400 py-2 px-4 inline-flex items-center focus:outline-none md:float-right hover:cursor-pointer">
                <svg
                  fill="none"
                  className="w-4 text-white mr-2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Update
              </button>
            </div>
          </div>

          <hr />
          
          <div className="w-full p-4 text-right text-gray-500">
            <button className=" inline-flex items-center focus:outline-none mr-4 text-gray-800">
              <svg
                fill="none"
                className="w-4 mr-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete account
            </button>
          </div>
        </div>
      </form>
      </div>
    </section>
    </>
  )
}

export default UserEditor

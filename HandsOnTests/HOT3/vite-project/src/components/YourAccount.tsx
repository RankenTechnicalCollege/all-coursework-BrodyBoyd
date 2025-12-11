
import { useNavigate  } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import api from '../api';
import {userEditSchema} from '../schemas/loginschema';
import { z } from "zod";
import { toast } from 'react-toastify';
import Navbar from './Navbar';

function YourAccount() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  function showError(message: string) {
      toast(message, { type: 'error', position: 'bottom-right' });
    }
    function showSuccess(message: string) {
      toast(message, { type: 'success', position: 'bottom-right' });
    }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/api/users/me`);
        const userData = response.data;
        if (userData) {
          if (userData.email) setEmail(userData.email);
          if (userData.name) setName(userData.name);
          if (userData.role) {
            if (Array.isArray(userData.role)) {
              setSelectedRoles(userData.role.map((r: any) => (typeof r === 'string' ? r.toLowerCase() : r)));
            } else if (typeof userData.role === 'string') {
              setSelectedRoles([userData.role.toLowerCase()]);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUserData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});

    const formData = {
    email: email,
    name: name,
    }
    try {
      const validatedData = userEditSchema.parse(formData);
      // const validData = JSON.stringify(validatedData)
      await api.patch(`/api/users/me`, validatedData);
      showSuccess("User updated successfully");
      navigate('/');
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

  return (
    <>
    <Navbar />
    <section className="py-40 bg-blue-100  bg-opacity-50 h-full">
      <div className="mx-auto container max-w-2xl md:w-3/4 shadow-md">
        <div className="bg-gray-200 p-4 border-t-2 bg-opacity-5 border-indigo-400 rounded-t">
          <div className="max-w-sm mx-auto md:w-full md:mx-0">
            <div className="inline-flex items-center space-x-4">
            
              <h1 className="text-gray-800">{name || ""}</h1>
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
                  </div>
                  <div style={{ marginTop: '1rem' }}>
                    <strong>Your Roles:</strong> {selectedRoles.join(', ') || 'None'}
                  </div>
                </div>
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
          <hr/>
        </div>
      </form>
      </div>
    </section>
    </>
  )
}

export default YourAccount

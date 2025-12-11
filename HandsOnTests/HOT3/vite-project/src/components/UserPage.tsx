import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import api from '../api';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function UserPage() {

  const [currentUser, setCurrentUser] = React.useState<any>(null);
  const [isPending, setIsPending] = React.useState<boolean>(true);
  
  const location = useLocation();
  const user = (location.state as { user: any }).user;
  const userId = user._id;

  const Navigate = useNavigate();

  useEffect(() => {

    const fetchUser = async () => {
      try {
        const response = await api.get(`/api/users/${userId}`, {
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.status === 200) {
          setCurrentUser(response.data);
          setIsPending(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        Navigate('/')
      }
    };
    fetchUser();
    
  }, [userId ]);


  if (isPending || !currentUser) {
    return (
      <>
      <Navbar />
      <p>Loading........</p>
      </>
    );
  }

  return (
    <>
    <Navbar />
    <div className="font-sans">
      <div className="relative flex h-screen flex-col sm:justify-center items-center bg-gray-100 ">
        <div className="relative sm:max-w-sm w-full">
          <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
          <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
          <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
            <label htmlFor="" className="block mt-3 text-sm text-gray-700 text-center font-semibold">
              User
            </label>
            <form action="#" className="mt-10">
                                      
              <div>
                <p className="text-center mt-1 block w-full border-2 border-gray-500 bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">{currentUser.name}</p>
              </div>
              <div>
                <p className="text-center mt-1 block w-full border-2 border-gray-500 bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">{currentUser.email}</p>
              </div>
              <div>
                <p className="text-center mt-1 block w-full border-2 border-gray-500 bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">{currentUser.role.join(', ')}</p>
              </div>
          

              <div className="mt-7">
                <div className="flex justify-center items-center">
                    <Link to="/" className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                      Go Back
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

export default UserPage;
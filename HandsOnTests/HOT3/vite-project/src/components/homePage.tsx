import { useEffect } from 'react';
// import axios from 'axios';
import React from 'react';
import Navbar from './Navbar';

function HomePage() {

  const [users, setUsers] =  React.useState<any[]>([]);
  const [products, setProducts] =  React.useState<any[]>([]);

  useEffect(() => {
    const fetchInformation = async () => {
      try {
        const userResponse = await fetch('/api/users' , {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }, 
          credentials: 'include'
        });
        const productResponse = await fetch('/api/products' , {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }, 
          credentials: 'include'
        });
        setUsers(userResponse.ok ? await userResponse.json() : []);
        setProducts(productResponse.ok ? await productResponse.json() : []);
        console.log(userResponse);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    fetchInformation();
  }, [])
    
  
  return (
    <>
    <Navbar />
    <main className="h-[calc(100vh-120px)] w-full absolute top-14">
        <section id="content"
            className="w-[100wh-60px] lg:w-[100wh-250px] p-5 right-0 transition-all duration-500 ease-in-out">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-slate-50 p-5 m-2 rounded-md flex justify-between items-center shadow hover:-translate-y-2 transition">
                    <div>
                        <h3 className="font-bold">Total Users</h3>
                        <p className="text-gray-500">{users.length}</p>
                    </div>
                    <i className="fa-solid fa-users p-4 bg-gray-200 rounded-md"></i>
                </div>

                <div className="bg-slate-50 p-5 m-2 flex justify-between items-center shadow hover:-translate-y-2 transition">
                    <div>
                        <h3 className="font-bold">Total Bugs</h3>
                        <p className="text-gray-500">2</p>
                    </div>
                    <i className="fa-solid fa-users p-4 bg-green-200 rounded-md"></i>
                </div>

                <div className="bg-slate-50 p-5 m-2 flex justify-between items-center shadow hover:-translate-y-2 transition">
                    <div>
                        <h3 className="font-bold">Total Open Bugs</h3>
                        <p className="text-gray-500">2</p>
                    </div>
                    <i className="fa-solid fa-users p-4 bg-yellow-200 rounded-md"></i>
                </div>

                <div className="bg-slate-50 p-5 m-2 flex justify-between items-center shadow hover:-translate-y-2 transition">
                    <div>
                        <h3 className="font-bold">Total Closed Bugs</h3>
                        <p className="text-gray-500">3</p>
                    </div>
                    <i className="fa-solid fa-users p-4 bg-red-200 rounded-md"></i>
                </div>
            </div>
          <div className=''>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                <div className="overflow-x-auto m-2 shadow-md">
                    <table className="w-full">
                      <thead className="bg-gray-100 rounded-sm">
                          <tr>
                            <th className="text-left px-6">Product Name</th>
                            <th className="text-left px-6">Description</th>
                            <th className="text-left px-6">Category</th>
                            <th className="text-left px-6">Price</th>
                            <td className="px-6">edit</td>
                          </tr>
                        </thead>
                        <tbody>
                            {products.map((product: any) => (
                            <tr key={product._id} className="border-b hover:bg-gray-100">
                                <td className="px-6">{product.name ? product.name : 'No name attached'}</td>
                                <td className="px-6">{product.description}</td>
                                <td className="px-6">{product.category}</td>
                                <td className="px-6 text-green-700">${product.price}</td>
                                <td className="px-6">edit</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                <div className="overflow-x-auto m-2 shadow-md">
                    <table className="w-full">
                        <thead className="bg-gray-100 rounded-sm">
                            <tr>
                            <th className="text-left px-6">User Name</th>
                            <th className="text-left px-6">Email</th>
                            <th className="text-left px-6">Role(s)</th>
                            <th className="text-left px-6">Edit User</th>
                            </tr>
                        </thead>
                        <tbody>
                          {users.map((user: any) => (
                          <tr key={user._id} className="border-b hover:bg-gray-100">
                              <td className="px-6">{user.name ? user.name : 'No name attached'}</td>
                              <td className="px-6">{user.email}</td>
                              <td className="px-6">{user.role ? user.role.join(', ') : 'No role assigned'}</td>
                              <td className="px-6">edit</td>
                          </tr>
                          ))}
                        </tbody>
                    </table>
                </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default HomePage
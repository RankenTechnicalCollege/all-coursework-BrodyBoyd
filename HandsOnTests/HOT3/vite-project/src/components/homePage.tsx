import { useEffect, useState } from 'react';
// import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

function HomePage() {

  const [users, setUsers] =  useState<any[]>([]);
  const [products, setProducts] =  useState<any[]>([]);
  const [searchedProducts, setSearchedProducts] =  useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isPending, setIsPending] = useState<boolean>(false);
  const [averagePrice, setAveragePrice] = useState<number>(0);
  const [randomNumber, setRandomNumber] = useState<number>(0);

  // ✅ Type-safe helper
const calculateAveragePrice = (products: { price: number }[]) => {
  if (products.length === 0) return 0;
  const total = products.reduce((sum, p) => sum + p.price, 0);
  return total / products.length;
};



useEffect(() => {
  const fetchInformation = async () => {
    try {
      const userResponse = await fetch('/api/users?limit=1000', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      const productResponse = await fetch('/api/products?pageSize=1000', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      const usersData = userResponse.ok ? await userResponse.json() : [];
      const productsData = productResponse.ok ? await productResponse.json() : [];
      const randomNum = Math.floor(Math.random() * 100000) + 1;
      setRandomNumber(randomNum);
      setUsers(usersData);
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  fetchInformation();
}, []);

// ✅ Compute average AFTER products are loaded
useEffect(() => {
  const avg = calculateAveragePrice(products);
  setAveragePrice(Number(avg.toFixed(2)));
}, [products]);
  


  const SearchProducts = async () => {
    setIsPending(true);
    try {
    const productResponse = await fetch(`/api/products/name/${searchTerm}` , {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }, 
          credentials: 'include'
        });
    setSearchedProducts(productResponse.ok ? await productResponse.json() : []);
  }catch (error) {
    console.error('Error fetching products:', error);
  }
  setIsPending(false);
}
    

  // if (isPending) {
  //   return (
  //     <>
  //     <Navbar />
  //     <p>Loading........</p>
  //     </>
  //   );
  // }

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
                        <h3 className="font-bold">Total Products</h3>
                        <p className="text-gray-500">{products.length}</p>
                    </div>
                    <i className="fa-solid fa-users p-4 bg-green-200 rounded-md"></i>
                </div>

                <div className="bg-slate-50 p-5 m-2 flex justify-between items-center shadow hover:-translate-y-2 transition">
                    <div>
                        <h3 className="font-bold">Average Price of products</h3>
                        <p className="text-gray-500">${averagePrice}</p>
                    </div>
                    <i className="fa-solid fa-users p-4 bg-yellow-200 rounded-md"></i>
                </div>

                <div className="bg-slate-50 p-5 m-2 flex justify-between items-center shadow hover:-translate-y-2 transition">
                    <div>
                        <h3 className="font-bold">Random Number </h3>
                        <p className="text-gray-500">{randomNumber}</p>
                    </div>
                    <i className="fa-solid fa-users p-4 bg-red-200 rounded-md"></i>
                </div>
            </div>
          <Link to='/AddProductPage' className='bg-green-400/90 rounded-2xl px-2 py-2'>Create Product</Link>
        <div className="flex w-full">
          {/* Left side: Tables */}
          <div className="w-1/2">
            {/* Products Table */}
            <div className="grid grid-cols-1 gap-2">
              <div className="overflow-x-auto m-2 shadow-md">
                <table className="w-full">
                  <thead className="bg-gray-100 rounded-sm">
                    <tr>
                      <th className="text-left px-6">Product Name</th>
                      <th className="text-left px-6">Description</th>
                      <th className="text-left px-6">Category</th>
                      <th className="text-left px-6">Price</th>
                      <td className="px-6">Edit</td>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product: any) => (
                      <tr key={product._id} className="border-b hover:bg-gray-100">
                        <td className="px-6">{product.name || "No name attached"}</td>
                        <td className="px-6">{product.description}</td>
                        <td className="px-6">{product.category}</td>
                        <td className="px-6 text-green-700">${product.price}</td>
                        <td className="px-6"><Link to='/ProductEditor' state={{product}}>Edit Product</Link></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Users Table */}
            <div className="grid grid-cols-1 gap-2">
              <div className="overflow-x-auto m-2 shadow-md">
                <table className="w-full">
                  <thead className="bg-gray-100 rounded-sm">
                    <tr>
                      <th className="text-left px-6">User Name</th>
                      <th className="text-left px-6">Email</th>
                      <th className="text-left px-6">Role(s)</th>
                      <th className="text-left px-6">View User</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user: any) => (
                      <tr key={user._id} className="border-b hover:bg-gray-100">
                        <td className="px-6">{user.name || "No name attached"}</td>
                        <td className="px-6">{user.email}</td>
                        <td className="px-6">
                          {user.role ? user.role.join(", ") : "No role assigned"}
                        </td>
                        <td className="px-6">
                          <Link to="/UserPage" state={{ user }}>
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right side: Search */}
          <div className="w-1/2 flex flex-col items-center py-6">
            <div className="w-3/4">
              <label
                htmlFor="search"
                className="block text-center text-sm font-medium text-gray-700 mb-2"
              >
                Search Products
              </label>

              <div className="relative flex items-center rounded-full shadow-md">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 text-gray-200"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="search"
                  className="bg-slate-400 text-white placeholder-white w-full rounded-full py-2 pl-10 pr-24 focus:ring-2 focus:ring-indigo-600"
                  placeholder="Search"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && SearchProducts()}

                />
                <button
                  type="button"
                  className="absolute right-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-1.5 rounded-full"
                  onClick={SearchProducts}
                  onKeyDown={(e) => e.key === "Enter" && SearchProducts()}
                >
                  Search
                </button>
              </div>
            </div>
            {isPending ? ( 
              <>
                <p>Loading........</p>
              </>
            ) : (
            <div className="grid grid-cols-1 gap-2">
              <div className="overflow-x-auto m-2 shadow-md">
                <table className="w-full">
                  <thead className="bg-gray-100 rounded-sm">
                    <tr>
                      <th className="text-left px-6">Product Name</th>
                      <th className="text-left px-6">Description</th>
                      <th className="text-left px-6">Category</th>
                      <th className="text-left px-6">Price</th>
                      <td className="px-6">Edit</td>
                    </tr>
                  </thead>
                  <tbody>
                    {searchedProducts.map((product: any) => (
                      <tr key={product._id} className="border-b hover:bg-gray-100">
                        <td className="px-6">{product.name || "No name attached"}</td>
                        <td className="px-6">{product.description}</td>
                        <td className="px-6">{product.category}</td>
                        <td className="px-6 text-green-700">${product.price}</td>
                        <td className="px-6"><Link to='/ProductEditor' state={{product}}>Edit Product</Link></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>)}
          </div>
        </div>
        </section>
      </main>

    </>
  )
}

export default HomePage
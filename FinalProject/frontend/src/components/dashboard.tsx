import { useState, useEffect } from 'react';
import PieChart from './Piechart';


function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBugs, setTotalBugs] = useState(0);
  const [closedBugs, setClosedBugs] = useState(0);
  const [openBugs, setOpenBugs] = useState(0);
  const labels = ['Closed Bugs', 'Open Bugs'];
  const values = [closedBugs, openBugs];
  const [users, setUsers] = useState([]);

    
  useEffect(() => {
    const fetchInfo = async () => {
      const bugResoponse = await fetch('/api/bug');
      const userResponse = await fetch('/api/user?limit=100000');
    if (!bugResoponse.ok) throw new Error('Failed to fetch bugs');
    if (!userResponse.ok) throw new Error('Failed to fetch bugs');
    const bugs = await bugResoponse.json();
    const users = await userResponse.json();

    const closedCount = bugs.filter((bug: { closed: boolean; }) => bug.closed === true).length;
    const openCount = bugs.filter((bug: { closed: boolean; }) => bug.closed === false).length;
 
    setTotalBugs(bugs.length);
    setTotalUsers(users.length);
    setUsers(users)
    setClosedBugs(closedCount);
    setOpenBugs(openCount);
    }
    fetchInfo();
  }, []);

  return (
    <>
    <div className="h-screen w-full  top-14">
        <section id="content"
            className="w-[100wh-60px] lg:w-[100wh-250px] p-5 right-0 transition-all duration-500 ease-in-out">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-slate-50 p-5 m-2 rounded-md flex justify-between items-center shadow hover:-translate-y-2 transition">
                    <div>
                        <h3 className="font-bold">Total Users</h3>
                        <p className="text-gray-500">{totalUsers}</p>
                    </div>
                    <i className="fa-solid fa-users p-4 bg-gray-200 rounded-md"></i>
                </div>

                <div className="bg-slate-50 p-5 m-2 flex justify-between items-center shadow hover:-translate-y-2 transition">
                    <div>
                        <h3 className="font-bold">Total Bugs</h3>
                        <p className="text-gray-500">{totalBugs}</p>
                    </div>
                    <i className="fa-solid fa-users p-4 bg-green-200 rounded-md"></i>
                </div>

                <div className="bg-slate-50 p-5 m-2 flex justify-between items-center shadow hover:-translate-y-2 transition">
                    <div>
                        <h3 className="font-bold">Total Open Bugs</h3>
                        <p className="text-gray-500">{openBugs}</p>
                    </div>
                    <i className="fa-solid fa-users p-4 bg-yellow-200 rounded-md"></i>
                </div>

                <div className="bg-slate-50 p-5 m-2 flex justify-between items-center shadow hover:-translate-y-2 transition">
                    <div>
                        <h3 className="font-bold">Total Closed Bugs</h3>
                        <p className="text-gray-500">{closedBugs}</p>
                    </div>
                    <i className="fa-solid fa-users p-4 bg-red-200 rounded-md"></i>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                <div className="m-2 shadow-md">
                    <h2 className="text-xl p-2">Bug Status Chart</h2>
                    <div id="chart" className="w-8/12 mx-auto">
                      <PieChart labels={labels} data={values} />
                    </div>
                </div>
                <div className="overflow-x-auto m-2 shadow-md">
                    <table className="w-full">
                        <thead className="bg-gray-100 rounded-sm">
                            <tr>
                            <th className="text-left px-6">User Name</th>
                            <th className="text-left px-6">Email</th>
                            <th className="text-left px-6">Role</th>
                            <th className="text-left px-6">Assigned Bugs</th>
                            <th className="text-left px-6">Created Bugs</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user: any) => (
                            <tr key={user._id} className="border-b hover:bg-gray-100">
                                <td className="px-6">{user.name ? user.name : `${user.givenName} ${user.familyName}`}</td>
                                <td className="px-6">{user.email}</td>
                                <td className="px-6">{user.role?.join(', ')}</td>
                                <td className="px-6">{user.assignedBugs.length}</td>
                                <td className="px-6">{user.createdBugs.length}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
      </div>
    </>
  )
}

export default Dashboard
import { useState, useEffect } from 'react';
import UserListItem from './userListItem';
import axios from 'axios'
// type User = {
//   username: string;
//   email: string;
//   fullName?: string;
//   role?: string;
//   createdAt?: string;
// };

function UserList() {
  const [users, setUsers] = useState<any[]>([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<string | null>(null);


  // const { 
  //       // data: session, 
  //       isPending: sessionPending, //loading state
  //   } = authClient.useSession()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`/api/user`);
        setUsers(response.data);
        setIsPending(false);
      } catch (err) {
        setError('Failed to fetch users');
        setIsPending(false);
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();

  }, []);

  if (isPending) {
    return <div className="text-center mt-10 text-xl">Loading users...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600">Error loading users: {error}</div>;
  }

  return (
    <section className="flex flex-col text-center pt-16 bg-blue-300 min-h-screen border-2 border-black">
      <h1 className="text-7xl text-gray-800 font-black pb-6">All Users</h1>
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 pb-16">
        {users.map((user) => (
          <UserListItem key={user.email} user={user} />
        ))}
      </section>
    </section>
  );
}

export default UserList;
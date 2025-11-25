import UserListItem from './userListItem';

function UserList() {
	const users = [{
    fullName: "Brody Boyd",
    role: "Admin",
    email: "bjb6287@gmail.com",
  },{
    fullName: "John Cena",
    role: "Developer",
    email: "JCena@gmail.com",
  }]

  return (
    <>
			<section className="flex flex-col text-center align-middle pt-16 bg-blue-300 overflow-auto min-h-screen border-2 border-black">
				<div>
					<p className='align-center text-7xl text-gray-800 font-black'>All Users</p>
				</div>
        <section className="grid grid-cols-1 lg:grid-cols-3 pt-16 bg-blue-300 overflow-auto h-screen">
          {Array.isArray(users) && users.length > 0 ? (
            <div  className="grid grid-cols-1 lg:grid-cols-3 pt-16 bg-blue-300 overflow-auto h-screen w-screen">
              {users.map((user) => (
                <UserListItem user={user} key={user.fullName}></UserListItem>
              ))}
            </div>
          ) : (<p>Not Signed in</p>)}
          
        </section>
			</section>
				
    </>
  )
}

export default UserList

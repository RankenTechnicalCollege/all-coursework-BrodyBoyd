    import { Link } from 'react-router-dom';

function Home() {

  return (
    <>
      <div className="bg-gray-100 font-sans w-full  m-0">
        <div className="bg-white shadow">
        <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
            <div>
            </div>

            <div className="hidden sm:flex sm:items-center">
                <Link to='/' className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4">Home</Link>
                <Link to='/BugList' className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4">Bugs</Link>
                <Link to='/UserList' className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4">Users</Link>
                <Link to="/UserEditor" className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4">My Account</Link>
            </div>

            <div className="hidden sm:flex sm:items-center">
                <Link to='/Login' className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4">Sign in</Link>
                <Link to='/Register' className="text-gray-800 text-sm font-semibold border px-4 py-2 rounded-lg hover:text-purple-600 hover:border-purple-600">Sign up</Link>
            </div>

            <div className="sm:hidden cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-600" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12.9499909,17 C12.7183558,18.1411202 11.709479,19 10.5,19 C9.29052104,19 8.28164422,18.1411202 8.05000906,17 L3.5,17 C3.22385763,17 3,16.7761424 3,16.5 C3,16.2238576 3.22385763,16 3.5,16 L8.05000906,16 C8.28164422,14.8588798 9.29052104,14 10.5,14 C11.709479,14 12.7183558,14.8588798 12.9499909,16 L20.5,16 C20.7761424,16 21,16.2238576 21,16.5 C21,16.7761424 20.7761424,17 20.5,17 L12.9499909,17 Z M18.9499909,12 C18.7183558,13.1411202 17.709479,14 16.5,14 C15.290521,14 14.2816442,13.1411202 14.0500091,12 L3.5,12 C3.22385763,12 3,11.7761424 3,11.5 C3,11.2238576 3.22385763,11 3.5,11 L14.0500091,11 C14.2816442,9.85887984 15.290521,9 16.5,9 C17.709479,9 18.7183558,9.85887984 18.9499909,11 L20.5,11 C20.7761424,11 21,11.2238576 21,11.5 C21,11.7761424 20.7761424,12 20.5,12 L18.9499909,12 Z M9.94999094,7 C9.71835578,8.14112016 8.70947896,9 7.5,9 C6.29052104,9 5.28164422,8.14112016 5.05000906,7 L3.5,7 C3.22385763,7 3,6.77614237 3,6.5 C3,6.22385763 3.22385763,6 3.5,6 L5.05000906,6 C5.28164422,4.85887984 6.29052104,4 7.5,4 C8.70947896,4 9.71835578,4.85887984 9.94999094,6 L20.5,6 C20.7761424,6 21,6.22385763 21,6.5 C21,6.77614237 20.7761424,7 20.5,7 L9.94999094,7 Z M7.5,8 C8.32842712,8 9,7.32842712 9,6.5 C9,5.67157288 8.32842712,5 7.5,5 C6.67157288,5 6,5.67157288 6,6.5 C6,7.32842712 6.67157288,8 7.5,8 Z M16.5,13 C17.3284271,13 18,12.3284271 18,11.5 C18,10.6715729 17.3284271,10 16.5,10 C15.6715729,10 15,10.6715729 15,11.5 C15,12.3284271 15.6715729,13 16.5,13 Z M10.5,18 C11.3284271,18 12,17.3284271 12,16.5 C12,15.6715729 11.3284271,15 10.5,15 C9.67157288,15 9,15.6715729 9,16.5 C9,17.3284271 9.67157288,18 10.5,18 Z"/>
                </svg>
            </div>
            </div>
            
            <div className="block sm:hidden bg-white border-t-2 py-2">
            <div className="flex flex-col">
                <Link to="/" className="text-gray-800 text-sm font-semibold hover:text-purple-600 mb-1">Home</Link>
                <Link to="/BugList" className="text-gray-800 text-sm font-semibold hover:text-purple-600 mb-1">Bugs</Link>
                <Link to="/UserList" className="text-gray-800 text-sm font-semibold hover:text-purple-600 mb-1">Users</Link>
                <Link to="#" className="text-gray-800 text-sm font-semibold hover:text-purple-600 mb-1">My Account</Link>
            <div className="flex justify-between items-center border-t-2 pt-2">
                <Link to="/Login" className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4">Sign in</Link>
                <Link to="/Register" className="text-gray-800 text-sm font-semibold border px-4 py-1 rounded-lg hover:text-purple-600 hover:border-purple-600">Sign up</Link>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
			<div className="w-screen h-screen overflow-hidden relative before:block before:absolute before:bg-black before:h-full before:w-full before:top-0 before:left-0 before:z-10 before:opacity-30">
				<img src="https://picsum.photos/seed/picsum/1900/850" className="absolute top-0 left-0 min-h-full ob" alt=""/>
				<div className="relative z-20 max-w-screen-lg mx-auto grid grid-cols-12 h-full items-center">
					<div className="col-span-6">
						<span className="uppercase text-white text-xs font-bold mb-2 block">WE ARE EXPERTS</span>
						<h1 className="text-white font-extrabold text-5xl mb-8">Finpoint provides Financial Consulting in different ways</h1>
						<p className="text-stone-100 text-base">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</p>
						<button className="mt-8 text-white uppercase py-4 text-base font-light px-10 border border-white hover:bg-white hover:bg-opacity-10">Get started</button>
					</div>
				</div>
			</div>
			<div className="bg-[#f7d0b6] py-20">
				<div className="max-w-screen-lg mx-auto flex justify-between items-center">
					<div className="max-w-xl">
						<h2 className="font-black text-sky-950 text-3xl mb-4">As the leading experts in this field, we're in over 90 countries</h2>
						<p className="text-base text-sky-950">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
					</div>
					<button className="text-sky-950 uppercase py-3 text-base px-10 border border-sky-950 hover:bg-sky-950 hover:bg-opacity-10">Get started</button>
				</div>
			</div>
			<div className="py-12 relative overflow-hidden bg-white">
				<div className="grid grid-cols-2 max-w-screen-lg mx-auto">
					<div className="w-full flex flex-col items-end pr-16">
						<h2 className="text-[#64618C] font-bold text-2xl max-w-xs text-right mb-12 mt-10">Whether you need Assistance</h2>
						<div className="h-full mt-auto overflow-hidden relative">
							<img src="https://picsum.photos/800/600" className="h-full w-full object-contain" alt=""/>
						</div>
					</div>

					<div className="py-20 bg-slate-100 relative before:absolute before:h-full before:w-screen before:bg-sky-950 before:top-0 before:left-0">
						<div className="relative z-20 pl-12">
							<h2 className="text-[#f7d0b6] font-black text-5xl leading-snug mb-10">Finpoint is here <br/>to help you</h2>
							<p className="text-white text-sm">
								Purus in massa tempor nec. Magna etiam tempor orci eu lobortis elementum nibh tellus molestie. Faucibus ornare suspendisse sed nisi lacus sed viverra. Diam in arcu cursus euismod quis viverra nibh cras pulvinar.
							</p>
							<button className="mt-8 text-white uppercase py-3 text-sm px-10 border border-white hover:bg-white hover:bg-opacity-10">Talk with expert</button>
						</div>
					</div>
				</div>
			</div>

			<div className="py-4 relative overflow-hidden bg-white">
				<div className="grid grid-cols-2 max-w-screen-lg mx-auto">
					

					<div className="py-20 bg-slate-100 relative before:absolute before:h-full before:w-screen before:bg-[#f7d0b6] before:top-0 before:right-0">
						<div className="relative z-20 pl-12">
							<h2 className="text-sky-950 font-black text-5xl leading-snug mb-10">Finpoint is here <br/>to help you</h2>
							<p className="text-sky-950 text-sm">
								Purus in massa tempor nec. Magna etiam tempor orci eu lobortis elementum nibh tellus molestie. Faucibus ornare suspendisse sed nisi lacus sed viverra. Diam in arcu cursus euismod quis viverra nibh cras pulvinar.
							</p>
							<button className="mt-8 text-sky-950 uppercase py-3 text-sm px-10 border border-sky-950 hover:bg-white hover:bg-opacity-10">Talk with expert</button>
						</div>
					</div>
					<div className="w-full flex flex-col pl-16">
						<h2 className="text-[#64618C] font-bold text-2xl max-w-xs text-left mb-12 mt-10">Whether you need Assistance</h2>
						<div className="h-full mt-auto overflow-hidden relative">
							<img src="https://picsum.photos/800/600" className="h-full w-full object-contain" alt=""/>
						</div>
					</div>

				</div>
			</div>

			<div className="py-12 relative overflow-hidden bg-white">
				<div className="grid grid-cols-2 max-w-screen-lg mx-auto">
					<div className="w-full flex flex-col items-end pr-16">
						<h2 className="text-[#64618C] font-bold text-2xl max-w-xs text-right mb-12 mt-10">Whether you need Assistance</h2>
						<div className="h-full mt-auto overflow-hidden relative">
							<img src="https://picsum.photos/800/600" className="h-full w-full object-contain" alt=""/>
						</div>
					</div>

					<div className="py-20 bg-slate-100 relative before:absolute before:h-full before:w-screen before:bg-sky-950 before:top-0 before:left-0">
						<div className="relative z-20 pl-12">
							<h2 className="text-[#f7d0b6] font-black text-5xl leading-snug mb-10">Finpoint is here <br/>to help you</h2>
							<p className="text-white text-sm">
								Purus in massa tempor nec. Magna etiam tempor orci eu lobortis elementum nibh tellus molestie. Faucibus ornare suspendisse sed nisi lacus sed viverra. Diam in arcu cursus euismod quis viverra nibh cras pulvinar.
							</p>
							<button className="mt-8 text-white uppercase py-3 text-sm px-10 border border-white hover:bg-white hover:bg-opacity-10">Talk with expert</button>
						</div>
					</div>
				</div>
			</div>
				
    </>
  )
}

export default Home

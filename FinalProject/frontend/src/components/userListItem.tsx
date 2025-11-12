import { useState } from 'react'

import './App.css'

function UserListItem() {
	
  return (
    <>
			<section className="grid grid-cols-1 lg:grid-cols-3 pt-16 bg-blue-300 overflow-auto h-screen">
				<div className="w-full px-4 mx-auto col-span-1">
					<div className="relative flex flex-col min-w-0 break-words bg-gray-950 w-full mb-6 shadow-xl rounded-lg mt-16">
						<div className="px-6">
							<div className="flex flex-wrap justify-center">
								<div className="w-full px-4 flex justify-center">
									<div className="relative">
										<img alt="..." src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg" className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"/>
									</div>
								</div>
							</div>
							<div className="text-center mt-12">
								<h3 className="text-xl font-semibold leading-normal text-gray-50 mb-2">
									Full Name
								</h3>
								<div className="text-sm leading-normal mt-0 mb-2 text-gray-50 font-bold uppercase">
									<i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400">role</i>
								</div>
								<div className="text-sm leading-normal mt-0 mb-2 text-gray-50 font-bold uppercase">
									<i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400">email</i>
								</div>
							</div>
							<div className="mt-3 py-10 border-t border-blueGray-200 text-center">
								<div className="flex flex-wrap justify-center">
									<div className="w-full lg:w-11/12 px-4">
										<div className=' pb-4 border-4  border-indigo-300 mb-4'>
											<p className="mb-4 text-2xl font-bold leading-relaxed text-blue-100 ">
												Assigned Bugs
											</p>
											<p>Bugs....</p>
										</div>
										<div className='pb-4 border-4  border-indigo-300'>
											<p className="mb-4 text-2xl font-bold leading-relaxed text-blue-100 ">
												Created Bugs
											</p>
											<p>Bugs....</p>
										</div>
										
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				</section>
				
    </>
  )
}

export default UserListItem

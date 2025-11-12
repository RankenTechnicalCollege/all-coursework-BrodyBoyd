import { useState } from 'react'

import './App.css'

function BugListItem() {
	
  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-3 pt-10 bg-blue-300 overflow-auto h-screen">
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
								<h3 className="text-4xl font-bold leading-normal text-gray-50 mb-2">
									title
								</h3>
								<div className="text-sm leading-normal mt-0 mb-2 text-gray-50 font-bold uppercase">
									<i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400">author username</i>
								</div>
								<div className="text-sm leading-normal mt-0 mb-2 text-gray-50 font-bold uppercase">
									<i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400">description</i>
								</div>
								<div className="text-sm leading-normal mt-0 mb-2 text-gray-50 font-bold uppercase">
									<i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400">steps to reproduce</i>
								</div>
								<div className="text-sm leading-normal mt-0 mb-2 text-gray-50 font-bold uppercase">
									<i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400">Classification</i>
								</div>
								<div className="text-sm leading-normal mt-0 mb-2 text-gray-50 font-bold uppercase">
									<i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400">creation date</i>
								</div>
								<div className="text-sm leading-normal mt-0 mb-2 text-gray-50 font-bold uppercase">
									<i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400">Fixed: (true or false)</i>
								</div>
								{/* impliment a (if true) then the fixed in version is here */}
							</div>
							<div className="mt-3 py-10 border-t border-blueGray-200 text-center">
								<div className="flex flex-wrap justify-center">
									<div className="w-full lg:w-11/12 px-4">
										<div className=' pb-4 border-4  border-indigo-300 mb-4'>
											<p className="mb-4 text-2xl font-bold leading-relaxed text-blue-100 ">
												Edits
											</p>
											<p>edits....</p>
										</div>
										<div className='pb-4 border-4  border-indigo-300 mb-4'>
											<p className="mb-4 text-2xl font-bold leading-relaxed text-blue-100 ">
												Comments
											</p>
											<p>comments....</p>
										</div>
										<div className=' pb-4 border-4  border-indigo-300 mb-4'>
											<p className="mb-4 text-2xl font-bold leading-relaxed text-blue-100 ">
												TestCases
											</p>
											<p>testcases....</p>
										</div>
										<div className='pb-4 border-4  border-indigo-300'>
											<p className="mb-4 text-2xl font-bold leading-relaxed text-blue-100 ">
												Work Log
											</p>
											<p>work log hours....</p>
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

export default BugListItem

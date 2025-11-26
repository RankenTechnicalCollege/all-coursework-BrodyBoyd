import { Link } from 'react-router-dom';


function BugListItem({ bug }: any) {
  const currentBug = bug;
	
	const fixedStatus = bug.closed ? 'True' : 'False';

  return (
    <>
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
									{bug.title}
								</h3>
								<div className="text-sm leading-normal mt-0 mb-2 text-gray-50 font-bold uppercase">
									<i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400">{bug.createdBy}</i>
								</div>
								<div className="text-sm leading-normal mt-0 mb-2 text-gray-50 font-bold uppercase">
									Description: 
									<i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400">{bug.description}</i>
								</div>
								<div className="text-sm leading-normal mt-0 mb-2 text-gray-50 font-bold uppercase">
									Steps to Reproduce: 
									<i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400">{bug.stepsToReproduce}</i>
								</div>
								<div className="text-sm leading-normal mt-0 mb-2 text-gray-50 font-bold uppercase">
									Classification: 
									<i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400">{bug.classification}</i>
								</div>
								<div className="text-sm leading-normal mt-0 mb-2 text-gray-50 font-bold uppercase">
									creationDate: 
									<i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400">{bug.dateOfCreation}</i>
								</div>
								<div className="text-sm leading-normal mt-0 mb-2 text-gray-50 font-bold uppercase">
									<i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400">Fixed: {fixedStatus}</i>
								</div>
								{/* impliment a (if true) then the fixed in version is here */}
							</div>
							<div className="mt-3 py-10 border-t border-blueGray-200 text-center">
								<div className="flex flex-wrap justify-center">
									<div className="w-full lg:w-11/12 px-4">
										<div className='pb-4 border-4  border-indigo-300 mb-4'>
											<p className="mb-4 text-2xl font-bold leading-relaxed text-blue-100 ">
												Comments
											</p>
											<p className='text-white'>
												{Array.isArray(bug.comments) && bug.comments.length > 0 ? (
													bug.comments.map((comment: any, idx: number) => (
														<div key={comment._id || idx} className="mb-2 text-white">
															<p className="font-semibold text-blue-200">{comment.author}</p>
															<p className="italic">{comment.text}</p>
															<p className="text-sm text-gray-400">
																{new Date(comment.createdAt).toLocaleString()}
															</p>
														</div>
													))
												) : (
													<p className="text-gray-400">No comments available.</p>
												)}
											</p>
										</div>
										<div className=' pb-4 border-4  border-indigo-300 mb-4'>
											<p className="mb-4 text-2xl font-bold leading-relaxed text-blue-100 ">
												TestCases
											</p>
											<p className='text-white'>
												{Array.isArray(bug?.testcase) && bug.testcase.length > 0 ? (
													bug.testcase.map((result: any, idx: number) => (
														<p key={idx} className="text-white">
															{result.title}:{' '}
															<span className={result.status === 'passed' ? 'text-green-400' : 'text-red-400'}>
																{result.status}
															</span>
															<p>{result.description}</p>
															<hr/>
														</p>
													))
												) : (
													<p className="text-gray-400">No test cases available.</p>
												)}
											</p>
										</div>
										<div className='pb-4 border-4  border-indigo-300'>
											<p className="mb-4 text-2xl font-bold leading-relaxed text-blue-100 ">
												Work Log
											</p>
											<p className='text-white'>
												{Array.isArray(bug.workHoursLog) && bug.workHoursLog.length > 0 ? (
												<div className="text-white space-y-1">
													{bug.workHoursLog.map((hours: number, idx: number) => (
														<p key={idx}>Entry {idx + 1}: {hours} hour{hours !== 1 ? 's' : ''}</p>
													))}
													<p className="mt-2 font-bold text-blue-300">
														Total Hours: {bug.workHoursLog.reduce((sum: number, h: number) => sum + h, 0)}
													</p>
												</div>
												) : (
													<p className="text-gray-400">No work hours logged.</p>
												)}
												</p>
											</div>
										
									</div>
                  <div className='mt-4 hover:-translate-y-1 ease-in-out transition'>
									<Link to='/BugEditor' state={{bug: currentBug}} ><span className="justify-center text-white border-gray-50/50 border-3 w-10/12 mt-5  bg-purple-600/30 p-2 rounded-2xl transition hover:bg-purple-400/50 ">Edit Bug</span></Link>
								</div>
								</div>
							</div>
						</div>
					</div>
				</div>
    </>
  )
}

export default BugListItem


import { useNavigate  } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

// type Bug = {
// 	title: string,
// 	authorUsername: string,
//   authorEmail: string,
//   description: string,
//   stepsToReproduce: string,
// 	classification: string,
// 	creationDate: string,
//   fixed: boolean
// }

// type Props = {
// 	user: User
// }

function BugEditor() {
  const [title, setTitle] = useState('');
  // const [authorUsername, setAuthorUsername] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [bugDescription, setBugDescription] = useState('');
  const [stepsToReproduce, setStepsToReproduce] = useState('');
  const [classification, setClassification] = useState('');
  const [fixedStatus, setFixedStatus] = useState(false);
  const [testCaseTitle, setTestCaseTitle] = useState('');
  const [testcaseStatus, setTestcaseStatus] = useState('');
  const [testcaseDescription, setTestcaseDescription] = useState('');
  const [commentText, setCommentText] = useState('');
  const [logHours, setLogHours] = useState('');


  const navigate = useNavigate();

	const location = useLocation();
  const bug = (location.state as { bug: any }).bug;

  function handleSubmit() {
    console.log(title, fixedStatus, authorEmail)
    navigate('/BugList');

  }
  console.log(bug)
  return (
    <>
    <section className="py-40 bg-blue-100  bg-opacity-50 h-full">
      <div className="mx-auto container max-w-2xl md:w-3/4 shadow-md">
        <div className="bg-gray-200 p-4 border-t-2 bg-opacity-5 border-indigo-400 rounded-t">
          <div className="max-w-sm mx-auto md:w-full md:mx-0">
            <div className="inline-flex items-center space-x-4">
            
              <h1 className="text-gray-800">{bug.title}s</h1>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
        <div className="bg-white space-y-6">  
          <div className="md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-gray-500 items-center">
            <h2 className="md:w-1/3 mx-auto max-w-sm text-gray-800">Bug Info</h2>
            <div className="md:w-2/3 mx-auto max-w-sm space-y-5">
              <div>
                <label className="text-sm text-gray-800">Title</label>
                <div className="w-full inline-flex border">
                  <div className="w-1/12 pt-2 bg-gray-100">
                  </div>
                  <input
                    type="text"
                    className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    placeholder={bug.title}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-800">Author Email</label>
                <div className="w-full inline-flex border">
                  <div className="w-1/12 pt-2 bg-gray-100">
                  </div>
                  <input
                    type="text"
                    className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    placeholder={bug.createdBy}
                    value={authorEmail}
                    onChange={(e) => setAuthorEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-800">Description</label>
                <div className="w-full inline-flex border">
                  <div className="w-1/12 pt-2 bg-gray-100">
                  </div>
                  <input
                    type="text"
                    className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    placeholder={bug.description}
                    value={bugDescription}
                    onChange={(e) => setBugDescription(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-800">Steps To Reproduce</label>
                <div className="w-full inline-flex border">
                  <div className="w-1/12 pt-2 bg-gray-100">
                  </div>
                  <input
                    type="text"
                    className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    placeholder={bug.stepsToReproduce}
                    value={stepsToReproduce}
                    onChange={(e) => setStepsToReproduce(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-800">Classificaition</label>
                <div className="w-full inline-flex border">
                  <div className="w-1/12 pt-2 bg-gray-100">
                  </div>
                  <input
                    type="text"
                    className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    placeholder={bug.classification}
                    value={classification}
                    onChange={(e) => setClassification(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-800">Fixed</label>
                <div className="w-48 bg-neutral-primary-soft border border-default rounded-base">
                  <ul className="w-48 bg-neutral-primary-soft border border-default rounded-base">
                    <li className="w-full border-b border-default">
                        <div className="flex items-center ps-3">
                            <input id="list-radio-license" type="radio" onClick={() => setFixedStatus(true)} value="" name="list-radio" className="w-4 h-4 checked:bg-blue-500 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none"/>
                            <label htmlFor="list-radio-license" className="w-full py-3 select-none ms-2 text-sm font-medium text-heading">True </label>
                        </div>
                    </li>
                    <li className="w-full border-b border-default">
                        <div className="flex items-center ps-3">
                            <input id="list-radio-id" type="radio" onClick={() => setFixedStatus(false)} value="" name="list-radio" className="w-4 h-4 checked:bg-blue-500 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none"/>
                            <label htmlFor="list-radio-id" className="w-full py-3 select-none ms-2 text-sm font-medium text-heading">False</label>
                        </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="md:w-3/12 text-center md:pl-6">
              <button type='submit' className="text-white w-full mx-auto max-w-sm rounded-md text-center bg-indigo-400 py-2 px-4 inline-flex items-center focus:outline-none md:float-right hover:cursor-pointer">
                <svg
                  fill="none"
                  className="w-4 text-white mr-2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Update
              </button>
            </div>
          </div>
          <hr/>
          <div className="md:inline-flex w-full space-y-4 md:space-y-0 p-8 text-gray-500 items-center">
            <h2 className="md:w-4/12 max-w-sm mx-auto text-gray-800">Create Testcase</h2>
            <div className="md:w-2/3 mx-auto max-w-sm space-y-5">
              <div>
                <label className="text-sm text-gray-800">Title</label>
                <div className="w-full inline-flex border">
                  <div className="w-1/12 pt-2 bg-gray-100">
                  </div>
                  <input
                    type="text"
                    className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    placeholder='Title'
                    value={testCaseTitle}
                    onChange={(e) => setTestCaseTitle(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm text-gray-800">Status</label>
                <div className="w-full inline-flex border">
                  <div className="pt-2 w-1/12 bg-gray-100">
                  </div>
                  <input
                    type="text"
                    className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    placeholder='Status'
                    value={testcaseStatus}
                    onChange={(e) => setTestcaseStatus(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-800">Description</label>
                <div className="w-full inline-flex border">
                  <div className="w-1/12 pt-2 bg-gray-100">
                  </div>
                  <input
                    type="text"
                    className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    placeholder='Description'
                    value={testcaseDescription}
                    onChange={(e) => setTestcaseDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="md:w-3/12 text-center md:pl-6">
              <button type='submit' className="text-white w-full mx-auto max-w-sm rounded-md text-center bg-indigo-600 py-2 px-4 inline-flex items-center focus:outline-none md:float-right hover:cursor-pointer">
                Add Testcase
              </button>
            </div>
          </div>
          <hr />
          <div className="md:inline-flex w-full space-y-4 md:space-y-0 p-8 text-gray-500 items-center">
            <h2 className="md:w-4/12 max-w-sm mx-auto text-gray-800">Create Comment</h2>
            <div className="md:w-2/3 mx-auto max-w-sm space-y-5">
              <div>
                <label className="text-sm text-gray-800">Comment</label>
                <div className="w-full inline-flex border">
                  <div className="w-1/12 pt-2 bg-gray-100">
                  </div>
                  <input
                    type="text"
                    className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    placeholder='Text'
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="md:w-3/12 text-center md:pl-6">
              <button type='submit' className="text-white w-full mx-auto max-w-sm rounded-md text-center bg-indigo-600 py-2 px-4 inline-flex items-center focus:outline-none md:float-right hover:cursor-pointer">
                Add comment
              </button>
            </div>
          </div>
          <hr />
          <div className="md:inline-flex w-full space-y-4 md:space-y-0 p-8 text-gray-500 items-center">
            <h2 className="md:w-4/12 max-w-sm mx-auto text-gray-800">Work Log Hours</h2>
            <div className="md:w-2/3 mx-auto max-w-sm space-y-5">
              <div>
                <label className="text-sm text-gray-800">Log Hours</label>
                <div className="w-full inline-flex border">
                  <div className="w-1/12 pt-2 bg-gray-100">
                  </div>
                  <input
                    type="text"
                    className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    placeholder='Hours'
                    value={logHours}
                    onChange={(e) => setLogHours(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="md:w-3/12 text-center md:pl-6">
              <button type='submit' className="text-white w-full mx-auto max-w-sm rounded-md text-center bg-indigo-600 py-2 px-4 inline-flex items-center focus:outline-none md:float-right hover:cursor-pointer">
                Log Hours
              </button>
            </div>
          </div>
          <hr />
          <div className="w-full p-4 text-right text-gray-500">
            <button className=" inline-flex items-center focus:outline-none mr-4 text-gray-800">
              <svg
                fill="none"
                className="w-4 mr-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete account
            </button>
          </div>
        </div>
      </form>
      </div>
    </section>
    </>
  )
}

export default BugEditor

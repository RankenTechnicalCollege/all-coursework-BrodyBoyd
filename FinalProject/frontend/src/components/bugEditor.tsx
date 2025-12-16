import { useNavigate  } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import bugEditSchema from '../schemas/bugEditSchema'
import {z} from 'zod';
import api from '../api';
import { Trash2 } from 'lucide-react';

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
interface BugUpdate {
  authorEmail?: string;
  title?: string;
  description?: string;
  stepsToReproduce?: string;
  classification?: string;
  fixedStatus?: boolean;
}

function BugEditor({ showError, showSuccess }: { showError: (message: string) => void; showSuccess: (message: string) => void }) {
  const [title, setTitle] = useState('');
  // const [authorUsername, setAuthorUsername] = useState('');
  const [description, setDescription] = useState('');
  const [stepsToReproduce, setStepsToReproduce] = useState('');
  const [classification, setClassification] = useState('');
  const [testCaseTitle, setTestCaseTitle] = useState('');
  const [testcaseStatus, setTestcaseStatus] = useState('');
  const [testcaseDescription, setTestcaseDescription] = useState('');
  const [commentText, setCommentText] = useState('');
  const [loggedHours, setLoggedHours] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [selectedValue, setSelectedValue] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState("");



  const navigate = useNavigate();
 
	const location = useLocation();
  const bug = (location.state as { bug: any }).bug;
  const bugId = bug._id

  useEffect(() => {
    if (bug) {
      if (bug.title) setTitle(bug.title);
      if (bug.description) setDescription(bug.description);
      if (bug.stepsToReproduce) setStepsToReproduce(bug.stepsToReproduce);
      if (bug.classification) setClassification(bug.classification);
      if (typeof bug.closed !== 'undefined') setSelectedValue(bug.closed ? 'true' : 'false');
      if (bug.assignedToUserEmail) setSelectedUser(bug.assignedToUserEmail)
    }
    const fetchInfo = async () => {
      const userResponse = await fetch('/api/user?limit=100000');
    if (!userResponse.ok) throw new Error('Failed to fetch bugs');
    const users = await userResponse.json();
    const allowedRoles = [
      "developer",
      "business analyst",
      "quality analyst"
    ];

    const filteredUsers = users.filter((user: { role: string[]; }) =>
      Array.isArray(user.role) &&
      user.role.some((r: string) => allowedRoles.includes(r))
    );
    setUsers(filteredUsers)
    }
    fetchInfo();
    }, [bug]);

  const deleteTestcase = async (testcaseId: any) => {
		try {
			await api.delete(`/api/bug/${bugId}/tests/${testcaseId}`);
		} catch (error) {
			console.error('Error deleting testcase:', error);
		}
		console.log('Delete testcase clicked');
		window.location.reload();
	}



const handleSubmit = async () => {
    const updatedData: BugUpdate = {};

  try {
    if (title !== '') updatedData.title = title;
    if (description !== '') updatedData.description = description;
    if (stepsToReproduce !== '') updatedData.stepsToReproduce = stepsToReproduce;
    const validatedData = bugEditSchema.parse(updatedData);
    await api.patch(`/api/bug/${bugId}`, validatedData);
    showSuccess("Bug updated successfully");
    navigate('/BugList');
    
  } catch (err) {
    if (err instanceof z.ZodError) {
            const fieldErrors: Record<string, string> = {};
            err.issues.forEach((issue) => {
              if (issue.path.length > 0) {
                fieldErrors[issue.path[0] as string] = issue.message;
              }
            });
            setValidationErrors(fieldErrors);
            return;
          }
    showError("Failed to update Bug");
    console.error("Error updating profile:", err);
  }
};

const addComment = async () => {
  try {
    console.log(selectedUser)
    const text = commentText;
    await api.post(`/api/bug/${bugId}/comments`, { text });
    navigate('/BugList');
    window.location.reload();
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};
//add zod validation ^

const logHours = async () => {
  try {
    const time = Number(loggedHours);
    await api.patch(`/api/bug/${bugId}/worklog`, { time });
    navigate('/BugList');
    window.location.reload();
  } catch (error) {
    console.error("Error logging hours:", error);
  }
}
//add zod validation ^

const addTestcase = async () => {
  try {
    const data = {title: testCaseTitle, status: testcaseStatus, description: testcaseDescription};
    await api.post(`/api/bug/${bugId}/tests`, data);
    navigate('/BugList');
    window.location.reload();
  } catch (error) {
    console.error("Error adding testcase:", error);
  }
}
//add zod validation ^

const classifyBug = async () => {
  try {
    const checkClassify = classification.toLowerCase()
    if (checkClassify === 'approved' || checkClassify === 'unapproved' || checkClassify === 'duplicate'){
      const data = {classification: classification};
      const closed = selectedValue === "true" ? true : false;
      await api.patch(`/api/bug/${bugId}/classify`, data);
      await api.patch(`/api/bug/${bugId}`, {closed: closed});
      navigate('/BugList');
      window.location.reload();
    } else {
      showError("Classification Type Not Allowed, try Approved, Unapproved, or Duplicate");
    }
  } catch (error) {
    console.error("Error classifying bug:", error);
  }
}


  const assignUser = async () => {
    try {
      await api.patch(`/api/bug/${bugId}/assign`, { assignedToUserEmail: selectedUser });
      navigate('/BugList');
      window.location.reload();
    } catch (error) {
      console.error("Error assigning user:", error);
    }
  }

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
        <div className="bg-white space-y-6">  
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
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
                    // placeholder={bug.title}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                {validationErrors.title && (
                <p className="text-sm text-red-500">{validationErrors.title}</p>
              )}
              </div>
              <div>
                <label className="text-sm text-gray-800">Description</label>
                <div className="w-full inline-flex border">
                  <div className="w-1/12 pt-2 bg-gray-100">
                  </div>
                  <input
                    type="text"
                    className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    // placeholder={bug.description}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                {validationErrors.description && (
                <p className="text-sm text-red-500">{validationErrors.description}</p>
              )}
              </div>
              <div>
                <label className="text-sm text-gray-800">Steps To Reproduce</label>
                <div className="w-full inline-flex border">
                  <div className="w-1/12 pt-2 bg-gray-100">
                  </div>
                  <input
                    type="text"
                    className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    // placeholder={bug.stepsToReproduce}
                    value={stepsToReproduce}
                    onChange={(e) => setStepsToReproduce(e.target.value)}
                  />
                </div>
                {validationErrors.stepsToReproduce && (
                <p className="text-sm text-red-500">{validationErrors.stepsToReproduce}</p>
              )}
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
          </form>
          <hr/>
          
    <div className="md:inline-flex w-full space-y-4 md:space-y-0 p-8 text-gray-500 items-center">
            <h2 className="md:w-4/12 max-w-sm mx-auto text-gray-800">Assign to user</h2>
            <div className="md:w-2/3 mx-auto max-w-sm space-y-5">
            <div className="relative inline-flex">
            <svg className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero"/></svg>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
            >
              <option value="">Choose a user</option>

              {users.map((user) => (
                <option key={user._id} value={user.email}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>

          </div>
            </div>
            <div className="md:w-3/12 text-center md:pl-6">
              <button type='button' onClick={() => assignUser()} className="text-white w-full mx-auto max-w-sm rounded-md text-center bg-indigo-600 py-2 px-4 inline-flex items-center focus:outline-none md:float-right hover:cursor-pointer">
                Assign
              </button>
            </div>
          </div>
          <hr/>
          <div className="md:inline-flex w-full space-y-4 md:space-y-0 p-8 text-gray-500 items-center">
            <h2 className="md:w-4/12 max-w-sm mx-auto text-gray-800">Classification</h2>
            <div className="md:w-2/3 mx-auto max-w-sm space-y-5">
              <div>
                <label className="text-sm text-gray-800">Classificaition</label>
                <div className="w-full inline-flex border">
                  <div className="w-1/12 pt-2 bg-gray-100">
                  </div>
                  <input
                    type="text"
                    className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    placeholder='approved/unapproved/duplicate'
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
                        <input
                          id="list-radio-true"
                          type="radio"
                          value="true"
                          name="list-radio"
                          checked={selectedValue === "true"}
                          onChange={(e) => setSelectedValue(e.target.value)}
                          className="w-4 h-4 checked:bg-blue-500 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none"
                        />
                        <label
                          htmlFor="list-radio-true"
                          className="w-full py-3 select-none ms-2 text-sm font-medium text-heading"
                        >
                          True
                        </label>
                      </div>
                    </li>
                    <li className="w-full border-b border-default">
                      <div className="flex items-center ps-3">
                        <input
                          id="list-radio-false"
                          type="radio"
                          value="false"
                          name="list-radio"
                          checked={selectedValue === "false"}
                          onChange={(e) => setSelectedValue(e.target.value)}
                          className="w-4 h-4 checked:bg-blue-500 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none"
                        />
                        <label
                          htmlFor="list-radio-false"
                          className="w-full py-3 select-none ms-2 text-sm font-medium text-heading"
                        >
                          False
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="md:w-3/12 text-center md:pl-6">
              <button type='submit' onClick={() => classifyBug()} className="text-white w-full mx-auto max-w-sm rounded-md text-center bg-indigo-600 py-2 px-4 inline-flex items-center focus:outline-none md:float-right hover:cursor-pointer">
                Change Classification
              </button>
            </div>
          </div>
          <hr/>
          {Array.isArray(bug?.testcase) && bug.testcase.length > 0 ? (
              bug.testcase.map((result: any, idx: number) => (
                <div className="space-y-4 max-w-11/12 " key={idx}>
                  <div className="flex">
                    <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                      <strong>{result.title}:{' '}</strong> <span className={result.status === 'passed text-xs' ? 'text-green-400 text-xs' : 'text-red-400 text-xs' }>
                      {result.status}
                    </span>
                      <p className="text-sm">
                        {result.description}
                      </p>
                      <button
                      type="button"
                      onClick={() => deleteTestcase(result._id)}
                      aria-label={`Delete testcase ${result.title || ''}`}
                      title="Delete testcase"
                      className="p-1 rounded cursor-pointer hover:bg-red-600/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <Trash2 size={18} color="#FF0000" />
                    </button>
                  </div>
                </div>
              </div>
              ))
            ) : (
              <p className="text-gray-400">No test cases available.</p>
            )}
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
                    placeholder='passed or failed'
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
              <button onClick={() => addTestcase()} type='submit' className="text-white w-full mx-auto max-w-sm rounded-md text-center bg-indigo-600 py-2 px-4 inline-flex items-center focus:outline-none md:float-right hover:cursor-pointer">
                Add Testcase
              </button>
            </div>
          </div>
          <hr />
          <h1 className='pl-5'>Comments:</h1>
          <div className='items-center'>
          {Array.isArray(bug.comments) && bug.comments.length > 0 ? (
            bug.comments.map((comment: any, idx: number) => (
                <div className="space-y-4 max-w-11/12 " key={comment._id || idx}>
                  <div className="flex">
                    <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                      <strong>{comment.author}</strong> <span className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleString()}</span>
                      <p className="text-sm">
                        {comment.text}
                      </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No comments available.</p>
          )}
          </div>
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
              <button type='button' onClick={() => addComment()} className="text-white w-full mx-auto max-w-sm rounded-md text-center bg-indigo-600 py-2 px-4 inline-flex items-center focus:outline-none md:float-right hover:cursor-pointer">
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
                    value={loggedHours}
                    onChange={(e) => setLoggedHours(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="md:w-3/12 text-center md:pl-6">
              <button onClick={() => logHours()} type='submit' className="text-white w-full mx-auto max-w-sm rounded-md text-center bg-indigo-600 py-2 px-4 inline-flex items-center focus:outline-none md:float-right hover:cursor-pointer">
                Log Hours
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default BugEditor

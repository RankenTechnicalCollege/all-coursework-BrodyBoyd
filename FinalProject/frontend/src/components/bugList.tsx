import BugListItem from './bugListItem';
// import { authClient } from '../auth-client'
import { useEffect, useState } from 'react';
// type Bug = {
// 	title: string,
// 	authorUsername: string,
//   authorEmail: string,
//   description: string,
//   stepsToReproduce: string,
// 	classification: string,
// 	creationDate: string,
//   closed: boolean


// }

function BugList() {
  const [bugs, setBugs] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<Error | null>(null);

const fetchBugs = async () => {
  const response = await fetch('/api/bug');
  if (!response.ok) throw new Error('Failed to fetch bugs');
  return response.json();
};

  // const { 
  //       // data: session, 
  //       isPending: sessionPending, //loading state
  //   } = authClient.useSession()

  useEffect(() => {
    fetchBugs()
      .then(data => setBugs(data))
      .catch(err => setError(err))
      .finally(() => setIsPending(false));
  }, []);

  if (isPending) {
    return <div>Loading bugs...</div>;
  }

  if (error) {
    return <div>Error loading bugs: {error.message}</div>;
  }
  return (
    <>
			<section className="flex flex-col text-center align-middle pt-16 bg-blue-300 overflow-auto min-h-screen border-2 border-black">
				<div>
					<p className='align-center text-7xl text-gray-800 font-black pb-6'>All Bugs</p>
				</div>
        <section className="grid grid-cols-1 lg:grid-cols-3 pt-16 bg-blue-300 overflow-auto h-screen">
          {bugs.map((bug: any) => (
            <BugListItem bug={bug}></BugListItem>
          ))}
        </section>
			</section>
				
    </>
  )
}

export default BugList

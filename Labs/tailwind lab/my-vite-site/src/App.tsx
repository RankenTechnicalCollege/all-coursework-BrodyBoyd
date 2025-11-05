import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="p-2 m-1 border-b-4 border-l-15 border-t-19 text-brody">Test Text</h1>
      <h1 className="text-yellow-600">Test Text</h1>
      <h1 className="text-xs sm:text-base md:text-lg lg:text-3xl">Test Text</h1>
      <hr></hr>
      <br></br>
      <div className='flex flex-col space-y-4  '>
        <p className=' bg-brody w-1/6'>This is a long sentence</p>
        <p className=' bg-red-500 w-5/6 '>This is another long sentence</p>
      </div>
      <hr></hr> 
      <br></br>
      {/* Im litterly just adding every single thing he does in the video */}
      <div className=''>
        <h1 className='text-3xl italic mb-4'>Title 1</h1>
        <h2 className='text-2xl mb-3'>Title 2</h2>
        <h3 className='text-xl mb-2'>Title 3</h3>
        <p className=' mb-1 text-base underline decoration-red-500 decoration-wavy decoration-1 underline-offset-4 leading-snug lowercase'>A regular Paragraph</p>
        <p className='text-sm'>A description paragraph</p>
        <p className='text-xs note'>A little note</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel ornare tortor. Curabitur velit ligula, fringilla at mi sed, eleifend elementum leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec at mi a libero finibus aliquet. Praesent vitae ex mi. Maecenas pulvinar tellus nibh, et viverra ipsum viverra sit amet</p>
      </div>
      <hr></hr> 
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className='container mx-auto px-2 columns-lg bg-amber-50'> 
        <div>Header</div>
        <div className="flex items-baseline ">
          <div className=' bg-sky-300 pt-2 pb-4'> sidebar</div>
          <div className=' bg-red-400 pt-5 pb-2'>Main content</div>
          <div className=' bg-green-400 pb-12 pt-8'>other content</div>
        </div>
      </div>
      <hr></hr> 
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className=''>
        <div className="grid lg:grid-cols-6 md:grid-cols-2 gap-2 grid-cols-max">
          <div className='bg-sky-500 p-6 rounded-lg col-span-4 col-start-2 blur-xs hover:blur-none sepia'>First Column</div>
          <div className='bg-sky-500 p-6 rounded-lg col-start-1 col-end-3 brightness-200 hover:brightness-100'>Second Column</div>
          <div className='bg-sky-500 p-6 rounded-lg col-span-2 col-end-7 invert backdrop-blur-md'>third Column</div>
          <div className='bg-red-500 p-6 rounded-lg col-start-1 col-end-7 saturate-125'>fourth Column</div>
        </div>
      </div>
      <hr></hr> 
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className=''>
        <div className="grid grid-flow-row-dense lg:grid-rows-4 lg:grid-cols-3 gap-4">
          {/* GRID FLOW IS HOW YOU MAKE IT FILL EMPTY SPACES, POTENTIALLY ADD TO PARLAY HELPER */}
          <div className='bg-green-500 p-6 rounded-lg lg:row-span-2'>1</div>
          <div className='bg-amber-500 p-6 rounded-lg '>2</div>
          <div className='bg-cyan-400 p-6 rounded-lg '>3</div>
          <div className='bg-red-500 p-6 rounded-lg lg:row-span-3'>4</div>
          <div className='bg-brody p-6 rounded-lg lg:row-span-3'>5</div>
          <div className='bg-violet-300 p-6 rounded-lg '>6</div>
          <div className='bg-sky-500 p-6 rounded-lg lg:col-span-3'>7</div>
          <div className='bg-red-500 p-6 rounded-lg lg:row-span-2'>8</div>
          <div className='bg-sky-500 p-6 rounded-lg '>9</div>
          <div className='bg-sky-500 p-6 rounded-lg '>10</div>
          <div className='bg-sky-500 p-6 rounded-lg '>11</div>
          <div className='bg-red-500 p-6 rounded-lg '>12</div>
        </div>
      </div>
      <hr></hr>
       <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="grid grid-flow-row-dense grid-rows-2 grid-cols-4 gap-4 h-100">
          {/* GRID FLOW IS HOW YOU MAKE IT FILL EMPTY SPACES, POTENTIALLY ADD TO PARLAY HELPER */}
          <div className='bg-green-500 p-6 rounded-lg col-span-1'>1</div>
          <div className='bg-amber-500 p-6 rounded-lg col-span-1'>2</div>
          <div className='bg-cyan-400 p-6 rounded-lg col-span-1'>3</div>
          <div className='bg-red-500 p-6 rounded-lg col-span-3'>4</div>
          <div className='bg-red-500 p-6 rounded-lg row-span-2'>5</div>

        </div>
      <hr></hr>
       <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="h-screen text-white bg-slate-900 parent">
        <div className='container flex'>
          <div className='bg-red-500 z-40 p-3 border rounded-full border-white'>5</div>
          <div className='bg-red-500 z-30 p-3 border rounded-full border-white'>4</div>
          <div className='bg-red-500 z-30 p-3 border rounded-full border-white'>3</div>
          <div className='bg-red-500 z-10 p-3 border rounded-full border-white'>2</div>
          <div className='bg-red-500 z-0 p-3 border rounded-full border-white'>1</div>
        </div>
      </div>
        <div className=" divide-y  divide-red-400">
          <div className='m-4 shadow-xl shadow-red-900/50 '> sidebar</div>
          <div className=' '>Main content</div>
          <div className=' '>other content</div>
        </div>

        <div className="p-5">
          <input type="text" className='border-2 border-rose-600 border-dashed outline-none'></input>
        </div>
        <hr></hr>
       <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className='flex justify-center items-center '>
        <button className='hover:animate-none animate-bounce scale-150 px-3 py-2 cursor-pointer transition delay-75 shadow-md ease-in-out bg-cyan-500 shadow-cyan-500/50 rounded-3xl hover:-translate-y-1' type='button'>
          Hover me
        </button>
      </div>
    </>
  )
}

export default App

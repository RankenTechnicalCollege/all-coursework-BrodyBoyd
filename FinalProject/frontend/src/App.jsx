import { useState } from 'react'


import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
      </head>
      <header>
        <nav className="navbar navbar-expand-lg bg-body-tertiary border border-black">
          <div className="container-fluid">
            <a className="navbar-brand link" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link link active" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link link" href="https://issuetracker-service-627308096057.us-central1.run.app/api/user">Users</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link link" href="https://issuetracker-service-627308096057.us-central1.run.app/api/bug">Bugs</a>
                </li>
              </ul>
              
            </div>
            <p class='bugTracker'>Bug Tracker - Brody Boyd</p>
          </div>
          
        </nav>
    </header>
    
    <main>
      <div class="text-center">
  <div class="bothCards">
    <div class="card  p-3 text-center">
      <h1>Users:</h1>
      <br/>
      <p id="users"></p>
      <a className='link' href='https://issuetracker-service-627308096057.us-central1.run.app/api/user/68c9a770ac64765bdb74516f'>Matt Timm</a>
      <br/>
      <a className='link' href='https://issuetracker-service-627308096057.us-central1.run.app/api/user/68c9a786ac64765bdb745170'>Jonathon Archibald IV</a>
      <br/>
      <a className='link' href='https://issuetracker-service-627308096057.us-central1.run.app/api/user/68d5951eb24a3ba847696c2c'>Gurt Boyd</a>
    </div>
    <div className="card  p-3 text-center">
      <h1>Bugs:</h1>
      <br/>
      <a className='link' href='https://issuetracker-service-627308096057.us-central1.run.app/api/bug/68c87fbfac64765bdb745168'>Homescreen Glitch</a>
      <br/>
      <a className='link' href='https://issuetracker-service-627308096057.us-central1.run.app/api/bug/68c87fbfac64765bdb745167'>Login Button does not work</a>
      <br/>
      <a className='link' href='https://issuetracker-service-627308096057.us-central1.run.app/api/bug/68c9a832ac64765bdb745171'>Screen Colors Inverted</a>
    </div>
  </div>
</div>
    </main>

    <footer className="footer align-items-center border-top bg-dark">
      <p className="text-center text-white">&copy;2025 Brody Boyd</p>
    </footer>
    </>
  )
}

export default App

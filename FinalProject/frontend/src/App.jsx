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
        <nav class="navbar navbar-expand-lg bg-body-tertiary border border-black">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="http://localhost:2025/api/user/list">Users</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="http://localhost:2025/api/bug/list">Bugs</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    </header>
    
    <main>
      <div class="container text-center">
  <div class="row">
    <div class="col border border-black">
      <h1>Users:</h1>
      <br/>
      <p id="users"></p>
      <a href='http://localhost:2025/api/user/1'>John Cena</a>
      <br/>
      <a href='http://localhost:2025/api/user/2'>Randy Orton</a>
      <br/>
      <a href='http://localhost:2025/api/user/3'>Big Show</a>
    </div>
    <div class="col border border-black">
      <h1>Bugs:</h1>
      <br/>
      <a href='http://localhost:2025/api/bug/1'>SYSTEM IS BROKEN</a>
      <br/>
      <a href='http://localhost:2025/api/bug/2'>Clicking log in buys 4 years worth of disney+</a>
      <br/>
      <a href='http://localhost:2025/api/bug/3'>Click does not work</a>
    </div>
  </div>
</div>
    </main>

    <footer class=" align-items-center py-3 my-4 border-top bg-dark">
      <p class="text-center text-white">&copy;2025 Brody Boyd</p>
    </footer>
    </>
  )
}

export default App

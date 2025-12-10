import { Routes, Route,  } from 'react-router-dom';
import HomePage from './components/homePage';
import Login from './components/Login';
import Register from './components/Register';
import { ToastContainer } from 'react-toastify';
function App() {

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
      </Routes>
    </>  
  )
}

export default App

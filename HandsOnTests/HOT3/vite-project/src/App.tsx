import { Routes, Route,  } from 'react-router-dom';
import HomePage from './components/homePage';
import Login from './components/Login';
import Register from './components/Register';
import { ToastContainer } from 'react-toastify';
import UserPage from './components/UserPage';
import YourAccount from './components/YourAccount';
import ProductEditor from './components/ProductEditor';
import AddProductPage from './components/AddProductPage';
function App() {

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/UserPage' element={<UserPage />} />
        <Route path='/YourAccount' element={<YourAccount />} />
        <Route path='/ProductEditor' element={<ProductEditor />} />
        <Route path='/AddProductPage' element={<AddProductPage /> } />
      </Routes>
    </>  
  )
}

export default App

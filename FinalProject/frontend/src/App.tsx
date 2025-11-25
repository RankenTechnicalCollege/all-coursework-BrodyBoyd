import { Routes, Route, useNavigate  } from 'react-router-dom';
// import { useEffect, useState } from 'react';
import Home from './components/home'
import BugList from './components/bugList';
import UserList from './components/userList';
import Login from './components/login';
import Register from './components/registerPage';
import UserEditor from './components/UserEditor';
import BugEditor from './components/bugEditor';
import './App.css'
import Navbar from './components/Navbar';
import {authClient} from './auth-client.ts'
import Footer from './components/Footer.tsx';
import { ToastContainer} from 'react-toastify'

function App() {
	const navigate = useNavigate();

// 	function showError(message) {
//   toast(message, { type: 'error', position: 'bottom-right' });
// }
// function showSuccess(message) {
//   toast(message, { type: 'success', position: 'bottom-right' });
// }

	const onLogout = async () => {
    await authClient.signOut();
    navigate("/")
  }

	


  return (
		<>
		<Navbar onLogout={onLogout} />
		<ToastContainer />
			<div>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/BugList" element={<BugList />} />
					<Route path="/UserList" element={<UserList />} />
					<Route path="/Login" element={<Login />} />
					<Route path="/Register" element={<Register />} />
					<Route path="/UserEditor" element={<UserEditor />} />
					<Route path='/BugEditor' element={<BugEditor />} />
				</Routes>
			</div>
		<Footer />
		</>
  )
}

export default App

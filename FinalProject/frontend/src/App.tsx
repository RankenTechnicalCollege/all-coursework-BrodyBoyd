import { Routes, Route } from 'react-router-dom';
import Home from './components/home'
import BugList from './components/bugList';
import UserList from './components/userList';
import Login from './components/login';
import Register from './components/registerPage';
import UserEditor from './components/UserEditor';
import BugEditor from './components/bugEditor';

import './App.css'

function App() {
	
  return (
		
    <Routes>
				<Route path="/" element={<Home />} />
				<Route path="/BugList" element={<BugList />} />
				<Route path="/UserList" element={<UserList />} />
				<Route path="/Login" element={<Login />} />
				<Route path="/Register" element={<Register />} />
				<Route path="/UserEditor" element={<UserEditor />} />
				<Route path='/BugEditor' element={<BugEditor />} />
			</Routes>
  )
}

export default App

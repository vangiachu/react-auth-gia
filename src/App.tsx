import './App.css';
import { Forgot } from './components/Forgot';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Nav } from './components/Nav';
import { Register } from './components/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
	return (
		<BrowserRouter>
			<Nav />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/forgot" element={<Forgot />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

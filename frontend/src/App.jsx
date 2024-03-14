import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/Main.jsx'
import Login from "./pages/Login.jsx";
import Admin from "./pages/Admin.jsx";
import UserPage from "./pages/UserPage.jsx";
import Registration from "./pages/Registration.jsx";
import Contact from "./pages/Contact.jsx";
import Visits from "./pages/Visits.jsx";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Main />} path="/" />
				<Route element={<Login />} path="/login" />
				<Route element={<Admin />} path="/admin" />
				<Route element={<UserPage />} path="/user-page" />
				<Route element={<Registration />} path="/register" />
				<Route element={<Contact />} path="/contact" />
				<Route element={<Visits />} path="/visits" />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
//hello

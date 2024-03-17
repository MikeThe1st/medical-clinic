import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/Main.jsx'
import Login from "./pages/Login.jsx";
import Admin from "./pages/Admin.jsx";
import UserPage from "./pages/UserPage.jsx";
import Registration from "./pages/Registration.jsx";
import Contact from "./pages/Contact.jsx";
import ResetForgotPassword from "./pages/ResetForgotPassword.jsx";
import Visits from "./pages/Visits.jsx";
import EditPage from "./pages/EditPage.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";
import Doctors from "./pages/Doctors.jsx";
import PrivateRoutes from "./utils/PrivateRoutes.jsx";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Main />} path="/" />
				<Route element={<Login />} path="/login" />
				<Route element={<Contact />} path="/contact" />
				<Route element={<ResetForgotPassword />} path="/reset-forgot-password" />
				<Route element={<Visits />} path="/visits" />
				<Route element={<Doctors />} path="/doctors" />

				<Route element={<PrivateRoutes />}>
					<Route element={<Registration />} path="/add-user" />
					<Route element={<EditPage />} path="/edit-page" />
					<Route element={<Admin />} path="/admin" />
					<Route element={<UserPage />} path="/user-page" />
					<Route element={<ChangePassword />} path="/change-password" />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;

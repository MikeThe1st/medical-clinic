import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/Main.jsx'
import Login from "./pages/Login.jsx";
import Admin from "./pages/Admin.jsx";
import UserPage from "./pages/UserPage.jsx";
import Registration from "./pages/Registration.jsx";
import Contact from "./pages/Contact.jsx";
import ResetForgotPassword from "./pages/ResetForgotPassword.jsx";
import Roles from"./pages/Roles.jsx";
import Visits from "./pages/Visits.jsx";
import EditPage from "./pages/EditPage.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";
import Doctors from "./pages/Doctors.jsx";
import UserRoutes from "./utils/UserRoutes.jsx";
import AdminRoutes from "./utils/AdminRoutes.jsx";
import Search from "./pages/Search.jsx";
import ListOfUsers from "./pages/ListOfUsers.jsx";
import EditPagePatient from "./pages/EditPagePatient.jsx";
import AddPatient from "./pages/AddPatient.jsx";
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
				<Route element={<ChangePassword />} path="/change-password" />
				<Route element={<Search />} path="/Search" />
				{/* PATHS WHERE EVERY LOGGED USER CAN ACCESS */}
				<Route element={<UserRoutes />}>
					<Route element={<UserPage />} path="/user-page" />
					<Route element={<EditPage />} path="/edit-page" />
					<Route element={<ListOfUsers />} path="/ListOfUsers" />
					<Route element={<EditPagePatient />} path="/editpagepatient" />
				</Route>
				

				{/* PATHS WHERE ONLY LOGGED ADMIN USER CAN ACCESS */}
				<Route element={<AdminRoutes />}>
					<Route element={<Registration />} path="/add-user" />
					<Route element={<Admin />} path="/admin" />
					<Route element={<Roles />} path="/rights" />
					<Route element={<AddPatient />} path="/AddPatient" />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;

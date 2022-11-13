import {Route, Routes, BrowserRouter } from 'react-router-dom';
// Importing Navbar
import Navbar from './components/Navbar/Navbar';
// Importing all pages
import AllTeachers from './pages/AllTeachers';
import Attendence from './pages/Attendence';
import CreateTeacher from './pages/CreateTeacher';
import Reschedules from './pages/Reschedules';
import TakeAttendence from './pages/TakeAttendence';
import Teacher from './pages/Teacher';
// importing all styles
import './styles/navbar.css'
import './styles/default.css'

export default function App() {
	return (
		<div className='App'>
			{/* using hash router for deploying on Github pages */}
			<BrowserRouter>
				<Routes>
					{/* All Routes configuration */}
					<Route path='/' element={<Navbar />}>
						{/* defaults to the reschedules page */}
						<Route index element={<Reschedules />} />
						{/* routes for teachers db */}
						<Route path='/teachers'>
							<Route index element={<AllTeachers />} />
							<Route path='/teachers/:id' element={<Teacher />} />
							<Route path='/teachers/create' element={<CreateTeacher />} />
						</Route>
						{/* routes for attendence */}
						<Route path='/attendence'>
							<Route index element={<Attendence />} />
							<Route path='/attendence/take' element={<TakeAttendence />} />
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

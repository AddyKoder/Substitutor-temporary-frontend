// importing the browser router
import Router from './Router'
// importing all styles
import './styles/components/navbar.css'
import './styles/components/spinner.css'
import './styles/components/notification.css'
import './styles/components/teacher-list.css'

import './styles/default.css'
import './styles/typography.css'

import './styles/pages/allTeachers.css'
import './styles/pages/teacher.css'
import './styles/pages/createTeacher.css'
import './styles/pages/attendence.css'


export default function App() {
	return (
		<div className='App'>
			{/* All the routing of the apps goes here */}
			<Router/>	
		</div>
	);
}

// importing the browser router
import './Router'
// importing all styles
import './styles/navbar.css'
import './styles/default.css'
import './styles/spinner.css'
import './styles/notification.css'
import './styles/typography.css'
import Router from './Router'

export default function App() {
	return (
		<div className='App'>
			{/* All the routing of the apps goes here */}
			<Router/>	
		</div>
	);
}

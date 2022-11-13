import { Outlet, Link } from 'react-router-dom';

export default function Navbar() {
	return (
		<>
			<div className='Navbar'>
				<Link to='/teachers/all'>All Teachers</Link>
				<Link to='/teachers/88'>Specific Teacher</Link>
				<Link to='/teachers/create'>Create Teacher</Link>
				<Link to='/attendence/take'>Take Attendence</Link>
				<Link to='/attendence'>View Attendence</Link>
				<Link to='/reschedules'>View Reschedules</Link>
			</div>
			<Outlet />
		</>
	);
}

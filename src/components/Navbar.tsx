import { Outlet, Link, useResolvedPath, useMatch } from 'react-router-dom';

export default function Navbar() {
	return (
		<>
			<Footer />
			<div className='Navbar'>
				<div className='logo'>SAS</div>
				<div className='nav-links'>
					<Clink to='/teachers' name='Teachers' />
					<Clink to='/attendence' name='Attendance' />
					<Clink to='/' name='Reschedules' />
				</div>
			</div>
			<div className='main-app'>
				<Outlet />
			</div>
		</>
	);
}

function Footer() {
	return (
		<div className='developer'>
			<h2>
				SAS<span> ~ School Assistant Scheduler, is a fullstack Soft-Solution developed and maintained by </span>{' '}
				<a href='https://adityatripathi.com' target='_blank'>
					Aditya Tripathi
				</a>
				<span> - addykoder@gmail.com </span>
			</h2>
		</div>
	);
}

function Clink({ to, name, ...props }: { to: string; name: string }) {
	const resolvedPath = useResolvedPath(to);
	const isActive = useMatch({ path: resolvedPath.pathname + '/*' });
	return (
		<Link className={isActive ? 'activated' : ''} to={to} {...props}>
			{name}
		</Link>
	);
}

import Notification from '../components/Notification';
import Spinner from '../components/Spinner';
import { useEffect, useState } from 'react';
import TeacherList from '../components/TeacherList';
import { typeTeacher } from '../utils/types';
import { useNavigate } from 'react-router-dom';
import address from '../serverAddress';

export default function AllTeachers() {
	// this state can either hold the actual data or it
	// can hold fetch status values like pending, success
	// , fail etc.
	const [teachers, setTeachers] = useState<string | typeTeacher[]>('pending');
	const [search, setSearch] = useState<string>('');
	const [debouncedSearch, setDebouncedSearch] = useState<string>('');

	const navigate = useNavigate();

	// fetching the teacher's database
	useEffect(() => {
		fetch(address + '/teacher')
			// fetching successfully
			.then(r => {
				if (r.status === 200) {
					return r.json();
				}
				throw new Error('invalid status code');
			})
			.then(r => {
				setTeachers(r);
			})
			// if some error occured
			.catch(() => {
				setTeachers('failed');
			});
	}, []);

	// updating the debounced Search
	useEffect(() => {
		const timeOut = setTimeout(() => {
			setDebouncedSearch(search);
		}, 500);

		return () => {
			clearTimeout(timeOut);
		};
	}, [search]);

	return (
		<div className='all-teachers'>
			<header>
				<h1>Teachers List</h1>
				{/* button for adding teacher */}
				<button className='button btn-em' style={{ display: 'flex', alignItems: 'center' }} onClick={() => navigate('/teachers/create')}>
					<img
						src='/SAS-frontend/build/add.svg'
						alt='add teacher'
						style={{ height: '1.5rem', aspectRatio: '1/1', filter: 'invert(100%) sepia(1%) saturate(135%) hue-rotate(255deg) brightness(116%) contrast(100%)' }}
					/>
					<span style={{ marginLeft: '10px' }}>Teacher</span>
				</button>
				{/* Search box */}
				<div className='search'>
					<input type='text' placeholder='Search' onChange={e => setSearch(e.target.value)} />
				</div>
			</header>

			{/* rendering specific element on various states */}
			{/* if fetching is pending */}
			{teachers === 'pending' ? (
				<Spinner />
			) : // if fetching has failed
			teachers === 'failed' ? (
				<Notification
					type='error'
					heading='Cannot Fetch Data'
					content='Seems like you are not in an environment with a valid database available, Try restarting the application or contact the developer - Aditya Tripathi'
				/>
			) : (
				/* if fetching succeed*/ <TeacherList teachers={teachers as typeTeacher[]} filter={debouncedSearch} onClick={id => navigate(`/teachers/${id}`)} />
			)}
		</div>
	);
}

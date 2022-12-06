import { useEffect, useState } from 'react';
import Notification from '../components/Notification';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import TeacherList from '../components/TeacherList';
import address from '../serverAddress';

export default function Attendence() {
	const navigate = useNavigate();
	const [attendence, setAttendence] = useState<null | string | number[]>('pending');

	// fetching today's attendence
	useEffect(() => {
		fetch(address + '/attendence')
			.then(r => {
				if (r.status == 200) return r.json();
				setAttendence('error');
				throw new Error('some error occured');
			})
			.then(r => {
				setAttendence(r);
			})
			.catch(() => {
				setAttendence('error');
			});
	}, []);

	return (
		<div className='attendence'>
			<h1 style={{ padding: '0 .8em', margin: '.8em 0' }}>Attendance</h1>
			{/* displaying various things as per the state of attendence variable */}
			{attendence === 'pending' ? (
				<Spinner />
			) : attendence === null ? (
				<h2 style={{ fontWeight: '200', fontSize: '3rem', marginInline: 'auto', width: 'max-content', opacity: '0.3' }}>Attendance not taken yet</h2>
			) : attendence === 'error' ? (
				<Notification
					type='error'
					heading='Cannot fetch attendance'
					content='Some error occured while fetching attendance from the database, Restart the application or call the developer - Aditya Tripathi'
				/>
			) : attendence.length === 0 ? (
				<h2 style={{ fontSize: '3rem', marginInline: 'auto', width: 'max-content', opacity: '0.3' }}>No Teacher is Absent Today</h2>
			) : (
				<>
					<h2 style={{ fontSize: '2rem', opacity: '0.3', fontWeight: '200', paddingInline: '1em' }}>Absent Teacher's List : {new Date().toISOString().slice(0, 10)}</h2>
					<AbsentTeachers teachersIds={attendence as number[]} />
				</>
			)}

			<button className='button btn-em' style={{ marginBlock: '2em', width: '100%', fontSize: '1.4rem' }} onClick={() => navigate('/attendence/take')}>
				{attendence !== null ? 'Re-take' : 'Take'} Attendance
			</button>
		</div>
	);
}

function AbsentTeachers({ teachersIds }: { teachersIds: number[] }) {
	const navigate = useNavigate();
	async function fetchTeacher(id: number) {
		const res = await fetch(`http://127.0.0.1:8000/teacher/${id}`);
		const teacher = await res.json();
		return teacher;
	}
	const [teachers, setTeachers] = useState<string | number[]>('pending');

	useEffect(() => {
		Promise.all(
			teachersIds.map(async e => {
				return fetchTeacher(e);
			})
		).then((r: number[]) => setTeachers(r));
	});

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return (
		<div className='absent-teachers-list'>
			{teachers === 'pending' ? <Spinner /> : <TeacherList onClick={id => navigate(`/teachers/${id}`)} teachers={teachers as any} filter='' displayHeader={false} />}
		</div>
	);
}

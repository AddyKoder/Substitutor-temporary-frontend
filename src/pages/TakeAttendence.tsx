import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherList from '../components/TeacherList';
import { typeTeacher } from '../utils/types';
import Notification from '../components/Notification';
import Spinner from '../components/Spinner';
import address from '../serverAddress';

export default function TakeAttendence() {
	const [selected, setSelected] = useState<number[]>([]);
	const [teachers, setTeachers] = useState<string | typeTeacher[]>('pending');

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
				if (r.status === 'ok') {
					setTeachers(r.payload.teachers);
				} else setTeachers('failed')
			})
			// if some error occured
			.catch(() => {
				setTeachers('failed');
			});
	}, []);

	// when someone clicks on a teacher item
	// to toggle the state from absent to present
	function handleClick(id: number) {
		if (selected.includes(id)) {
			setSelected(prev => {
				return prev.filter(e => {
					if (e !== id) return 1;
					return 0;
				});
			});
		} else {
			setSelected(prev => {
				return [...prev, id];
			});
		}
	}

	function handleSubmit() {
		if (confirm('Are you sure to submit attendance?')) {
			fetch(address + '/attendence', {
				method: 'post',
				body: JSON.stringify({ attendance: selected.map(n => { return { id: n, presentPeriods: [] } }) }),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			})
				.then(r => {
					if (r.status === 200) {
						setTimeout(() => {
							navigate('/');
						}, 600);
					}
				})
				.catch(() => console.log('some Error occured'));
		}
	}

	return (
		<div className='take-attendence'>
			<h1 style={{ padding: '0 .8em', margin: '.8em 0' }}>Take Attendance</h1>
			<h2 style={{ fontSize: '2rem', opacity: '0.3', fontWeight: '200', paddingInline: '1em' }}>Select Teachers which are Absent today : {new Date().toISOString().slice(0, 10)}</h2>
			{teachers === 'pending' ? (
				<Spinner />
			) : teachers === 'failed' ? (
				<Notification type='error' heading='Cannot fetch data' content='Due to some incompatibility the application cannot fetch data' />
			) : (
				<TeacherList onClick={handleClick} selected={selected} filter='' teachers={teachers as unknown as typeTeacher[]} />
			)}

			<p style={{ fontSize: '1.5rem', opacity: '0.5', fontWeight: '200', marginTop: '2em' }}>Are you Sure the following teachers are absent</p>
			{Array(...teachers).map(teacher => {
				if (selected.includes(Object(teacher).id)) {
					return (
						<span style={{ textTransform: 'capitalize', padding: '0 1em' }} key={Object(teacher).id}>
							{Object(teacher).name}
						</span>
					);
				}
			})}

			<button onClick={handleSubmit} className='button btn-em' style={{ width: '100%', margin: '2em 0', fontSize: '1.4rem' }}>
				Submit Attendance and Reschedule
			</button>
		</div>
	);
}

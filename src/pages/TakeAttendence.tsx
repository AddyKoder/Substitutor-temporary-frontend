import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherList from '../components/TeacherList';
import { typeTeacher } from '../utils/types';

export default function TakeAttendence() {

	const [selected, setSelected] = useState<number[]>([]);
	const [teachers, setTeachers] = useState<string | typeTeacher[]>([]);

	const navigate = useNavigate()

	// fetching the teacher's database
	useEffect(() => {
		fetch('http://127.0.0.1:8000/teacher')
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
		if (confirm('Are you sure to submit attendence?')) {
			fetch('http://127.0.0.1:8000/attendence', {
				method: 'post',
				body: JSON.stringify({ absentTeachers: selected }),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}).then(r => {
				if (r.status === 200) {
					setTimeout(() => {
						navigate('/')
					}, 100);
				}
			}).catch(() => console.log('some Error occured')
			)
		}
	}

	return (
		<div className='take-attendence'>
			<h1 style={{ padding: '0 .8em', margin: '.8em 0' }}>Take Attendence</h1>
			<h2 style={{ fontSize: '2rem', opacity: '0.3', fontWeight: '200', paddingInline: '1em' }}>Select Teachers which are Absent today : {new Date().toISOString().slice(0, 10)}</h2>
			<TeacherList onClick={handleClick} selected={selected} filter='' teachers={teachers as unknown as typeTeacher[]} />

			<button onClick={handleSubmit} className='button btn-em' style={{width: '100%', margin:'2em 0'}}>Submit Attendence</button>
		</div>
	);
}

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { typeTeacher } from '../utils/types';
import Spinner from '../components/Spinner';
import Notification from '../components/Notification';
import { useNavigate } from 'react-router-dom';
import address from '../serverAddress';

interface fullTypeTeacher extends typeTeacher {
	timeTable: object;
}

export default function Teacher() {
	const { id } = useParams();
	const [teacher, setTeacher] = useState<string | fullTypeTeacher>('pending');
	const timetable = Object(teacher).timeTable;
	const navigate = useNavigate();

	function delTeacher() {
		if (!confirm(`Are you sure you want to delete Teacher`)) return;
		fetch(`${address}/teacher/${id}`, { method: 'delete' });
		setTimeout(() => {
			navigate('/teachers');
		}, 100);
	}
	// fetching Teacher's data
	useEffect(() => {
		fetch(`${address}/teacher/${id}`)
			// fetching successfully
			.then(r => {
				if (r.status === 200) {
					return r.json();
				}
				throw new Error('invalid status code');
			})
			.then(r => {
				if (r.status === 'ok') {
					setTeacher(r.payload.teacher);
				} else setTeacher('failed')
			})
			// if some error occured
			.catch(() => {
				setTeacher('failed');
			});
	}, []);

	return (
		// checking for various states of teacher
		teacher === 'pending' ? (
			<Spinner />
		) : teacher === 'failed' ? (
			<Notification type='error' heading='Cannot Fetch Teacher' content='Seems like the database is not connected or the teacher does not exists' />
		) : teacher === null || typeof teacher === 'string' ? (
			<Notification type='error' heading='Cannot find teacher' content='The teacher you are trying to fetch does not exists in the database, If it a problem contact the developer' />
		) : (
			// if teacher if fetched successfully
			<div className='teacher'>
				<header>
					<h2>{teacher.name}</h2>
					<div className={`category ${teacher.category}`} style={{ transform: 'scale(1.5)' }}>
						{teacher.category}
					</div>
					<div className='teacher-actions'>
						<button className='button btn-em' onClick={() => navigate(`/teachers/update/${id}`)}>
							Modify
						</button>
						<button className='button btn-del' style={{ display: 'flex' }} onClick={delTeacher}>
							<img
								src='del.svg'
								style={{ height: '25px', aspectRatio: '1/1', filter: 'invert(100%) sepia(1%) saturate(135%) hue-rotate(255deg) brightness(116%) contrast(100%)' }}
							/>
							<span style={{ marginLeft: '10px' }}>Teacher</span>
						</button>
					</div>
				</header>
				<h3 style={{ marginBottom: 0, fontWeight: '200', fontSize: '1.5rem', padding: '0 1.5em', opacity: '0.5' }}>ROLL NO: {teacher.id}</h3>
				<h3 style={{ fontWeight: '200', fontSize: '1.5rem', padding: '0 1.5em' }}>Class Teacher of <span style={{textTransform:'capitalize'}}>{teacher.classTeacherOf === 'free' ? 'None' : teacher.classTeacherOf ==='busy' ? 'None but busy': teacher.classTeacherOf}</span></h3>
				<div className='timeTable'>
					<table>
						<thead>
							<tr>
								<th>Day</th>
								<th>1</th>
								<th>2</th>
								<th>3</th>
								<th>4</th>
								<th>5</th>
								<th>6</th>
								<th>7</th>
								<th>8</th>
							</tr>
						</thead>
						<tbody>
							{['mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map(day => {
								return (
									<tr key={day}>
										<>
											<td>{day}</td>
											{[0, 1, 2, 3, 4, 5, 6, 7].map(period => {
												return (
													<td
														key={period}
														style={{
															color: timetable[day][period] === 'free' || timetable[day][period] === 'busy' ? 'grey' : 'white',
															fontWeight: timetable[day][period] === 'free' || timetable[day][period] ==='busy' ? '200' : '400',
															textTransform: !['free', 'busy'].includes(timetable[day][period]) ?'uppercase':'none'
														}}
													>
														{timetable[day][period] === 'free' ? '- -' : timetable[day][period] === 'busy'? 'busy': timetable[day][period]}
													</td>
												);
											})}
										</>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		)
	);
}

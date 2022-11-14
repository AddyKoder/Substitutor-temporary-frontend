import { useState } from 'react';
import TimetableEntry from '../components/TimeTableEntry';

const allClasses: string[] = ['none'];
for (const classN of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) {
	for (const section of ['a', 'b', 'c', 'd']) {
		allClasses.push(`${classN}-${section}`);
	}
}

export default function CreateTeacher() {
	const [tName, setTname] = useState('');
	const [tClass, setTclass] = useState('');
	const [tCategory, setTcategory] = useState('junior');
	// assigning initial timetable
	const [tTimetable, setTtimetable] = useState({
		'mon': ['free', 'free', 'free', 'free', 'free', 'free', 'free', 'free'],
		'tue': ['free', 'free', 'free', 'free', 'free', 'free', 'free', 'free'],
		'wed': ['free', 'free', 'free', 'free', 'free', 'free', 'free', 'free'],
		'thu': ['free', 'free', 'free', 'free', 'free', 'free', 'free', 'free'],
		'fri': ['free', 'free', 'free', 'free', 'free', 'free', 'free', 'free'],
		'sat': ['free', 'free', 'free', 'free', 'free', 'free'],
	});

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function submitForm(e: any) {
		e.preventDefault();

		const submitTeacherObject = {
			name: tName,
			category: tCategory,
			classTeacherOf: tClass,
			timeTable: tTimetable,
		};
		// posting the data
		fetch('http://127.0.0.1:8000/teacher/', {
			method: 'post',
			body: JSON.stringify(submitTeacherObject),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})
			.then(r => {
				return r.text();
			})
			.then(r => {
				console.log(r)
				if (r.includes('created')) {
					setTname('')
					setTclass('none')
					setTtimetable({
		'mon': ['free', 'free', 'free', 'free', 'free', 'free', 'free', 'free'],
		'tue': ['free', 'free', 'free', 'free', 'free', 'free', 'free', 'free'],
		'wed': ['free', 'free', 'free', 'free', 'free', 'free', 'free', 'free'],
		'thu': ['free', 'free', 'free', 'free', 'free', 'free', 'free', 'free'],
		'fri': ['free', 'free', 'free', 'free', 'free', 'free', 'free', 'free'],
		'sat': ['free', 'free', 'free', 'free', 'free', 'free'],
	})
				}
			}
			);
	}
	return (
		<div className='create-teacher'>
			<h1>Add Teacher</h1>
			<form onSubmit={submitForm} spellCheck='false'>
				{/* name input */}
				<span>
					<label htmlFor='name-input'>Name</label>
					<input type='text' name='teacher-name' id='name-input' placeholder='Name' value={tName} onChange={e => setTname(e.target.value)} />
				</span>
				{/* category input */}
				<span>
					<label htmlFor='category-input'>Category</label>
					<select name='category' id='category-input' value={tCategory} onChange={e => setTcategory(e.target.value)}>
						<option value='junior'>Junior</option>
						<option value='senior'>Senior</option>
						<option value='pgt'>PGT</option>
					</select>
				</span>
				{/* Class Teacher of Input */}
				<span>
					<label htmlFor='class-input'>Class Teacher of</label>
					<select name='class' id='class-input' value={tClass} onChange={e => setTclass(e.target.value)}>
						{allClasses.map(classN => {
							return (
								<option key={classN} value={classN} style={{ textTransform: 'uppercase' }}>
									{classN}
								</option>
							);
						})}
					</select>
				</span>
				{/* TimeTable input */}
				<label htmlFor='timetable-entry'>Time Table:</label>
				<TimetableEntry timetable={tTimetable} setTimetable={setTtimetable} />
				<input type='submit' className='button btn-em' style={{ width: '100%' }} />
			</form>
		</div>
	);
}

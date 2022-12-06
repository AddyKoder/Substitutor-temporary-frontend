import { useState } from 'react';
import TimetableEntry from './TimeTableEntry';
import address from '../serverAddress';

const allClasses: string[] = [];
for (const classN of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) {
	for (const section of ['a', 'b', 'c', 'd']) {
		allClasses.push(`${classN}-${section}`);
	}
}

export default function TeacherForm({
	name,
	className,
	category,
	timeTable,
	onSubmit,
}: {
	name?: string;
	className?: string;
	category?: string;
	timeTable?: { [type: string]: string[] };
	onSubmit?: (teacherData: object) => void;
}) {
	// There are two variable uses of this component
	// one for creating a teacher and other for
	// updating the teacher

	const [tName, setTname] = useState(name || '');
	const [tClass, setTclass] = useState(className || 'free');
	const [tCategory, setTcategory] = useState(category || 'junior');
	// assigning initial timetable
	const [tTimetable, setTtimetable] = useState(
		timeTable || {
			'mon': ['free', 'free', 'free', 'free', 'free', 'free', 'free', 'free'],
			'tue': ['free', 'free', 'free', 'free', 'free', 'free', 'free', 'free'],
			'wed': ['free', 'free', 'free', 'free', 'free', 'free', 'free', 'free'],
			'thu': ['free', 'free', 'free', 'free', 'free', 'free', 'free', 'free'],
			'fri': ['free', 'free', 'free', 'free', 'free', 'free', 'free', 'free'],
			'sat': ['free', 'free', 'free', 'free', 'free', 'free'],
		}
	);

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
		if (onSubmit) {
			onSubmit(submitTeacherObject);
		} else {
			fetch(address + '/teacher/', {
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
					if (r.includes('created')) {
						e.target.setAttribute('submitted', 'true');
						setTimeout(() => {
							e.target.setAttribute('submitted', 'false');
						}, 3000);

						setTname('');
						setTclass('free');
						setTtimetable({
							'mon': ['free', 'free', 'free', 'free', 'free', 'free', 'free', 'free'],
							'tue': ['free', 'free', 'free', 'free', 'free', 'free', 'free', 'free'],
							'wed': ['free', 'free', 'free', 'free', 'free', 'free', 'free', 'free'],
							'thu': ['free', 'free', 'free', 'free', 'free', 'free', 'free', 'free'],
							'fri': ['free', 'free', 'free', 'free', 'free', 'free', 'free', 'free'],
							'sat': ['free', 'free', 'free', 'free', 'free', 'free'],
						});
					}
				});
		}
	}
	return (
		<div className='create-teacher'>
			<h1>
				{name ? `Update Teacher : ` : 'Add Teacher'} {name ? <span style={{ opacity: '.5', textTransform: 'capitalize' }}>{name}</span> : ''}
			</h1>
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
					<select name='class' id='class-input' style={{ textTransform: 'uppercase' }} value={tClass} onChange={e => setTclass(e.target.value)}>
						<option value='free' style={{ textTransform: 'uppercase' }}>
							None
						</option>
						<option value='busy' style={{ textTransform: 'uppercase' }}>
							Busy
						</option>
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

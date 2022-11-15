import { typeTeacher } from '../utils/types';

export default function TeacherList({ teachers, filter, displayHeader=true, onClick, selected=[]}: {selected?:number[], teachers: typeTeacher[], filter: string, displayHeader?:boolean, onClick:(e:number)=>void}) {
	// filter the teachers array with the give string
	const filteredTeachers = teachers.filter(e => {
		const teacher = Object(e);
		for (const item of Object.values(teacher)) {
			if (String(item).toLowerCase().includes(filter.toLowerCase())) {
				return 1;
			}
		}

		return 0;
	}).sort((a,b) => {
		const [t1, t2] = [Object(a), Object(b)]
		if (t1.name.toLowerCase() > t2.name.toLowerCase()) return 1
		else if (t1.name.toLowerCase() < t2.name.toLowerCase()) return -1
		return 0
	})

	return (
		<div className='teachers-list'>
			{/* Header of the list */}

			{displayHeader && <div className='header teacher-item'>
				<div className='name'> Name</div>
				<div className='category'>Category</div>
				<div className='class'>Class</div>
			</div>}
			{/* The List begins here */}
			<div className='teachers'>
				{filteredTeachers.length === 0 ? (
					<h3 style={{ fontWeight: '200', fontSize: '2rem', margin: '2em 0', textAlign: 'center', opacity: '0.6' }}>No Teacher found {filter.replaceAll(' ','') !== ''? `for search '${filter}'` : ''}</h3>
				) : (
					filteredTeachers.map((e: object) => {
						const teacher = Object(e);

						return (
							<div style={{marginBlock:'.5em',outline:selected.includes(teacher.id)? '2px solid red':'2px solid transparent'}} key={teacher.id} className='teacher-item' onClick={() => { onClick(teacher.id) }}>
								<div className='name'>{teacher.name}</div>
								<div className={`category ${teacher.category}`}>{teacher.category}</div>
								<div className='class'>{teacher.classTeacherOf !== 'free' ? teacher.classTeacherOf : '- -'}</div>
							</div>
						);
					})
				)}
			</div>
		</div>
	);
}

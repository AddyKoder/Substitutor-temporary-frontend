import { typeTeacher } from '../utils/types';

export default function TeacherList({ teachers, filter }: { teachers: typeTeacher[]; filter: string }) {
	// filter the teachers array with the give string

	return (
		<div className='teachers-list'>
			{/* Header of the list */}
			<div className='header teacher-item'>
				<div className='name'> Name</div>
				<div className='category'>Category</div>
				<div className='class'>Class</div>
			</div>
			{/* The List begins here */}
			<div className='teachers'>
				{teachers.map((e: object) => {
					const teacher = Object(e);
					return (
						<div className='teacher-item'>
							<div className='name'>{teacher.name}</div>
							<div className='category'>{teacher.category}</div>
							<div className='class'>{teacher.classTeacherOf}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

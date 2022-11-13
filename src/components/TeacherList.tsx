import { typeTeacher } from "../utils/types"

export default function TeacherList({ teachers, filter}:{teachers:typeTeacher[], filter:string}) {
	// filter the teachers array with the give string
	
	return (
		<div className="teachers-list">
			{
				teachers.map((e: object) => {
					const teacher = Object(e)
					return <div key={teacher.id}>{teacher.id} {teacher.name} {teacher.category} {teacher.classTeacherOf}</div>
				})
			}
		</div>	
	)
}
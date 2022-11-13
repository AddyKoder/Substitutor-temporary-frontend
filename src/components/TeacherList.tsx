

export default function TeacherList({ teachers }:{teachers:object[]}) {
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
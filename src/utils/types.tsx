
export interface typeTeacher{
	id: number,
	name: string,
	classTeacherOf: string,
	category: 'junior' | 'senior' | 'pgt'
}
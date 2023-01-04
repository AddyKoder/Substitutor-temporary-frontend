import { useEffect, useState } from 'react';
import address from '../serverAddress';

export default function RescheduleList({ reschedules }: { reschedules: object[] }) {
	const [teachers, setTeachers] = useState<object[] | string>([]);
	// fetching teachers
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

	function getNameCategory(id: number):[name:string, category:string] | undefined {
		for (const t of teachers) {
			const teacher = Object(t);
			if (teacher.id === id) return [teacher.name, teacher.category];
		}
	}

	return (
		<table>
			<thead>
				<tr>
					<th>Teacher</th>
					<th>Teacher Category</th>
					<th>Class</th>
					<th>Period</th>
				</tr>
			</thead>
			<tbody>
				{reschedules.map(r => {
					let nameCategory = getNameCategory(Object(r).teacherId);
					if (nameCategory == undefined) nameCategory = ['Undefined', 'Undefined'];
					return (
						<tr style={nameCategory[1] === 'Undefined' ? { backgroundColor: 'rgba(255,0,0,0.3)' } : {}} key={Object(r)._id}>
							<td>{nameCategory[0]}</td>
							<td>{nameCategory[1]}</td>
							<td>{Object(r).className}</td>
							<td>{Object(r).periodNo}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

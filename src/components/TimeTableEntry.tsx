// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TimetableEntry({ timetable, setTimetable }: { timetable: { [type: string]: string[] }; setTimetable: any }) {
	return (
		<div className='timetable-entry'>
			<table>
				<thead style={{opacity:'0.6'}}>
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
					{Object.keys(timetable).map(day => {
						if (day === '_id') return 
						return (
							<tr key={day}>
								<td style={{opacity:'0.6', textTransform:'uppercase'}}>{day}</td>
								<TimetableRowEntry  day={day} row={timetable[day]} setTimetable={setTimetable} />
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TimetableRowEntry({ row, day, setTimetable }: { row: string[]; day: string; setTimetable: any }) {
	return (
					<>
			{row.map((item, index) => {
				return (
						<td key={`${day}-${index}`}>
							<ClassSelector value={item}  day={day} setTimetable={setTimetable} period={index} />
						</td>
				);
			})}
					</>
	);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ClassSelector({value, setTimetable, day, period }: {value:string, setTimetable: any; day: string; period: number }) {
	// creating all classes combination
	const allClasses: string[] = [];
	for (const classN of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) {
		for (const section of ['a', 'b', 'c', 'd']) {
			allClasses.push(`${classN}-${section}`);
		}
	}

	function updateTimetable(event:object) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		setTimetable((timetable:any) => {
			const e = Object(event)
			const todayTimetable = [...timetable[day]]
			todayTimetable[period] = e.target.value
			const toRet = {...timetable}
			toRet[day] = todayTimetable
			return toRet
		})
	}
	const color = value === 'free'? 'rgba(124, 124, 124, 0.6)' : 'var(--color-accent)'
	const styles = {color:color, borderColor:color}
	return (
		<select name='class' value={value} onChange={updateTimetable} style={{ ...styles, textTransform:'uppercase', textAlign:'center'}}>
			<option value="free">Free</option>
			<option value="busy">Busy</option>
			{allClasses.map(classN => {
				return (
					<option key={classN} value={ classN } style={{textTransform:'uppercase'}}>
						{classN}
					</option>
				);
			})}
		</select>
	);
}

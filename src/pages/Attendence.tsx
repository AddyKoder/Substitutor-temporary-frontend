import { useEffect, useState } from "react"

export default function Attendence() {
	const [attendence, setAttendence] = useState<null | string | number[]>('fetching')
	console.log(attendence);
	

	// fetching today's attendence
	useEffect(() => {
		fetch('http://127.0.0.1:8000/attendence').then(r => {
			if (r.status == 200) return r.json()
			setAttendence('error')
			throw new Error("some error occured");
		}).then(r => {			
			setAttendence(r)
		})
	}, [])

	return <div>Attendence</div>
	
}
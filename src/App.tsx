import { useEffect } from 'react'

async function fetchTeachers(){

		const res = await fetch('http://127.0.0.1:8000/teacher/65892').catch(()=>console.log('fetching failed'))
	
	

	if (res) {
		const data = await res.json()
		console.log(data);
	}	

}
export default function App() {
	useEffect(() => {
		fetchTeachers()
	},[])

	return <h1> App </h1>
}
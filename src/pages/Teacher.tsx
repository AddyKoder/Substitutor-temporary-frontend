import { useParams } from "react-router-dom"

export default function Teacher() {
	const {id} = useParams()
	
	return <div>Teacher : {id}</div>
	
}
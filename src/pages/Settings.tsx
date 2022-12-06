import { useState } from "react"

export default function Settings() {

	const [mode, setMode] = useState(localStorage.getItem('mode') || 'select')
	const [address, setAddress] = useState(localStorage.getItem('address') || 'http://127.0.0.1:8000')

	function updatePreferences() {
		localStorage.setItem('mode', mode)
		localStorage.setItem('address', address)
	}
	return (
		<div className="settings">
			<input type="text" placeholder="address" value={address} onChange={e => setAddress(e.target.value)}  />
			<select value={mode} onChange={e => setMode(e.target.value)}>
				<option value="select">Select</option>
				<option value="text">Text</option>
			</select>
			<button onClick={updatePreferences}>Update Preferences</button>
		</div>
	)	
}
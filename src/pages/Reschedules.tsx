import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import Notification from '../components/Notification';
import RescheduleList from '../components/RescheduleList';

export default function Reschedules() {
	const [reschedules, setReschedules] = useState<string | object[]>('pending');
	
	useEffect(() => {
		fetch('http://127.0.0.1:8000/reschedule')
			.then(r => {
				if (r.status == 200) return r.json();
				throw new Error('cannot fetch reschedules');
			})
			.then(r => {
				if (r instanceof Array) {
					setReschedules(r);
				}
				else {
					setReschedules('null')
				}
			})
			.catch(() => setReschedules('failed'));
	}, []);


	return (
		<div className='reschedules'>
			<h1 style={{ padding: '0 .8em', margin: '.8em 0' }}>Reschedules : <span style={{ opacity: '0.5', fontWeight: '200'}}>{new Date().toISOString().slice(0, 10)}</span></h1>
			{reschedules === 'pending' ? <Spinner /> :
				reschedules === 'failed' ? <Notification type='error' heading='Cannot fetch Reschedules' content='The application cannot fetch reschedules from the database, Try restarting the application or contant the developer - Aditya Tripathi' /> :
					reschedules === 'null'?<h2 style={{fontSize:'3rem', textAlign:'center', opacity:'0.3', fontWeight:'200'}}>Attendence not taken yet</h2>:

					<RescheduleList reschedules={reschedules as object[]} />	
			}
		</div>
	);
}

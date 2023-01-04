import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import Notification from '../components/Notification';
import RescheduleList from '../components/RescheduleList';
import address from '../serverAddress';

export default function Reschedules() {
	const [reschedules, setReschedules] = useState<string | object[]>('pending');

	useEffect(() => {
		fetch(address + '/reschedule')
			.then(r => {
				if (r.status == 200) return r.json();
				throw new Error('cannot fetch reschedules');
			})
			.then(r => {
				if (r.status === 'ok' && r.payload.reschedules instanceof Array ) {
					setReschedules(r.payload.reschedules);
				} else {
					setReschedules('null');
				}
			})
			.catch(() => setReschedules('failed'));
	}, []);

	return (
		<div className='reschedules'>
			<header>
				<h1 style={{ padding: '0 .8em', margin: '.8em 0' }}>
					Reschedules : <span style={{ opacity: '0.5', fontWeight: '200' }}>{new Date().toISOString().slice(0, 10)}</span>
				</h1>
				<button
					onClick={() => {
						fetch(address + '/reschedule/upload').then(() => {
							alert('Uploading Reschedules');
						});
					}}
				>
					Upload
				</button>
			</header>
			{reschedules === 'pending' ? (
				<Spinner />
			) : reschedules === 'failed' ? (
				<Notification
					type='error'
					heading='Cannot fetch Reschedules'
					content='The application cannot fetch reschedules from the database, Try restarting the application or contact the developer - Aditya Tripathi'
				/>
			) : reschedules === 'null' ? (
				<h2 style={{ fontSize: '3rem', textAlign: 'center', opacity: '0.3', fontWeight: '200' }}>Attendance not taken yet</h2>
			) : (
				<RescheduleList reschedules={reschedules as object[]} />
			)}
		</div>
	);
}

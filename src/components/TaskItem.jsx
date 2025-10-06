import { useState } from 'react'
import FinishedButton from './utils/FinishedButton'

export default function TaskItem({
	id,
	title,
	description,
	dueDate,
	deleteTask
}) {
	const [isFinished, setFinished] = useState(false)
	return (
		<div className={'border p-4 mb-4 rounded'}>
			<h3>{title}</h3>
			<p>{description}</p>
			<p>{dueDate}</p>
			<FinishedButton
				isFinished={isFinished}
				setFinished={setFinished}
			/>
			<button onClick={() => deleteTask(id)}>🗑️</button>
		</div>
	)
}

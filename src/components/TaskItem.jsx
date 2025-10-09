import { useState } from 'react'
import FinishedButton from './utils/FinishedButton'
import { format, isBefore, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'

export default function TaskItem({
	id,
	description,
	dueDate,
	isFinished,
	deleteTask,
	editTask
}) {
	const [isEditing, setIsEditing] = useState(false)
	const [editedTask, setEditedTask] = useState({ description, dueDate })

	const toggleFinished = () => {
		editTask(id, { isFinished: !isFinished })
	}
	const handleChange = e => {
		const { name, value } = e.target
		setEditedTask(prev => ({ ...prev, [name]: value }))
	}

	const handleSave = () => {
		editTask(id, editedTask)
		setIsEditing(false)
	}

	const isOverdue = () => {
		const deadline = parseISO(dueDate)
		const now = new Date()
		return isBefore(deadline, now)
	}

	if (isEditing) {
		return (
			<div className='border p-4 mb-4 rounded'>
				{['description', 'dueDate'].map(field => (
					<input
						key={field}
						name={field}
						value={editedTask[field]}
						onChange={handleChange}
						className='border p-2 w-full mb-2'
						placeholder={
							field === 'description' ? 'Описание задачи' : 'Срок выполнения'
						}
					/>
				))}

				<div className='flex gap-2'>
					<button
						onClick={handleSave}
						className='bg-green-500 text-white p-2 rounded'
					>
						✅ Сохранить
					</button>
					<button
						onClick={() => setIsEditing(false)}
						className='p-2 border rounded'
					>
						❌ Отмена
					</button>
				</div>
			</div>
		)
	}

	return (
		<div className='border p-4 mb-4 rounded'>
			<p>{description}</p>
			<div className={`border p-4 mb-4 rounded ${isOverdue() ? '' : ''}`}>
				<p>
					{dueDate
						? format(parseISO(dueDate), 'd MMMM yyyy в HH:mm', { locale: ru })
						: 'Без срока'}
				</p>
			</div>

			<FinishedButton
				isFinished={isFinished}
				onToggle={toggleFinished}
			/>

			<div className='flex gap-2 mt-2'>
				<button onClick={() => deleteTask(id)}>🗑️</button>
				<button onClick={() => setIsEditing(true)}>📝</button>
			</div>
		</div>
	)
}

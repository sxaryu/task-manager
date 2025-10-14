import { useState } from 'react'
import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'
import FinishedButton from './utils/FinishedButton'

export default function TaskItem({
	id,
	description,
	dueDate,
	createdAt,
	category,
	isFinished,
	deleteTask,
	editTask,
	categories,
	role
}) {
	const [isEditing, setIsEditing] = useState(false)
	const [editedTask, setEditedTask] = useState({
		description,
		dueDate,
		category
	})

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

	return (
		<div className='bg-[#1f2121] shadow-md rounded-xl p-4 mb-4 border border-gray-700 hover:shadow-lg transition-shadow text-gray-100'>
			{isEditing && role === 'manager' ? (
				<div className='flex flex-col gap-3'>
					<input
						name='description'
						value={editedTask.description}
						onChange={handleChange}
						placeholder='Описание задачи'
						className='border border-gray-600 rounded px-3 py-2 bg-[#1f2121] text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4dbcda]'
						required
					/>
					<input
						name='dueDate'
						type='date'
						value={editedTask.dueDate}
						onChange={handleChange}
						className='border border-gray-600 rounded px-3 py-2 bg-[#1f2121] text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4dbcda]'
					/>
					<select
						name='category'
						value={editedTask.category}
						onChange={handleChange}
						className='border border-gray-600 rounded px-3 py-2 bg-[#1f2121] text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4dbcda]'
						required
					>
						<option
							value=''
							disabled
						>
							Выберите категорию
						</option>
						{categories.map(cat => (
							<option
								key={cat}
								value={cat}
							>
								{cat}
							</option>
						))}
					</select>

					<div className='flex gap-2 justify-end'>
						<button
							onClick={handleSave}
							className='bg-[#4dbcda] text-white px-4 py-2 rounded hover:bg-[#39a5b8] transition-colors'
						>
							Сохранить
						</button>
						<button
							onClick={() => setIsEditing(false)}
							className='bg-gray-600 text-gray-100 px-4 py-2 rounded hover:bg-gray-500 transition-colors'
						>
							Отмена
						</button>
					</div>
				</div>
			) : (
				<div className='flex flex-col gap-2'>
					<p className='font-medium text-gray-100'>{description}</p>

					<div className='text-sm text-gray-400 flex flex-col gap-1'>
						<p>
							Дата выдачи:{' '}
							{createdAt
								? format(parseISO(createdAt), 'd MMMM yyyy', { locale: ru })
								: '—'}
						</p>
						<p>
							Срок выполнения: до{' '}
							{dueDate
								? format(parseISO(dueDate), 'd MMMM yyyy', { locale: ru })
								: 'Без срока'}
						</p>
						<p>Категория: {category}</p>
					</div>

					<div className='flex items-center justify-between mt-2'>
						<FinishedButton
							isFinished={isFinished}
							onToggle={toggleFinished}
						/>
						{role === 'manager' && (
							<div className='flex gap-2'>
								<button
									onClick={() => setIsEditing(true)}
									className='text-[#4dbcda] hover:text-[#39a5b8] transition-colors'
								>
									📝
								</button>
								<button
									onClick={() => deleteTask(id)}
									className='text-red-500 hover:text-red-700 transition-colors'
								>
									🗑️
								</button>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

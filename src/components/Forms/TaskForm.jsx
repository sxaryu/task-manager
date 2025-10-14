import { useState } from 'react'
import { configs, InitialState } from '../Data/config'
import { v4 as uuidv4 } from 'uuid'
import { useAuth } from '../../hooks/AuthContext'

export default function TaskForm({ addTask }) {
	const [formState, setFormState] = useState(InitialState)
	const { users } = useAuth()
	const employees = users.filter(user => user.role === 'employee')

	const categories = [
		'Администрирование',
		'Разработка',
		'Документация',
		'Поддержка'
	]

	const handleChange = e => {
		const { name, value } = e.target
		setFormState(prev => ({
			...prev,
			[name]: value
		}))
	}

	const onSubmit = e => {
		e.preventDefault()
		addTask({
			id: uuidv4(),
			description: formState.description,
			dueDate: formState.dueDate,
			assignedTo: formState.assignedTo,
			category: formState.category,
			isFinished: false
		})
		setFormState(InitialState)
	}

	return (
		<div className='class="flex flex-col gap-2 mb-4 p-4 border border-gray-700 rounded "'>
			<h3 className='text-lg font-semibold mb-3'>Добавить задачу</h3>
			<form
				className='flex flex-col gap-3'
				onSubmit={onSubmit}
			>
				{configs
					.filter(cate => cate.name !== 'category')
					.map(item => (
						<input
							key={item.name}
							{...item}
							value={formState[item.name]}
							onChange={handleChange}
							className='px-3 py-2 rounded bg-[#1f2121] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#4dbcda]'
						/>
					))}

				<select
					name='assignedTo'
					value={formState.assignedTo}
					onChange={handleChange}
					required
					className='px-3 py-2 rounded bg-[#1f2121] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#4dbcda]'
				>
					<option
						value=''
						disabled
					>
						Выберите сотрудника
					</option>
					{employees.map(employee => (
						<option
							key={employee.id}
							value={employee.id}
						>
							{employee.name} {employee.surname}
						</option>
					))}
				</select>

				<select
					name='category'
					value={formState.category}
					onChange={handleChange}
					required
					className='px-3 py-2 rounded bg-[#1f2121] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#4dbcda]'
				>
					<option
						value=''
						disabled
					>
						Выберите категорию
					</option>
					{categories.map(category => (
						<option
							key={category}
							value={category}
						>
							{category}
						</option>
					))}
				</select>

				<button
					type='submit'
					className='px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition-colors text-white font-semibold'
				>
					Добавить
				</button>
			</form>
		</div>
	)
}

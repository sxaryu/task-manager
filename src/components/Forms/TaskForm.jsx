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
		<div>
			<form onSubmit={onSubmit}>
				<p>Добавить задачу</p>

				{configs
					.filter(category => category.name !== 'category')
					.map(item => (
						<input
							key={item.name}
							{...item}
							value={formState[item.name]}
							onChange={handleChange}
						/>
					))}

				<select
					name='assignedTo'
					value={formState.assignedTo}
					onChange={handleChange}
					required
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
							{employee.name}
						</option>
					))}
				</select>

				<select
					name='category'
					value={formState.category}
					onChange={handleChange}
					required
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

				<button type='submit'>+</button>
			</form>
		</div>
	)
}

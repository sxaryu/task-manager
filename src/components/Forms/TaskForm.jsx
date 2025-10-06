import { useState } from 'react'
import { configs, InitialState } from '../Data/config'
import { v4 as uuidv4 } from 'uuid'

export default function TaskForm({ addTask }) {
	const [formState, setFormState] = useState(InitialState)

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
			title: formState.title,
			description: formState.description,
			dueDate: formState.dueDate
		})
		setFormState(InitialState)
	}

	return (
		<div>
			<form onSubmit={onSubmit}>
				<p className=''>Добавить задачу</p>
				{configs.map(item => (
					<input
						key={item.name}
						{...item}
						value={formState[item.name]}
						onChange={handleChange}
					/>
				))}
				<button type='submit'>+</button>
			</form>
		</div>
	)
}

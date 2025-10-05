import { useState } from 'react'
import { configs, InitialState } from './config'

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
			id: Date.now(),
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

import { useState } from 'react'
import TaskForm from './Forms/TaskForm'
import TaskItem from './TaskItem'

export default function TaskList() {
	const [tasks, setTasks] = useState([])

	const addTask = newTask => {
		setTasks(prev => [...prev, newTask])
	}
	return (
		<div>
			<TaskForm addTask={addTask} />
			{tasks.map(task => (
				<TaskItem
					key={task.id}
					title={task.title}
					description={task.description}
					dueDate={task.dueDate}
				/>
			))}
		</div>
	)
}

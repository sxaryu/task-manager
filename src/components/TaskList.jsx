import { useState } from 'react'
import TaskForm from './Forms/TaskForm'
import TaskItem from './TaskItem'

export default function TaskList() {
	const [tasks, setTasks] = useState([])

	const addTask = newTask => {
		setTasks(prev => [...prev, newTask])
	}

	const deleteTask = taskIdToDelete => {
		setTasks(prevTasks => prevTasks.filter(task => task.id !== taskIdToDelete))
	}
	return (
		<div>
			<TaskForm addTask={addTask} />
			{tasks.map(task => (
				<TaskItem
					key={task.id}
					id={task.id}
					title={task.title}
					description={task.description}
					dueDate={task.dueDate}
					deleteTask={deleteTask}
				/>
			))}
		</div>
	)
}

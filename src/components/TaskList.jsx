import TaskForm from './Forms/TaskForm'
import TaskItem from './TaskItem'
import { useState } from 'react'

export default function TaskList() {
	const [tasks, setTasks] = useState([])

	const addTask = newTask => {
		setTasks(prev => [...prev, newTask])
	}

	const deleteTask = idToDelete => {
		setTasks(prev => prev.filter(task => task.id !== idToDelete))
	}

	const editTask = (taskId, updatedData) => {
		setTasks(prevTasks =>
			prevTasks.map(task =>
				task.id === taskId ? { ...task, ...updatedData } : task
			)
		)
	}

	return (
		<div>
			<TaskForm addTask={addTask} />
			{tasks.map(task => (
				<TaskItem
					key={task.id}
					id={task.id}
					description={task.description}
					dueDate={task.dueDate}
					deleteTask={deleteTask}
					editTask={editTask}
				/>
			))}
		</div>
	)
}

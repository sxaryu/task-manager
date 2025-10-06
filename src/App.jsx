import TaskForm from './components/Forms/TaskForm'
import TaskItem from './components/TaskItem'
import { useState } from 'react'

function App() {
	const [tasks, setTasks] = useState([])

	window.tasks = tasks

	const addTask = newTask => {
		setTasks(prev => [...prev, newTask])
	}

	const deleteTask = oldTask => {
		setTasks(prev => [...prev, !oldTask])
	}
	return (
		<>
			<header>
				<h1>Task Manager</h1>
			</header>
			<main>
				<TaskForm
					addTask={addTask}
					deleteTask={deleteTask}
				/>
				{tasks.map(task => (
					<TaskItem
						key={task.id}
						title={task.title}
						description={task.description}
						dueDate={task.dueDate}
					/>
				))}
			</main>
		</>
	)
}

export default App

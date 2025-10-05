import TaskForm from './components/Forms/TaskForm'
import TaskItem from './components/TaskItem'
import { useState } from 'react'

function App() {
	const [tasks, setTasks] = useState([])

	const addTask = newTask => {
		setTasks(prev => [...prev, newTask])
	}
	return (
		<>
			<header>
				<h1>Task Manager</h1>
			</header>
			<main>
				<TaskForm addTask={addTask} />
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

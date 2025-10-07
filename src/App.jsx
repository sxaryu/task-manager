import useLocalStorage from './hooks/useLocalStorage'
import TaskForm from './components/Forms/TaskForm'
import TaskItem from './components/TaskItem'

function App() {
	const [tasks, setTasks] = useLocalStorage('tasks', [])

	const addTask = newTask => {
		setTasks(prev => [...prev, newTask])
	}

	const deleteTask = idToDelete => {
		setTasks(prev => prev.filter(task => task.id !== idToDelete))
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
						id={task.id}
						title={task.title}
						description={task.description}
						dueDate={task.dueDate}
						deleteTask={deleteTask}
					/>
				))}
			</main>
		</>
	)
}

export default App

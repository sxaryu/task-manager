import useLocalStorage from './hooks/useLocalStorage'
import TaskForm from './components/Forms/TaskForm'
import TaskItem from './components/TaskItem'

function App() {
	const [tasks, setTasks] = useLocalStorage('tasks', [])

	const addTask = newTask => {
		setTasks(prev => [...prev, { ...newTask, isFinished: false }])
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
						description={task.description}
						dueDate={task.dueDate}
						deleteTask={deleteTask}
						editTask={editTask}
						isFinished={task.isFinished}
					/>
				))}
			</main>
		</>
	)
}

export default App

import useLocalStorage from '../hooks/useLocalStorage'
import TaskForm from '../components/Forms/TaskForm'
import TaskItem from '../components/TaskItem'
import { useAuth } from '../hooks/AuthContext'

export default function TaskPage() {
	const [tasks, setTasks] = useLocalStorage('tasks', [])
	const { logout } = useAuth()

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
			<main className='border 4px rounded'>
				<TaskForm
					addTask={addTask}
					className='flex flex-col items-center p-7 rounded-2xl'
				/>
				{tasks.map(task => (
					<TaskItem
						className='flex flex-col items-center p-7 rounded-2xl'
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
			<button onClick={logout}>Выйти</button>
		</>
	)
}

import useLocalStorage from '../hooks/useLocalStorage'
import TaskForm from '../components/Forms/TaskForm'
import TaskItem from '../components/TaskItem'
import PrintReport from '../components/PrintReport'
import { useAuth } from '../hooks/AuthContext'
import { useState } from 'react'

export default function TaskPage() {
	const [tasks, setTasks] = useLocalStorage('tasks', [])
	const [searchTerm, setSearchTerm] = useState('')
	const { logout, currentUser } = useAuth()

	const categories = [
		'Администрирование',
		'Разработка',
		'Документация',
		'Поддержка'
	]

	const addTask = newTask => {
		setTasks(prev => [
			...prev,
			{
				...newTask,
				isFinished: false,
				createdAt: new Date().toISOString(),
				assignedTo: newTask.assignedTo || currentUser?.id
			}
		])
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

	const displayTasks =
		currentUser?.role === 'manager'
			? tasks
			: tasks.filter(task => task.assignedTo === currentUser?.id)

	const filteredTasks = displayTasks.filter(task =>
		task.description.toLowerCase().includes(searchTerm.toLowerCase())
	)

	return (
		<div className='min-h-screen min-w-screen bg-[#1f2121] text-white p-6'>
			<header className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3'>
				<h1 className='text-2xl font-semibold'>Task Manager</h1>

				<div className='flex items-center gap-3 w-full sm:w-auto'>
					<input
						type='text'
						placeholder='Поиск...'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
						className='flex-1 sm:flex-none px-3 py-2 rounded bg-[#2a2c2c] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4dbcda]'
					/>

					<button
						onClick={logout}
						className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors'
					>
						Выйти
					</button>
				</div>
			</header>

			<main className='flex flex-col gap-4'>
				{currentUser?.role === 'manager' && (
					<div className='mb-4'>
						<TaskForm addTask={addTask} />
						<PrintReport tasks={tasks} />
					</div>
				)}

				{currentUser?.role === 'employee' && (
					<div className='mb-4'>
						<PrintReport
							tasks={tasks.filter(task => task.assignedTo === currentUser.id)}
							defaultEmployeeId={currentUser.id}
							hideEmployeeSelect={true}
						/>
					</div>
				)}

				{filteredTasks.map(task => (
					<TaskItem
						key={task.id}
						id={task.id}
						description={task.description}
						dueDate={task.dueDate}
						createdAt={task.createdAt}
						category={task.category}
						categories={categories}
						deleteTask={deleteTask}
						editTask={editTask}
						isFinished={task.isFinished}
						role={currentUser?.role}
					/>
				))}
			</main>
		</div>
	)
}

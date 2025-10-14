import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './hooks/AuthContext'
import AuthPage from './pages/AuthPage'
import TaskPage from './pages/TaskPage'

function App() {
	const { currentUser } = useAuth()

	return (
		<Routes>
			<Route
				path='/auth'
				element={
					!currentUser ? (
						<AuthPage />
					) : (
						<Navigate
							to='/tasks'
							replace
						/>
					)
				}
			/>
			<Route
				path='/tasks'
				element={
					currentUser ? (
						<TaskPage />
					) : (
						<Navigate
							to='/auth'
							replace
						/>
					)
				}
			/>
			<Route
				path='/'
				element={
					<Navigate
						to={currentUser ? '/tasks' : '/auth'}
						replace
					/>
				}
			/>
		</Routes>
	)
}

export default App

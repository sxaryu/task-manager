import { createContext, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import useLocalStorage from './useLocalStorage'
import React from 'react'

const AuthContext = createContext()

export function AuthProvider(props) {
	const [users, setUsers] = useLocalStorage('users', [])
	const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null)

	const register = userData => {
		const newUser = {
			id: uuidv4(),
			...userData,
			createdAt: new Date().toISOString()
		}
		setUsers(prev => [...prev, newUser])
		setCurrentUser(newUser)
		return { success: true }
	}

	const login = (username, password) => {
		const user = users.find(
			u => u.username === username && u.password === password
		)
		if (user) {
			setCurrentUser(user)
			return { success: true }
		}
		return { success: false, error: 'Неверный логин или пароль' }
	}

	const logout = () => {
		setCurrentUser(null)
	}

	const value = {
		users,
		currentUser,
		register,
		login,
		logout
	}

	return React.createElement(
		AuthContext.Provider,
		{ value: value },
		props.children
	)
}
export function useAuth() {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used within AuthProvider')
	}
	return context
}

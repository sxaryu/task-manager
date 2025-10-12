import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/AuthContext'

export default function AuthPage() {
	const navigate = useNavigate()
	const { login, register } = useAuth()
	const [isLogin, setIsLogin] = useState(true)
	const [formData, setFormData] = useState({
		username: '',
		password: '',
		name: '',
		role: 'employee'
	})

	const handleChange = e => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value
		}))
	}

	const onSubmit = e => {
		e.preventDefault()
		if (isLogin) {
			const result = login(formData.username, formData.password)
			if (result.success) {
				navigate('/tasks')
				console.log('✅ Успешный вход!')
			} else {
				console.log('Вход не выполнен:', result.error)
			}
		} else {
			const result = register({
				username: formData.username,
				password: formData.password,
				name: formData.name,
				role: formData.role
			})
			if (result.success) {
				console.log('✅ Успешная регистрация!')
				navigate('/tasks')
			} else {
				console.log('❌ Ошибка регистрации:', result.error)
			}
		}
	}

	return (
		<div>
			<h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>

			<form onSubmit={onSubmit}>
				{!isLogin && (
					<input
						type='text'
						name='name'
						value={formData.name}
						onChange={handleChange}
						placeholder='Ваше имя'
					/>
				)}

				<input
					type='text'
					name='username'
					value={formData.username}
					onChange={handleChange}
					placeholder='Логин'
					autoComplete='current-username'
				/>

				<input
					type='password'
					name='password'
					value={formData.password}
					onChange={handleChange}
					placeholder='Пароль'
					autoComplete='current-password'
				/>

				{!isLogin && (
					<select
						name='role'
						value={formData.role}
						onChange={handleChange}
					>
						<option value='employee'>Сотрудник</option>
						<option value='manager'>Руководитель</option>
					</select>
				)}

				<button type='submit'>
					{isLogin ? 'Войти' : 'Зарегистрироваться'}
				</button>
			</form>

			<button onClick={() => setIsLogin(!isLogin)}>
				{isLogin
					? 'Нет аккаунта? Зарегистрироваться'
					: 'Уже есть аккаунт? Войти'}
			</button>
		</div>
	)
}

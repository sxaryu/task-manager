import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/AuthContext'

export default function AuthPage() {
	const navigate = useNavigate()
	const { login, register } = useAuth()
	const [isLogin, setIsLogin] = useState(true)
	const [formData, setFormData] = useState({
		username: '',
		surname: '',
		password: '',
		name: '',
		role: 'employee'
	})

	const handleChange = e => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
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
				name: formData.name,
				surname: formData.surname,
				username: formData.username,
				password: formData.password,
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
		<div className='min-h-screen min-w-screen flex items-center justify-center bg-[#1f2121] p-6'>
			<div className='w-full max-w-md bg-[#2a2c2c] rounded-xl p-6 shadow-lg'>
				<h2 className='text-2xl font-semibold text-white mb-6 text-center'>
					{isLogin ? 'Вход' : 'Регистрация'}
				</h2>

				<form
					className='flex flex-col gap-4'
					onSubmit={onSubmit}
				>
					{!isLogin && (
						<>
							<input
								type='text'
								name='name'
								value={formData.name}
								onChange={handleChange}
								placeholder='Имя'
								className='px-3 py-2 rounded bg-[#1f2121] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4dbcda]'
								required
								minLength={2}
							/>

							<input
								type='text'
								name='surname'
								value={formData.surname}
								onChange={handleChange}
								placeholder='Фамилия'
								className='px-3 py-2 rounded bg-[#1f2121] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4dbcda]'
								required
							/>
						</>
					)}

					<input
						type='text'
						name='username'
						value={formData.username}
						onChange={handleChange}
						placeholder='Логин'
						autoComplete='username'
						className='px-3 py-2 rounded bg-[#1f2121] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4dbcda]'
						required
					/>

					<input
						type='password'
						name='password'
						value={formData.password}
						onChange={handleChange}
						placeholder='Пароль'
						autoComplete='current-password'
						className='px-3 py-2 rounded bg-[#1f2121] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4dbcda]'
						required
						minLength={8}
					/>

					{!isLogin && (
						<select
							name='role'
							value={formData.role}
							onChange={handleChange}
							className='px-3 py-2 rounded bg-[#1f2121] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4dbcda] appearance-none pr-8'
						>
							<option value='employee'>Сотрудник</option>
							<option value='manager'>Руководитель</option>
						</select>
					)}

					<button
						type='submit'
						className='bg-[#4dbcda] text-white font-semibold px-4 py-2 rounded hover:bg-[#36b0c6] transition-colors'
					>
						{isLogin ? 'Войти' : 'Зарегистрироваться'}
					</button>
				</form>

				<button
					onClick={() => setIsLogin(!isLogin)}
					className='mt-4 text-[#4dbcda] hover:underline text-sm w-full text-center'
				>
					{isLogin
						? 'Нет аккаунта? Зарегистрироваться'
						: 'Уже есть аккаунт? Войти'}
				</button>
			</div>
		</div>
	)
}

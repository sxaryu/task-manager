import { useState } from 'react'

export default function AddEmployeeForm({ addEmployee, users }) {
	const [name, setName] = useState('')
	const [surname, setSurname] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = e => {
		e.preventDefault()
		if (
			!name.trim() ||
			!surname.trim() ||
			!username.trim() ||
			!password.trim()
		) {
			return alert('Заполните все поля')
		}

		// Проверка на уникальный логин
		if (users.some(u => u.username === username.trim())) {
			return alert('Такой логин уже существует')
		}

		const newUser = {
			id: Date.now().toString(),
			name: name.trim(),
			surname: surname.trim(),
			username: username.trim(),
			password: password,
			role: 'employee'
		}

		addEmployee(newUser) // Используем переданную функцию
		setName('')
		setSurname('')
		setUsername('')
		setPassword('')
		alert('Сотрудник добавлен')
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col gap-2 p-4 border border-gray-700 rounded bg-[#2a2c2c] mb-4'
		>
			<h3 className='text-lg font-semibold text-white'>Добавить сотрудника</h3>

			<input
				type='text'
				placeholder='Имя'
				value={name}
				onChange={e => setName(e.target.value)}
				className='px-3 py-2 rounded bg-[#1f2121] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#4dbcda]'
			/>
			<input
				type='text'
				placeholder='Фамилия'
				value={surname}
				onChange={e => setSurname(e.target.value)}
				className='px-3 py-2 rounded bg-[#1f2121] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#4dbcda]'
			/>
			<input
				type='text'
				placeholder='Логин'
				value={username}
				onChange={e => setUsername(e.target.value)}
				className='px-3 py-2 rounded bg-[#1f2121] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#4dbcda]'
			/>
			<input
				type='password'
				placeholder='Пароль'
				value={password}
				onChange={e => setPassword(e.target.value)}
				className='px-3 py-2 rounded bg-[#1f2121] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#4dbcda]'
			/>

			<button
				type='submit'
				className='px-3 py-2 bg-green-600 rounded hover:bg-green-700 transition-colors text-white'
			>
				Добавить сотрудника
			</button>
		</form>
	)
}

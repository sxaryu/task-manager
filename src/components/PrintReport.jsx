import React, { useState, useEffect } from 'react'
import { useAuth } from '../hooks/AuthContext'
import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'

export default function PrintReport({
	tasks,
	defaultEmployeeId = null,
	hideEmployeeSelect = false
}) {
	const { users, currentUser } = useAuth()
	const [employeeId, setEmployeeId] = useState(
		defaultEmployeeId || currentUser?.id || ''
	)
	const [startDate, setStartDate] = useState('')
	const [endDate, setEndDate] = useState('')

	useEffect(() => {
		if (defaultEmployeeId) setEmployeeId(defaultEmployeeId)
	}, [defaultEmployeeId])

	const printReport = () => {
		const user = users.find(u => u.id === employeeId)
		const employeeName = user
			? `${user.surname} ${user.name}`
			: 'Неизвестный сотрудник'

		const filteredTasks = tasks.filter(task => {
			if (task.assignedTo !== employeeId) return false
			const due = task.dueDate ? new Date(task.dueDate) : null
			return (
				(!startDate || (due && due >= new Date(startDate))) &&
				(!endDate || (due && due <= new Date(endDate)))
			)
		})

		function formatDate(dateString) {
			if (!dateString) return '—'
			try {
				return format(parseISO(dateString), 'd MMMM yyyy', { locale: ru })
			} catch {
				return dateString
			}
		}

		const reportWindow = window.open('', '_blank')
		reportWindow.document.write(`
      <html>
        <head>
          <title>Отчёт: ${employeeName}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
            h1, h2 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background: #f2f2f2; }
            .done { color: green; font-weight: bold; }
            .pending { color: red; font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>Отчёт о задачах сотрудника</h1>
          <h2>${employeeName}</h2>
          <p><strong>Период:</strong> ${startDate || '—'} — ${
			endDate || '—'
		}</p>
          <p><strong>Дата формирования:</strong> ${new Date().toLocaleDateString()}</p>

          <table>
            <tr>
              <th>#</th>
              <th>Задача</th>
              <th>Срок</th>
              <th>Статус</th>
              <th>Создана</th>
			  <th>Автор</th>
            </tr>
            ${filteredTasks
							.map((t, i) => {
								const author = users.find(u => u.id === t.createdBy)
								const authorName = author
									? `${author.surname} ${author.name}`
									: '—'
								return `
        <tr>
          <td>${i + 1}</td>
          <td>${t.description || '-'}</td>
          <td>${t.dueDate || '-'}</td>
          <td class="${t.isFinished ? 'done' : 'pending'}">
            ${t.isFinished ? 'Выполнена' : 'Не выполнена'}
          </td>
          <td>${formatDate(t.createdAt) || '-'}</td>
          <td>${authorName}</td>
        </tr>
      `
							})
							.join('')}
</table>

          <p><strong>Всего задач:</strong> ${filteredTasks.length}</p>
          <script>window.print();</script>
        </body>
      </html>
    `)
		reportWindow.document.close()
	}

	return (
		<div
			style={{
				padding: '20px',
				border: '1px solid #ccc',
				borderRadius: 8,
				maxWidth: 400
			}}
		>
			<h3>Печать отчёта</h3>

			{!hideEmployeeSelect && (
				<>
					<label>Сотрудник:</label>
					<select
						value={employeeId}
						onChange={e => setEmployeeId(e.target.value)}
						style={{ width: '100%', padding: 8, marginBottom: 10 }}
					>
						<option
							value=''
							disabled
						>
							Выберите сотрудника
						</option>
						{users
							.filter(u => u.role === 'employee')
							.map(u => (
								<option
									key={u.id}
									value={u.id}
								>
									{u.surname} {u.name}
								</option>
							))}
					</select>
				</>
			)}

			<label>Начало периода:</label>
			<input
				type='date'
				value={startDate}
				onChange={e => setStartDate(e.target.value)}
				style={{ width: '100%', padding: 8, marginBottom: 10 }}
			/>

			<label>Конец периода:</label>
			<input
				type='date'
				value={endDate}
				onChange={e => setEndDate(e.target.value)}
				style={{ width: '100%', padding: 8, marginBottom: 10 }}
			/>

			<button
				onClick={printReport}
				disabled={!employeeId}
				style={{
					width: '100%',
					padding: 10,
					backgroundColor: '#007bff',
					color: 'white',
					border: 'none',
					borderRadius: 6,
					cursor: 'pointer'
				}}
			>
				Печать отчёта
			</button>
		</div>
	)
}

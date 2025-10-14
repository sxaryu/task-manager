export function openPrintableWindow(employee, tasks) {
	const completed = tasks.filter(t => t.isFinished)
	const pending = tasks.filter(t => !t.isFinished)

	const reportWindow = window.open('', '_blank')

	reportWindow.document.write(`
    <html>
      <head>
        <title>Отчёт по задачам — ${employee.name}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 40px;
            color: #333;
          }
          h2 {
            text-align: center;
            margin-bottom: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
          }
          th, td {
            border: 1px solid #ccc;
            padding: 8px 10px;
            text-align: left;
          }
          th {
            background: #f2f2f2;
          }
          .done {
            color: green;
            font-weight: bold;
          }
          .pending {
            color: red;
            font-weight: bold;  
          }
        </style>
      </head>
      <body>
        <h2>Отчёт о задачах сотрудника ${employee.name}</h2>
        <p><strong>Дата формирования:</strong> ${new Date().toLocaleDateString()}</p>

        <h3>Выполненные задачи (${completed.length})</h3>
        ${renderTable(completed, true)}

        <h3>Невыполненные задачи (${pending.length})</h3>
        ${renderTable(pending, false)}

        <script>window.print();</script>
      </body>
    </html>
  `)

	reportWindow.document.close()
}

function renderTable(tasks, done) {
	if (tasks.length === 0)
		return `<p style="color: gray;">Нет ${
			done ? 'выполненных' : 'невыполненных'
		} задач</p>`
	return `
    <table>
      <tr>
        <th>#</th>
        <th>Задача</th>
        <th>Срок</th>
        <th>Статус</th>
        <th>Создана</th>
      </tr>
      ${tasks
				.map(
					(t, i) => `
        <tr>
          <td>${i + 1}</td>
          <td>${t.description}</td>
          <td>${t.dueDate || '-'}</td>
          <td class="${t.isFinished ? 'done' : 'pending'}">
            ${t.isFinished ? 'Выполнена' : 'Не выполнена'}
          </td>
          <td>${t.createdAt || '-'}</td>
        </tr>`
				)
				.join('')}
    </table>
  `
}

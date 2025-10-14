export const configs = [
	{
		name: 'description',
		placeholder: 'Задача',
		required: true
	},
	{
		name: 'dueDate',
		placeholder: 'Срок выполнения',
		required: true,
		type: 'date',
		min: '2020-01-01',
		max: '2050-12-31'
	},
	{
		name: 'category',
		placeholder: 'Категория',
		required: true
	}
]

export const InitialState = {
	description: '',
	dueDate: '',
	assignedTo: '',
	category: ''
}

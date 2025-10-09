export const configs = [
	{
		name: 'description',
		placeholder: 'Задача',
		required: false
	},
	{
		name: 'dueDate',
		placeholder: 'Срок выполнения',
		required: true,
		type: 'date'
	}
]

export const InitialState = {
	description: '',
	dueDate: ''
}

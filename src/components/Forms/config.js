export const configs = [
	{
		name: 'title',
		placeholder: 'Название задачи',
		required: true
	},
	{
		name: 'description',
		placeholder: 'Описание задачи',
		required: false
	},
	{
		name: 'dueDate',
		placeholder: 'Срок выполнения',
		required: false
	}
]

export const InitialState = {
	title: '',
	description: '',
	dueDate: ''
}

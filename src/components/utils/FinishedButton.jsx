export default function FinishedButton({ isFinished, setFinished }) {
	return (
		<button onClick={() => setFinished(!isFinished)}>
			{isFinished ? '✔' : '❌'}
		</button>
	)
}

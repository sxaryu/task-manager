export default function FinishedButton({ isFinished, onToggle }) {
	return <button onClick={onToggle}>{isFinished ? '✔' : '❌'}</button>
}

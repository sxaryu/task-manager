import { useState } from 'react'

export default function useLocalStorage(key, initialValue) {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = window.localStorage.getItem(key)
			return item ? JSON.parse(item) : initialValue
		} catch (error) {
			console.log('Error in localStorage:', error)
			return initialValue
		}
	})

	const setValue = value => {
		try {
			const valueToStore =
				value instanceof Function ? value(storedValue) : value

			setStoredValue(valueToStore)
			window.localStorage.setItem(key, JSON.stringify(valueToStore))
		} catch (error) {
			console.log('Error from setValue func:', error)
		}
	}

	return [storedValue, setValue]
}

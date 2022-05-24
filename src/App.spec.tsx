import { render } from '@testing-library/react'
import App from './App'

describe('Render App', () => {
	it('should renders without crashing', () => {
		render(<App />)
	})

	it('should renders with text "Hello World"', () => {
		const { getByText } = render(<App />)

		expect(getByText('Hello World')).toBeInTheDocument()
	})
})

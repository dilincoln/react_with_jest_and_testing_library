import { render } from '@testing-library/react'
import App from './App'

describe('Render App', () => {
	it('should renders without crashing', () => {
		render(<App />)
	})
})

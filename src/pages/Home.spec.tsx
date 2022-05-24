import { render } from '@testing-library/react'
import Home from './Home'

describe('Home page', () => {
	it('should renders with text "Hello World"', () => {
		const { getByText } = render(<Home />)

		expect(getByText('Hello World')).toBeInTheDocument()
	})
})

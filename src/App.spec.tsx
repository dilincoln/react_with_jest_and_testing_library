import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('Render App', () => {
	it('should renders without crashing', () => {
		render(<App />)
	})

	it('should render login page on root route path', () => {
		const { getByTestId } = render(<App />)

		const pageHeader = getByTestId('page-header-title')

		expect(pageHeader).toHaveTextContent('Login Page')
	})

	it('should be able to navigate to register page', async () => {
		const { getByTestId } = render(<App />)

		const registerLink = getByTestId('register-link')

		await userEvent.click(registerLink)

		const pageHeader = getByTestId('page-header-title')

		expect(pageHeader).toHaveTextContent('Register Page')
	})
})

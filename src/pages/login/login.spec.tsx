import { render } from '@testing-library/react'
import Login from './'

describe('Login page', () => {
	it('should render the login form', () => {
		const { getByTestId } = render(<Login />)

		const form = getByTestId('form-element')

		expect(form).toBeInTheDocument()
	})

	it('should render name input', () => {
		const { getByTestId } = render(<Login />)

		const nameInput = getByTestId('name-input')

		expect(nameInput).toBeInTheDocument()
	})

	it('should render password input', () => {
		const { getByTestId } = render(<Login />)

		const passwordInput = getByTestId('password-input')

		expect(passwordInput).toBeInTheDocument()
	})
})

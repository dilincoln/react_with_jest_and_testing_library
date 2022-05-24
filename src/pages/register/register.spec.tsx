import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Register from './'

describe('Register Page', () => {
	it('should render the register form', () => {
		const { getByTestId } = render(
			<MemoryRouter>
				<Register />
			</MemoryRouter>
		)

		const form = getByTestId('form-element')

		expect(form).toBeInTheDocument()
	})

	it('should render name input', () => {
		const { getByTestId } = render(
			<MemoryRouter>
				<Register />
			</MemoryRouter>
		)

		const nameInput = getByTestId('name-input')

		expect(nameInput).toBeInTheDocument()
	})

	it('should render password input', () => {
		const { getByTestId } = render(
			<MemoryRouter>
				<Register />
			</MemoryRouter>
		)

		const passwordInput = getByTestId('password-input')

		expect(passwordInput).toBeInTheDocument()
	})

	it('should render confirm password input', () => {
		const { getByTestId } = render(
			<MemoryRouter>
				<Register />
			</MemoryRouter>
		)

		const confirmPasswordInput = getByTestId('confirm-password-input')

		expect(confirmPasswordInput).toBeInTheDocument()
	})

	it('should render submit button', () => {
		const { getByTestId } = render(
			<MemoryRouter>
				<Register />
			</MemoryRouter>
		)

		const submitButton = getByTestId('submit-button')

		expect(submitButton).toBeInTheDocument()
	})

	it('should render user list', () => {
		const { getByText } = render(
			<MemoryRouter>
				<Register
					initialUsers={[
						{
							name: 'Diego Lincoln',
							password: '123456',
						},
						{
							name: 'Walter White',
							password: '123456',
						},
					]}
				/>
			</MemoryRouter>
		)

		expect(getByText('Diego Lincoln')).toBeInTheDocument()
		expect(getByText('Walter White')).toBeInTheDocument()
	})

	it('should be able to register a user', async () => {
		const { getByTestId, getByText, debug } = render(
			<MemoryRouter>
				<Register />
			</MemoryRouter>
		)

		const nameInput = getByTestId('name-input')
		const passwordInput = getByTestId('password-input')
		const confirmPasswordInput = getByTestId('confirm-password-input')

		const submitButton = getByTestId('submit-button')

		await userEvent.type(nameInput, 'John Doe')
		await userEvent.type(passwordInput, '123456')
		await userEvent.type(confirmPasswordInput, '123456')

		userEvent.click(submitButton)

		await waitFor(() => {
			expect(getByText('John Doe')).toBeInTheDocument()
		})
	})

	it('should not be able to add duplicated users', async () => {
		const { getByTestId } = render(
			<MemoryRouter>
				<Register
					initialUsers={[
						{
							name: 'Diego Lincoln',
							password: '123456',
						},
						{
							name: 'Walter White',
							password: '123456',
						},
					]}
				/>
			</MemoryRouter>
		)

		window.alert = jest.fn()

		const nameInput = getByTestId('name-input')
		const passwordInput = getByTestId('password-input')
		const confirmPasswordInput = getByTestId('confirm-password-input')

		const submitButton = getByTestId('submit-button')

		await userEvent.type(nameInput, 'Walter White')
		await userEvent.type(passwordInput, '123456')
		await userEvent.type(confirmPasswordInput, '123456')

		await userEvent.click(submitButton)

		expect(window.alert).toBeCalledWith('User name already exists')
	})

	it('should not be able to add users when password and password confirmation does not match', async () => {
		const { getByTestId } = render(
			<MemoryRouter>
				<Register />
			</MemoryRouter>
		)

		window.alert = jest.fn()

		const nameInput = getByTestId('name-input')
		const passwordInput = getByTestId('password-input')
		const confirmPasswordInput = getByTestId('confirm-password-input')

		const submitButton = getByTestId('submit-button')

		await userEvent.type(nameInput, 'Walter White')
		await userEvent.type(passwordInput, '1234567')
		await userEvent.type(confirmPasswordInput, '12345672')

		await userEvent.click(submitButton)

		expect(window.alert).toBeCalledWith('Password and password confirmation does not match')
	})

	it('should be able to filter user list', async () => {
		const { getByTestId, getAllByTestId } = render(
			<MemoryRouter>
				<Register
					initialUsers={[
						{
							name: 'Diego Lincoln',
							password: '123456',
						},
						{
							name: 'Walter White',
							password: '123456',
						},
					]}
				/>
			</MemoryRouter>
		)

		const searchUserInput = getByTestId('search-user-input')

		await userEvent.type(searchUserInput, 'Walter')

		const userList = getAllByTestId('user-list-item')

		expect(userList).toHaveLength(1)
		expect(userList[0]).toHaveTextContent('Walter White')
	})
})

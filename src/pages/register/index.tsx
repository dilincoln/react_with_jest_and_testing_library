import { useCallback, useState } from 'react'

type UserProps = {
	name: string
	password: string
}

type RegisterProps = {
	initialUsers?: UserProps[]
}

function Register(props?: RegisterProps) {
	const [users, setUsers] = useState<UserProps[]>(props?.initialUsers ?? [])
	const [userFilter, setUserFilter] = useState('')

	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const handleSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault()

			// Checks if the password and confirm password match
			if (password !== confirmPassword) {
				window.alert('Password and password confirmation does not match')

				return
			}

			// Checks if user name already exists
			const userNameExist = users.find((user) => user.name === name)

			if (userNameExist) {
				window.alert('User name already exists')

				return
			}

			// Adds the new user to the list of users
			setUsers([...users, { name, password }])
		},
		[name, password, confirmPassword]
	)

	// Clear the user filter to prevent the user from not seeing a recently created user
	const clearUsersFilter = useCallback(() => setUserFilter(''), [])

	return (
		<>
			<h1 data-testid='page-header-title'>Register Page</h1>

			<form data-testid='form-element' onSubmit={handleSubmit}>
				<input
					data-testid='name-input'
					type='text'
					placeholder='Nome'
					value={name}
					onChange={(e) => {
						clearUsersFilter()
						setName(e.target.value)
					}}
				/>

				<input
					data-testid='password-input'
					type='password'
					placeholder='Senha'
					value={password}
					onChange={(e) => {
						clearUsersFilter()
						setPassword(e.target.value)
					}}
				/>

				<input
					data-testid='confirm-password-input'
					type='password'
					placeholder='Confirmação de senha'
					value={confirmPassword}
					onChange={(e) => {
						clearUsersFilter()
						setConfirmPassword(e.target.value)
					}}
				/>

				<button data-testid='submit-button' type='submit'>
					Adicionar usuário
				</button>
			</form>

			<input
				data-testid='search-user-input'
				placeholder='Buscar usuário'
				type='text'
				value={userFilter}
				onChange={(e) => setUserFilter(e.target.value)}
			/>

			<ul>
				{users
					// Before render the list of users, it filters the list of users based on the query
					.filter((user) => {
						// If the query is empty, it returns all users
						if (userFilter === '') {
							return user
						} else {
							// If the query is not empty, it returns the users that match the query. Using include method the filter will works like "contains method"
							const userName = user.name.toLowerCase()

							const filter = userFilter.toLowerCase()

							return userName.includes(filter)
						}
					})
					.map((user) => (
						<li data-testid='user-list-item' key={user.name}>
							{user.name}
						</li>
					))}
			</ul>
		</>
	)
}

export default Register

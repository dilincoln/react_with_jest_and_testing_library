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

	return (
		<>
			<form data-testid='form-element' onSubmit={handleSubmit}>
				<input
					data-testid='name-input'
					type='text'
					placeholder='Nome'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>

				<input
					data-testid='password-input'
					type='password'
					placeholder='Senha'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<input
					data-testid='confirm-password-input'
					type='password'
					placeholder='Confirmação de senha'
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>

				<button data-testid='submit-button' type='submit'>
					Adicionar usuário
				</button>
			</form>

			<ul>
				{users.map((user) => (
					<li data-testid='user-list-item' key={user.name}>
						{user.name}
					</li>
				))}
			</ul>
		</>
	)
}

export default Register

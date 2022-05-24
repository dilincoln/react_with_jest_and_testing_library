import { Link } from 'react-router-dom'

function Login() {
	return (
		<>
			<h1 data-testid='page-header-title'>Login Page</h1>

			<form data-testid='form-element'>
				<input data-testid='name-input' type='text' placeholder='Nome' />

				<input data-testid='password-input' type='password' placeholder='Senha' />
			</form>

			<Link data-testid='register-link' to='/register'>
				Cadastrar usuário
			</Link>
		</>
	)
}

export default Login

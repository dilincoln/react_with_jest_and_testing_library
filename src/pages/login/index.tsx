function Login() {
	return (
		<form data-testid='form-element'>
			<input data-testid='name-input' type='text' placeholder='Nome' />
			<input data-testid='password-input' type='password' placeholder='Senha' />
		</form>
	)
}

export default Login

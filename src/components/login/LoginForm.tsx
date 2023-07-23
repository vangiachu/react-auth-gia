import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { CredentialResponse, GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

export const LoginForm = (props: {loginData: Function, success: Function}) => {
  const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

  const submit = async (e: SyntheticEvent) => {
		e.preventDefault();

		const {data} = await axios.post(
			'login',
			{
				email,
				password,
			},
		);

		props.loginData(data)
	};

  const onSuccess = async (googleUser: CredentialResponse) => {

		console.log(googleUser)

    const {status, data} = await axios.post('google-auth', {
      token: googleUser.credential
    }, {withCredentials: true})

    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`

    if (status === 200) {
      props.success()
    }
  }

  const onFailure = () => {
    console.log('Login Failed')
  }

  return (
    <GoogleOAuthProvider clientId="204431285224-irrli1v6vi2fju8fm5nbji380pqs29l1.apps.googleusercontent.com">
    <form onSubmit={submit}>
				<h1 className="h3 mb-3 fw-normal">Please sign in</h1>

				<div className="form-floating">
					<input
						type="email"
						className="form-control"
						id="floatingInput"
						placeholder="name@example.com"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label htmlFor="floatingInput">Email address</label>
				</div>
				<div className="form-floating">
					<input
						type="password"
						className="form-control"
						id="floatingPassword"
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<label htmlFor="floatingPassword">Password</label>
				</div>

				<div className="mb-3">
					<Link to="/forgot">Forgot password?</Link>
				</div>

				<button className="w-100 btn btn-lg btn-primary" type="submit">
					Sign in
				</button>
			</form>
			<GoogleLogin
				onSuccess={onSuccess}
				onError={onFailure}
			/>;
      {/* <GoogleLogin clientId='204431285224-irrli1v6vi2fju8fm5nbji380pqs29l1.apps.googleusercontent.com' 
      buttonText="Login with Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy="single_host_origin"
      className="mt-3 w-100"/> */}
      </GoogleOAuthProvider>
  )

}
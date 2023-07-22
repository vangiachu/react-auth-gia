import axios from "axios";
import { SyntheticEvent, useState } from "react";
import GoogleLogin, { GoogleLoginResponse } from "react-google-login";
import { Link } from "react-router-dom";

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

  const onSuccess = async (googleUser: any) => {

    const {status, data} = await axios.post('google-auth', {
      token: googleUser.tokenId
    }, {withCredentials: true})

    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`

    if (status === 200) {
      props.success()
    }
  }

  const onFailure = (e: any) => {
    alert(e.error)
  }

  return (
    <>
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
      <GoogleLogin clientId='204431285224-ti2j9a86eupqhv8gcq5qbta9aaj3r82d.apps.googleusercontent.com' 
      buttonText="Login with Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy="single_host_origin"
      className="mt-3 w-100"/>
      </>
  )

}
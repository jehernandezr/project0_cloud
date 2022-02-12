import React from "react";
import { useEffect } from "react";
import { useLoginForm } from "../../hooks/customHooks";
import "./LogiCard.scss";
import { Link, useHistory } from "react-router-dom";
import useUser from "../../hooks/useUser";


export const LoginCard = ({ onLogin }) => {
	const history = useHistory();

	const { isLoginLoading, hasLoginError, isLogged } = useUser();

	useEffect(() => {
		if (isLogged) {
			history.push("/events");
			onLogin && onLogin();
		}
	}, [isLogged, history, onLogin]);

	const { handleSubmit, handleInputChange, errors } = useLoginForm();
	return (
		<div className="login-container text-c animated flipInX">
			<div className="logo-badge text-whitesmoke">
				<span className="fa fa-user-circle"></span>
			</div>
			<h1 className="text-whitesmoke">
				signIn
			</h1>
			<div className="container-content">
				{isLoginLoading && (
					<strong>
						checkingCredentials
					</strong>
				)}
				{!isLoginLoading && (
					<form className="margin-t" onSubmit={handleSubmit}>
						<div className="form-group text-l">
							<label
								className="text-whitesmoke  margin-r-xxlg "
								htmlFor="emailField"
							>
								email:
							</label>
							<input
								className="form-control"
								type="email"
								id="emailField"
								name="email"
								required={true}
								autoComplete="email"
								onChange={handleInputChange}
							/>
							{errors!== undefined && errors['email'] && <p style={{ color: "red" }}>{errors['email']}</p>}
						</div>

						<div className="form-group text-l">
							<label
								className="text-whitesmoke  margin-r-xlg"
								htmlFor="passwordField"
							>password:
							</label>
							<input
								required={true}
								className="form-control"
								type="password"
								id="passwordField"
								name="password"
								onChange={handleInputChange}
							/>
							{errors!== undefined && errors['password'] && <p style={{ color: "red" }}>{errors['password']}</p>}
						</div>
						<br></br>
						<button type="submit" 
						className="form-button button-l margin-b"
						disabled={errors['email'] ||errors['password']||isLoginLoading}
						>signIn
						</button>
						<p className="text-whitesmoke text-center">
							<small>
								don't have an account?
							</small>
						</p>
						<Link className="text-darkyellow" to="signup">
							<small>
							signUp
							</small>
						</Link>
					</form>
				)}
				{hasLoginError && (
					<strong>
						invalidCredentials
					</strong>
				)}
				<p className="margin-t text-whitesmoke">
					<small> Events Company &copy; 2022</small>{" "}
				</p>
			</div>
		</div>
	);
};

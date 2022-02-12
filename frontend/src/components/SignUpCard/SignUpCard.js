import React, { useState, useEffect } from "react";
import { useSignUpForm } from "../../hooks/customHooks";
import { Link, useHistory } from "react-router-dom";
import useUser from "../../hooks/useUser";
import "./signupCard.scss";



export const SignUpCard = ({ onRegister }) => {
	const [registered, setRegistered] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { handleSubmit, handleInputChange, errors } = useSignUpForm();
	const history = useHistory();
	const { isLoginLoading, hasLoginError, isLogged } = useUser();
	const [password, setPassword] = useState();
	const [passwordConfirm, setPasswordConfirm] = useState();

	useEffect(() => {
		if (isLogged) {
			history.push("/events");
			onRegister && onRegister();
		}
	}, [isLogged, history, onRegister]);

	if (registered) {
		return (
			<h4 className="congratulations-message">
				Register SuccessFully
			</h4>
		);
	}
	return (
		<div className="signup-container text-c animated flipInX">
			<div className="logo-badge text-whitesmoke">
				<span className="fa fa-user-circle"></span>
			</div>
			<h1 className="text-whitesmoke">
				SignUp
			</h1>
			<div className="container-content">
				<form
					className="margin-t"
					onSubmit={(ev) => {
						handleSubmit(ev, setRegistered, setIsSubmitting);
					}}
				>
					<div className="form-group text-l">
						<label
							className="text-whitesmoke margin-r-lllg"
							htmlFor="nameField"
						>
							name:
						</label>

						<input
							className="form-control form-in-signup"
							type="text"
							id="nameField"
							name="name"
							required={true}
							autoComplete="name"
							onChange={handleInputChange}
						/>
						{errors !== undefined && errors["name"] && (
							<p style={{ color: "red" }}>{errors["name"]}</p>
						)}
					</div>

					<div className="form-group text-l">
						<label
							className="text-whitesmoke margin-r-xxxlg"
							htmlFor="emailField"
						>
							email:
						</label>
						<input
							className="form-control form-in-signup"
							type="text"
							id="emailField"
							name="email"
							required={true}
							autoComplete="email"
							onChange={handleInputChange}
						/>
						{errors !== undefined && errors["email"] && (
							<p style={{ color: "red" }}>{errors["email"]}</p>
						)}
					</div>
					<div className="form-group text-l">
						<label
							className="text-whitesmoke margin-r-llg"
							htmlFor="passwordField"
						>
							password:
						</label>

						<input
							className="form-control form-in-signup"
							type="password"
							id="passwordField"
							required={true}
							name="password"
							onChange={(e) => {
								setPassword(e.target.value);
								return handleInputChange(e);
							}}
						/>
						{errors !== undefined && errors["password"] && (
							<p style={{ color: "red" }}>{errors["password"]}</p>
						)}
	
					</div>

					<div className="form-group text-l">
						<label
							className="text-whitesmoke margin-r "
							htmlFor="passwordConfirmField"
						>
							passwordConfirm:
						</label>
						<input
							className="form-control form-in-signup"
							type="password"
							required={true}
							id="passwordConfirmField"
							name="passwordConfirm"
							onChange={(e) => {
								setPasswordConfirm(e.target.value);
								return handleInputChange(e);
							}}
						/>
						{errors !== undefined && errors["passwordConfirm"] && (
							<p style={{ color: "red" }}>{errors["passwordConfirm"]}</p>
						)}
						
					</div>

					<button
						type="submit"
						className="form-button button-l margin-b"
						disabled={
							errors["email"] ||
							errors["name"] ||
							errors["password"] ||
							errors["passwordConfirm"] ||
							isSubmitting ||
							isLoginLoading ||
							hasLoginError
						}
					>
						signUp
					</button>
					<p className="text-whitesmoke text-center">
						<small>
						already Have Account?
						</small>
					</p>
					<Link className="text-darkyellow" to="login">
						<small>
							signIn
						</small>
					</Link>
				</form>
			</div>
		</div>
	);
};

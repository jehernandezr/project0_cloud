import React, { useState } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import useUser from "../../hooks/useUser";
import "./Navbar.scss";
import {
	Button,
	Navbar,
	Nav,
	Form,
	FormControl,
	InputGroup,
	Dropdown,
} from "react-bootstrap";
import searchForm from "../../hooks/Search";
import { FormattedMessage, useIntl } from "react-intl";
import { LanguageSelector } from "../languageselector/LanguageSelector";

export const NavbarMovie = ({ setSearch, setLanguage }) => {
	const intl = useIntl();

	const [filterState, setFilter] = useState({ filter: "title" });

	const { isLogged, logout } = useUser();
	const match = useRouteMatch("/login");
	const matchred = useRouteMatch("/signup");
	const handleClick = (e) => {
		e.preventDefault();
		logout();
	};

  const renderLoginButtons = ({ isLogged }) => {
    return isLogged ? (
      <>
        <Link className="nav-link" to="/profile">
          <FormattedMessage id="profile"></FormattedMessage>
        </Link>
        <Link className="nav-link" to="#" onClick={handleClick}>
          <FormattedMessage id="logout"></FormattedMessage>
        </Link>
      </>
    ) : (
      <>
        <Link className="nav-link" to="/login">
          <FormattedMessage id="login"></FormattedMessage>
        </Link>
        <Link className="nav-link" to="/signup">
          <FormattedMessage id="register"></FormattedMessage>
        </Link>
      </>
    );
  };

  const content = match
    ? null
    : matchred
    ? null
    : renderLoginButtons({ isLogged });

	const { handleSubmit, handleInputChange } = searchForm({ setSearch });
	return (
		<Navbar id="mainNav" bg="dark" variant="dark" className="nav" expand="xl">
			<Link className="navbar-brand" to="/">
				<FormattedMessage id="landingPage"></FormattedMessage>
			</Link>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="col-12 col-md-12 col-lg-auto">
					<Link className="nav-link" to="/movies">
						<FormattedMessage id="movies"></FormattedMessage>
					</Link>
					<Link className="nav-link" to="/dashboard">
						<FormattedMessage id="dashboard"></FormattedMessage>
					</Link>
					<Link className="nav-link" to="/stats">
						<FormattedMessage id="stats"></FormattedMessage>
					</Link>
				</Nav>
				<Nav id="searchnav" className="col-12 col-md-12 col-lg-6">
					<Form inline onSubmit={handleSubmit} className="col-12">
						<InputGroup onChange={handleInputChange}>
							<InputGroup.Text id="textType">
								{intl.formatMessage({ id: filterState.filter })}
							</InputGroup.Text>
							{filterState.filter === "title" ? (
								<FormControl
									type="text"
									placeholder={intl.formatMessage({ id: "title" })}
									name="searchTitle"
								/>
							) : filterState.filter === "year" ? (
								<FormControl
									type="text"
									placeholder={intl.formatMessage({ id: "year" })}
									name="searchYear"
								/>
							) : filterState.filter === "synopsis" ? (
								<FormControl
									type="text"
									placeholder={intl.formatMessage({ id: "synopsis" })}
									name="searchSynopsis"
								/>
							) : null}
						</InputGroup>

						<Button
							className="col-sm-12 col-md-2"
							variant="outline-success"
							type="submit"
							id="searchButton"
						>
							<FormattedMessage id="search"></FormattedMessage>
						</Button>

						<Dropdown className="col-sm-12 col-md-3">
							<Dropdown.Toggle
								className="dropdown-button col-sm-12"
								variant="outline-success"
								id="filterButton"
							>
								<FormattedMessage id="filter"></FormattedMessage>
							</Dropdown.Toggle>
							<Dropdown.Menu
								id="filterMenu"
								className="col-sm-12 col-md-8"
								variant="dark"
							>
								<Dropdown.Item
									onClick={() => {
										setFilter({ filter: "title" });
									}}
									active
								>
									<FormattedMessage id="title"></FormattedMessage>
								</Dropdown.Item>
								<Dropdown.Item
									onClick={() => {
										setFilter({ filter: "year" });
									}}
								>
									<FormattedMessage id="year"></FormattedMessage>
								</Dropdown.Item>
								<Dropdown.Item
									onClick={() => {
										setFilter({ filter: "synopsis" });
									}}
								>
									<FormattedMessage id="synopsis"></FormattedMessage>
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Form>
				</Nav>
				<Nav className="col-md-2 col-sm-12">{content}</Nav>
				<Nav id="langSelect" className="col-sm-12 col-md-2">
					<LanguageSelector setLanguage={setLanguage}></LanguageSelector>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

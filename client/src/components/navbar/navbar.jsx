import React from 'react';
import { Link } from 'react-router-dom';
import { IS_LOGGED_IN } from '../../graphql/queries';
import { Query, ApolloConsumer } from 'react-apollo';
import Modal from '../modal';
import ConsoleDropdown from './console_dropdown';
import './navbar.scss';

class NavBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = { modalOpen: false, modalType: null, showDropdown: false };
		this.closeModal = this.closeModal.bind(this);
	}

	closeModal() {
		this.setState({ modalOpen: false, modalType: null });
	}

	render() {
		let dropdownBG = this.state.showDropdown ? 'dropdown-open' : undefined;
		let chevron = this.state.showDropdown ? (
			<i className="fas fa-chevron-up" />
		) : (
			<i className="fas fa-chevron-down" />
		);
		return (
			<ApolloConsumer>
				{client => (
					<div className="main-navbar-container">
						<div className="navbar-content">
							<div className="navbar-left">
								<div className="navbar-logo">
									<i className="fas fa-gamepad" />
									<p>GameHub</p>
								</div>
							</div>
							<div className="navbar-right">
								<div
									className={`nav-console-dropdown ${dropdownBG}`}
									onClick={() =>
										this.setState({
											showDropdown: !this.state.showDropdown
										})}
								>
									Consoles {chevron}
									{this.state.showDropdown && <ConsoleDropdown />}
								</div>
								<Query query={IS_LOGGED_IN}>
									{({ data }) => {
										if (data.isLoggedIn) {
											return (
												<div>
													<button
														onClick={e => {
															e.preventDefault();
															localStorage.removeItem('auth-token');
															client.writeData({
																data: { isLoggedIn: false }
															});
															this.props.history.push('/');
														}}
														className="session-button"
													>
														Logout
													</button>
												</div>
											);
										} else {
											return (
												<div>
													<button
														onClick={() =>
															this.setState({
																modalOpen: true,
																modalType: 'signup'
															})}
														className="session-button"
													>
														Signup
													</button>
													<button
														onClick={() =>
															this.setState({
																modalOpen: true,
																modalType: 'login'
															})}
														className="session-button"
													>
														Login
													</button>
												</div>
											);
										}
									}}
								</Query>
							</div>
						</div>
						{this.state.modalOpen && <Modal type={this.state.modalType} closeModal={this.closeModal} />}
						{this.state.showDropdown && (
							<div
								className="dropdown-modal-close"
								onClick={() =>
									this.setState({
										showDropdown: !this.state.showDropdown
									})}
							/>
						)}
					</div>
				)}
			</ApolloConsumer>
		);
	}
}

export default NavBar;

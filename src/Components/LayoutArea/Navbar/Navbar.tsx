import React, { Component, SyntheticEvent } from "react";
import { Unsubscribe } from "redux";
import { NavLink } from "react-router-dom";
import store from "../../../Redux/Store";
import UserModel from "../../AuthArea/Models/UserModel";
import { notificationService } from '../../../Services/NotificationService';
import "./Navbar.css";
import { globalManager } from "../../../Services/GlobalManager";

interface NavbarState {
    user: UserModel;
}

class Navbar extends Component<{}, NavbarState> {

    private unsubscribeFromRedux: Unsubscribe;

    public constructor(props: {}) {
        super(props);
        this.state = {
			user: null
        };
    }

    public componentDidMount(): void {
        this.unsubscribeFromRedux = store.subscribe(() => {
            const user = store.getState().authState.user;
            this.setState({ user });
        });
    }

    public componentWillUnmount(): void {
        this.unsubscribeFromRedux();
    }

    private applyLogout = (args: SyntheticEvent) => {
        globalManager.logout(this.state.user);
        notificationService.success("You are now Logged out!");
    }

    public render(): JSX.Element {
        return (
            <>
                <nav className="navbar">
                    <div className="navbar-container">
                        <NavLink to="/vacations" className="navbar-logo">
                            Vacations Online <i className="fas fa-plane-departure"></i>
                        </NavLink>

                        <ul className="nav-menu">
                            <li className="nav-item">
                                <NavLink to="/vacations" className="nav-links" exact>Vacations</NavLink>
                            </li>
                            <li className="nav-item">
                                {this.state.user === null && <NavLink to="/login" className="nav-links" exact>Login</NavLink>}
                            </li>

                            {this.state.user !== null &&
                                <li className="nav-item">
                                    <NavLink to="/login" className="nav-links" exact onClick={this.applyLogout}>Logout</NavLink>
                                </li>}

                            {/* For Admin */}
                            {this.state.user !== null && this.state.user.isAdmin === 1 &&
                                <li className="nav-item">
                                    < NavLink to="/vacations/new" className="nav-links" exact>Add New Vacation</NavLink>
                                </li>}

                            {this.state.user !== null && this.state.user.isAdmin === 1 &&
                                <li className="nav-item">
                                    < NavLink to="/reports" className="nav-links" exact>Reports</NavLink>
                                </li>}

                            <li className="nav-item">
                                <NavLink to="/register" className="nav-links" exact>Register</NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </>
        );
    }
}

export default Navbar;

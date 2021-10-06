import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import axios from "axios";
import UserModel from "../Models/UserModel";
import { Globals } from "../../../Services/Globals";
import { notificationService } from '../../../Services/NotificationService';
import store from "../../../Redux/Store";
import { userLoggedInAction } from "../../../Redux/AuthState";
import { socketManagerInstance } from "../../../Socket.io/SocketManager";
import "./Register.css";

function Register(): JSX.Element {

    const history = useHistory(); 

    const { register, handleSubmit, errors } = useForm<UserModel>();

    const validate = {
        containNumber: value => !value.match(/\d/),
        containWhite: value => !value.match(/\s/),
        containSymbols: value => !value.match(/[-!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/)}

    async function send(user: UserModel) {
        try {

            const responseUserCheck = await axios.get<UserModel>(Globals.authUrl + "usercheck/" + user.username);

            if (responseUserCheck.data) {
                notificationService.redMsg("Cannot register with given details");
                return;
            } else {
                await axios.post<UserModel>(Globals.authUrl + "register", user);
                notificationService.success("You are now Registered !");

                // Auto-login and redirect to vacations
                const responseUserLogged = await axios.post<UserModel>(Globals.authUrl + "login", user);
                const userInfo = responseUserLogged.data;

                // Redux - dispatch
                const action = userLoggedInAction(userInfo);
                store.dispatch(action);

                
                sessionStorage.setItem("userInfo", JSON.stringify(userInfo));

                // Socket.io
                socketManagerInstance.connect();

                notificationService.success("You are now Logged in! <br> Hello " + userInfo.firstName);
                history.push("/vacations");
            }
        }
        catch (err) {
            notificationService.error(err);
        }
    }

    return (
        <>
            <div className="form-container">
                <div className="form-content-center">
                    <form onSubmit={handleSubmit(send)}>
                        <br />
                        <h1 className="form-title">Register</h1>

                        <div className="form-inputs">
                            <label className="form-label">First name: </label> <br />
                            <input className="form-input" type="text" name="firstName" placeholder="Enter first name" ref={register({ required: true, minLength: 3, validate })} />
                            {errors.firstName?.type === "required" && <p>Missing first name.</p>}
                            {errors.firstName?.type === "minLength" && <p>First Name too short.</p>}
                            {errors.firstName?.type === "containNumber" && <p>First name can't contain number(s).</p>}
                            {errors.firstName?.type === "containWhite" && <p>First name can't contain white spaces.</p>}
                            {errors.firstName?.type === "containSymbols" && <p>First name can't contain symbol(s).</p>}
                            <br />

                            <label className="form-label">Last name: </label> <br />
                            <input className="form-input" type="text" name="lastName" placeholder="Enter last name" ref={register({ required: true, minLength: 3, validate })} />
                            {errors.lastName?.type === "required" && <p>Missing last name.</p>}
                            {errors.lastName?.type === "minLength" && <p>Last Name too short.</p>}
                            {errors.lastName?.type === "containNumber" && <p>Last name can't contain number(s).</p>}
                            {errors.lastName?.type === "containWhite" && <p>Last name can't contain white spaces.</p>}
                            {errors.lastName?.type === "containSymbols" && <p>Last name can't contain symbol(s).</p>}
                            <br />

                            <label className="form-label">Username: </label> <br />
                            <input className="form-input" type="text" name="username" placeholder="Enter username" ref={register({ required: true, minLength: 3, validate })} />
                            {errors.username?.type === "required" && <p>Missing username.</p>}
                            {errors.username?.type === "minLength" && <p>Username too short.</p>}
                            {errors.username?.type === "containNumber" && <p>Username can't contain number(s).</p>}
                            {errors.username?.type === "containWhite" && <p>Username can't contain white spaces.</p>}
                            {errors.username?.type === "containSymbols" && <p>Username can't contain symbol(s).</p>}
                            <br />

                            <label className="form-label">Password: </label> <br />
                            <input className="form-input" type="password" name="password" placeholder="Enter password" ref={register({ required: true, minLength: 3 })} />
                            {errors.password?.type === "required" && <p>Missing password.</p>}
                            {errors.password?.type === "minLength" && <p>Password too short.</p>}
                            <br />

                        </div>
                        <button className="form-input-btn">Register</button> <br />
                        <span className="form-input-login">Already registered? <NavLink to="/login" exact>Login here</NavLink></span>
                    </form>

                </div>
            </div>

        </>
    );
}

export default Register;

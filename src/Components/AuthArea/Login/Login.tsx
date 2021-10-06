import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import axios from "axios";
import UserModel from "../Models/UserModel";
import { Globals } from "../../../Services/Globals";
import "./Login.css";
import store from "../../../Redux/Store";
import { userLoggedInAction } from "../../../Redux/AuthState";
import { socketManagerInstance } from "../../../Socket.io/SocketManager";
import { notificationService } from '../../../Services/NotificationService';


function Login(): JSX.Element {
    const history = useHistory();
    const validate = {
        containNumber: value => !value.match(/\d/),
        containWhite: value => !value.match(/\s/),
        containSymbols: value => !value.match(/[-!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/)
    }
    const { register, handleSubmit, errors} = useForm<UserModel>();

    async function send(user: UserModel) {
        try {
            const response = await axios.post<UserModel>(Globals.authUrl + "login", user);
            const userInfo = response.data;
            
            // Redux - dispatch
            const action = userLoggedInAction(userInfo);
            store.dispatch(action);

           
            sessionStorage.setItem("userInfo", JSON.stringify(userInfo));

            // Socket.io
            socketManagerInstance.connect();

            notificationService.success("You are now Logged in! <br> Hello " + userInfo.firstName);
            history.push("/vacations");
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
                        <h1 className="form-title">Login</h1>
                        <div className="form-inputs">
                            <label className="form-label">Username: </label> <br />
                            <input className="form-input" type="text" name="username" placeholder="Enter username" ref={register({ required: true, minLength: 3, validate })} />
                            {errors.username?.type === "required" && <p>Missing username.</p>}
                            {errors.username?.type === "minLength" && <p>Username too short.</p>}
                            {errors.username?.type === "containNumber" && <p>Username can't contain number(s).</p>}
                            {errors.username?.type === "containWhite" && <p>Username can't contain white spaces.</p>}
                            {errors.username?.type === "containSymbols" && <p>Username can't contain symbol(s).</p>}
                            <br /><br />

                            <label className="form-label">Password: </label> <br />
                            <input className="form-input" type="password" name="password" placeholder="Enter password" ref={register({ required: true, minLength: 3 })} />
                            {errors.password?.type === "required" && <p>Missing password.</p>}
                            {errors.password?.type === "minLength" && <p>Password too short.</p>}
                            <br /><br />
                        </div>

                        <button className="form-input-btn">Login</button><br />
                        <span className="form-input-register">Dont have a user? <NavLink to="/register" exact>Register here</NavLink></span>
                    </form>

                </div>
            </div>


        </>
    );
}

export default Login;

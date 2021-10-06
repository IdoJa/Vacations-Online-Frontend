import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import Page404 from "../Page404/Page404";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import EditVacation from "../../VacationsArea/EditVacation/EditVacation";
import Reports from "../../ReportsArea/Reports/Reports";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Switch>
                <Route path="/vacations" component={VacationsList} exact />
                <Route path="/vacations/new" component={AddVacation} exact />
                <Route path="/vacations/edit/:vacId" component={EditVacation} exact />
                <Route path="/login" component={Login} exact />
                <Route path="/register" component={Register} exact />
                <Route path="/reports" component={Reports} exact />
                <Redirect from="/" to="/login" exact />
                <Route component={Page404} />

            </Switch>
        </div>
    );
}

export default Routing;

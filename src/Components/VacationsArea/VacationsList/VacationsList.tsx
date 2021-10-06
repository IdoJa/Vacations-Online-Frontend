import React, { Component } from "react";
import store from "../../../Redux/Store";
import Axios from "axios";
import UserModel from "../../AuthArea/Models/UserModel";
import "./VacationsList.css";
import { Unsubscribe } from "redux";
import { Globals } from "../../../Services/Globals";
import VacationModel from "../Models/VacationModel";
import { vacationsDownloadedAction } from "../../../Redux/VacationsState";
import VacationAdminCard from "../VacationAdminCard/VacationAdminCard";
import { History } from "history";
import VacationUserCard from "../VacationUserCard/VacationUserCard";
import { notificationService } from '../../../Services/NotificationService';
import { globalManager } from "../../../Services/GlobalManager";
import loading from "../../../assets/images/loading.gif";


interface VacationsListState {
    user: UserModel;
    vacations: VacationModel[];
}

interface VacationsListProps {
    history: History;
}


class VacationsList extends Component<VacationsListProps, VacationsListState> {
    private unsubscribeFromRedux: Unsubscribe;

    public constructor(props: VacationsListProps ) {
        super(props);
        this.state = {
            user: store.getState().authState.user,
            vacations: store.getState().vacationsState.vacations
        };
    }

    public async componentDidMount() {
        this.unsubscribeFromRedux = store.subscribe(() => {
            const vacations = store.getState().vacationsState.vacations
            this.setState({ vacations });
        });


        try { 
            // No user logged in
            if (store.getState().authState.user === null) {
                notificationService.redMsg("You have to log in to view vacations");
                this.props.history.push("/login");
                return;
            }

            
            // For user
            if (store.getState().authState.user.isAdmin === 0) {
                if (store.getState().vacationsState.vacations.length === 0) {
                    
                    const response = await Axios.get<VacationModel[]>(Globals.vacationsUrl + "user/" + this.state.user.uuid,
                           { headers: { 'Authorization': `Bearer ${this.state.user.token}` } });


                    const vacations = response.data;
                    this.setState({ vacations });


                    // Redux - dispatch
                    const action = vacationsDownloadedAction(vacations);
                    store.dispatch(action) // Redux will invoke the reducer ! (and update the global data)
                }
            }

            // For Admin
            if (store.getState().authState.user.isAdmin === 1) {
                if (store.getState().vacationsState.vacations.length === 0) {
                    const response = await Axios.get<VacationModel[]>(Globals.vacationsUrl,
                        { headers: { 'Authorization': `Bearer ${this.state.user.token}` } }); 
                    
                    
                    const vacations = response.data;
                    this.setState({ vacations });


                    // Redux - dispatch
                    const action = vacationsDownloadedAction(vacations);
                    store.dispatch(action) // Redux will invoke the reducer ! (and update the global data)
                }
            }

            
        }
        catch (err) {
            notificationService.error(err);
            globalManager.logout(this.state.user);
            this.props.history.push("/login");
        }
    }

     
    public componentWillUnmount(): void {
        this.unsubscribeFromRedux();
    }

    public render(): JSX.Element {
        return (
            <div className="VacationsList">
                {this.state.vacations.length === 0 && <img className="Loading" src={loading} />}

                {/* User */}
                {store.getState().authState.user !== null && store.getState().authState.user.isAdmin === 0 && this.state.vacations.map(v =>
                    <VacationUserCard key={v.vacationId} vacation={v} />
                )}

                {/* Admin */}
                {store.getState().authState.user !== null && store.getState().authState.user.isAdmin === 1 && this.state.vacations.map(v =>
                    <VacationAdminCard key={v.vacationId} vacation={v}/>
                )}   
            </div>
        );
    }
}

export default VacationsList;

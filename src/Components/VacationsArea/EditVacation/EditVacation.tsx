import React from "react";
import { RouteComponentProps, useHistory, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Globals } from "../../../Services/Globals";
import axios from "axios";
import store from "../../../Redux/Store";
import "./EditVacation.css";
import VacationModel from "../Models/VacationModel";
import { notificationService } from '../../../Services/NotificationService';
import { globalManager } from "../../../Services/GlobalManager";

interface MatchParams {
    vacId: string;
}

interface EditVacationProps extends RouteComponentProps<MatchParams> { }

function EditVacation(props: EditVacationProps): JSX.Element {
    const history = useHistory();
    

    // With Redux:  
    const vacation = store.getState().vacationsState.vacations.find(v => v.vacationId === +props.match.params.vacId);
    const { register, handleSubmit, errors } = useForm<VacationModel>({ defaultValues: vacation });
    const validate = {
        containNumber: value => !value.match(/\d/),
        containWhite: value => !value.match(/\s/),
        containSymbols: value => !value.match(/[-!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/)
    }


    // Update the vacation
    async function send(vacation: VacationModel) {

        try {
            const myFormData = new FormData();
            myFormData.append("destination", vacation.destination);
            myFormData.append("description", vacation.description);
            myFormData.append("price", vacation.price.toString());
            myFormData.append("fromDate", vacation.fromDate);
            myFormData.append("toDate", vacation.toDate);
            myFormData.append("image", vacation.image.item(0));

            await axios.put<VacationModel>(Globals.vacationsUrl + props.match.params.vacId, myFormData,
                { headers: { 'Authorization': `Bearer ${store.getState().authState.user.token}` } });

           
            notificationService.success("Vacation Updated !");
            history.push("/vacations");
        }
        catch (err) {
            notificationService.error(err);
            globalManager.logout(store.getState().authState.user);
            history.push("/login");
        }
    }

    return (
        <div className="form-container">
            <div className="form-content-center">
                <form onSubmit={handleSubmit(send)}>
                    <br />
                    <h1 className="form-title">Edit Vacation</h1>
                    <div className="form-inputs">
                        <label className="form-label">Destination: </label> <br />
                        <input className="form-input" type="text" name="destination" ref={register({ required: true, minLength: 3, maxLength: 50, validate })} />
                        {errors.destination?.type === "required" && <p>Missing destination.</p>}
                        {errors.destination?.type === "minLength" && <p>Destination too short.</p>}
                        {errors.destination?.type === "maxLength" && <p>Destination too long.</p>}
                        {errors.destination?.type === "containNumber" && <p>Destination can't contain number(s).</p>}
                        {errors.destination?.type === "containWhite" && <p>Destination can't contain white spaces.</p>}
                        {errors.destination?.type === "containSymbols" && <p>Destination can't contain symbol(s).</p>}

                        <label className="form-label">Description: </label> <br />
                        <input className="form-input" type="text" name="description" ref={register({ required: true, minLength: 5, maxLength: 250  })} />
                        {errors.description?.type === "required" && <p>Missing description.</p>}
                        {errors.description?.type === "minLength" && <p>Description too short.</p>}
                        {errors.description?.type === "maxLength" && <p>Description too long.</p>}

                        <label className="form-label">Price: </label> <br />
                        <input className="form-input" type="number" name="price" step="0.01" ref={register({ required: true, min: 1, max: 10000 })} />
                        {errors.price?.type === "required" && <p>Missing price.</p>}
                        {errors.price?.type === "min" && <p>Price too low.</p>}
                        {errors.price?.type === "max" && <p>Price too high.</p>}

                        <label className="form-label">From Date: </label> <br />
                        <input className="form-input" type="date" name="fromDate" ref={register({ required: true })} />
                        {errors.fromDate?.type === "required" && <p>Missing from date.</p>}

                        <label className="form-label">To Date: </label> <br />
                        <input className="form-input" type="date" name="toDate" ref={register({ required: true })} />
                        {errors.toDate?.type === "required" && <p>Missing to date.</p>}

                        <label className="form-label">Image: </label> <br />
                        <input className="form-input" type="file" name="image" accept="image/*" ref={register({ required: true })} />
                        {errors.image?.type === "required" && <p>Missing image.</p>}

                    </div>
                    <button className="form-input-btn">Update</button> <br />
                    <span className="form-input-back"><NavLink to="/vacations">Back to Vacation List</NavLink></span>
                    <br />
                </form>
            </div>
        </div>
    );
}

export default EditVacation;

import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Globals } from "../../../Services/Globals";
import axios from "axios";
import store from "../../../Redux/Store";
import VacationModel from "../Models/VacationModel";
import "./VacationAdminCard.css";
import { notificationService } from '../../../Services/NotificationService';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { globalManager } from "../../../Services/GlobalManager";
import moment from 'moment'

interface VacationAdminCardProps {
    vacation: VacationModel;
}

function VacationAdminCard(props: VacationAdminCardProps): JSX.Element {
    const history = useHistory();
    
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                maxWidth: 345,
            },
            media: {
                height: 0,
                paddingTop: '56.25%', // 16:9
            }
        }),
    );

    const classes = useStyles();


    async function deleteVacation() {
        
        

        const answer = window.confirm("Are you sure?");
        if (!answer) {
            return;
        }


        try {
            await axios.delete<VacationModel>(Globals.vacationsUrl + props.vacation.vacationId,
                { headers: { 'Authorization': `Bearer ${store.getState().authState.user.token}` } });
            
            notificationService.success("Vacation Deleted !");
        }
        catch (err) {
            notificationService.error(err);
            globalManager.logout(store.getState().authState.user);
            history.push("/login");
        }  
    }
    


    return (
        <div className="VacationAdminCard">

            {/* Material UI Card */}
            <Card className={classes.root}>
                {/* Destination */}
                <CardHeader
                    title={props.vacation.destination}
                />

                {/* From Date */}
                <Typography variant="h6" color="textSecondary">
                    From {moment(new Date(props.vacation.fromDate)).format('DD/MM/YYYY')}
                </Typography>

                {/* To Date */}
                <Typography variant="h6" color="textSecondary">
                    To {moment(new Date(props.vacation.toDate)).format('DD/MM/YYYY')}
                </Typography>

                {/* Image */}
                <CardMedia
                    className={classes.media}
                    image={Globals.vacationsUrl + "images/" + props.vacation.imageFileName}
                />
                <CardContent>
                    {/* Price */}
                    <Typography variant="h4" color="textPrimary">
                        &#36; {props.vacation.price}
                    </Typography>

                    {/* Description */}
                    <Typography variant="body2" color="textSecondary">
                        {props.vacation.description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton>
                        <NavLink to={"/vacations/edit/" + props.vacation.vacationId}><EditIcon /></NavLink>
                    </IconButton>
                    <IconButton onClick={deleteVacation}>
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    );
}

export default VacationAdminCard;

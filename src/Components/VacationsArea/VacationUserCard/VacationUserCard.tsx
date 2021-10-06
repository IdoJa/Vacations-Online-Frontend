import React, { useEffect, useState } from "react";
import VacationModel from "../Models/VacationModel";
import FollowModel from "../Models/FollowModel";
import "./VacationUserCard.css";
import { Globals } from "../../../Services/Globals";
import axios from "axios";
import store from "../../../Redux/Store";
import { notificationService } from '../../../Services/NotificationService';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { vacationFollowed, vacationUnfollowed } from "../../../Redux/VacationsState";
import { globalManager } from "../../../Services/GlobalManager";
import moment from 'moment'



interface VacationUserCardProps {
    vacation: VacationModel;
}

function VacationUserCard(props: VacationUserCardProps): JSX.Element {
    const [clicked, setClicked] = useState(false)

    useEffect(() => {
        (async function () {
            if (props.vacation.isFollowed === 1) {
                setClicked(true);
            }
        })();
    }, []);

    const handleIconClick = async () => {

        let followDetails = { "uuid": store.getState().authState.user.uuid, "vacationId": props.vacation.vacationId };
        if (clicked === false) {
            setClicked(true);

            // Insert follow
            try {
                await axios.post<FollowModel>(Globals.followUrl, followDetails,
                    { headers: { 'Authorization': `Bearer ${store.getState().authState.user.token}` } });
                
                
                store.dispatch(vacationFollowed(props.vacation));
            }
            catch (err) {
                notificationService.error(err);
                globalManager.logout(store.getState().authState.user);
            }

            
            // Delete follow
            } else  {
                setClicked(false);

            try {
                await axios.delete<FollowModel>(Globals.followUrl + store.getState().authState.user.uuid + "/" + props.vacation.vacationId,
                    { headers: { 'Authorization': `Bearer ${store.getState().authState.user.token}` } });
                
                store.dispatch(vacationUnfollowed(props.vacation));
            }
            catch (err) {
                notificationService.error(err);
                globalManager.logout(store.getState().authState.user);
            }

        }
    }

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

    return (
        <div className="VacationUserCard">
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
                    <IconButton aria-label="follow" onClick={handleIconClick}>
                        {clicked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    );
}

export default VacationUserCard;

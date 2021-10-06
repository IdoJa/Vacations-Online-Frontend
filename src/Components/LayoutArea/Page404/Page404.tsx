import React, { useEffect } from "react";
import { notificationService } from "../../../Services/NotificationService";
import "./Page404.css";

function Page404(): JSX.Element {

    useEffect(() => {
        (async function () {
            notificationService.redMsg("The page you are looking for doesn't exist");
        })();
    }, []);

    return (
        <div className="Page404">
            <h1>404<i className="fas fa-exclamation-triangle"></i></h1>
            <p>The page you are looking for doesn't exist.</p>
        </div>
    );
}

export default Page404;

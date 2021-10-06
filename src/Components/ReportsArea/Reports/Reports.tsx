import React, { Component } from "react";
import BarChart from "../BarChart/BarChart";
import Axios from "axios";
import { Globals } from "../../../Services/Globals";
import ReportData from "../Models/ReportData";
import store from "../../../Redux/Store";
import { notificationService } from '../../../Services/NotificationService';
import { History } from "history";
import "./Reports.css";
import { globalManager } from "../../../Services/GlobalManager";


interface ReportsState {
    chartData: {}
}

interface ReportsProps {
    history: History;
}

class Reports extends Component<ReportsProps, ReportsState> {

    public constructor(props: ReportsProps) {
        super(props);
        this.state = {  chartData: {}}
    };

    public async componentDidMount() {
        // Label - X - Destination, Data - Y - Follows
        try {
            const response = await Axios.get<ReportData[]>(Globals.vacationsUrl + "reports",
                { headers: { 'Authorization': `Bearer ${store.getState().authState.user.token}` } });


            let reportData = response.data;

            let vacationsChartData = await this.arrangeVacationsData(reportData);


            this.setState({ chartData: vacationsChartData });
        }
        catch (err) {
            notificationService.error(err);
            globalManager.logout(store.getState().authState.user);
            this.props.history.push("/login");
        }
    }

    public async arrangeVacationsData(reportData) {
        let destinations = [];
        let follows = [];
        let backgroundColor = [];
        let r = 249, g = 177, b = 193; // RGB Pink Colors
        let alpha = 1; // Alpha - transparency

        // Separating data into arrays
        for (const prop in reportData) {
            destinations.push(reportData[prop].destination);
            follows.push(reportData[prop].follows);
            backgroundColor.push(`rgba(${r}, ${g}, ${b}, ${alpha})`);
        }

        let vacationsChartData = {
            labels: destinations,
            datasets: [
                {
                    label: 'Follows',
                    data: follows,
                    backgroundColor

                }
            ]
        }

        return vacationsChartData;
    }

    public render(): JSX.Element {
        return (
            <div className="Reports">
                <h2>Reports</h2>
                
                <BarChart chartData={ this.state.chartData }/>
            </div>
        );
    }
}

export default Reports;

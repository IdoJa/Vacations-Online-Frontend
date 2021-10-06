import { io, Socket } from "socket.io-client";
import VacationModel from "../Components/VacationsArea/Models/VacationModel";
import store from "../Redux/Store";
import { vacationAddedAction, vacationDeleted, vacationUpdated } from "../Redux/VacationsState";

class SocketManager {

    private socket: Socket;

    public connect(): void {

        // Connect to socket.io:
        this.socket = io("http://localhost:3001");

        // Listen to socket.io events:
        this.socket.on("msg-from-server-vacation-added", (addedVacation: VacationModel) => {
            store.dispatch(vacationAddedAction(addedVacation));
        });

        this.socket.on("msg-from-server-vacation-updated", (updatedVacation: VacationModel) => {
            store.dispatch(vacationUpdated(updatedVacation));
        });

        this.socket.on("msg-from-server-vacation-deleted", (deletedVacation: VacationModel) => {
            store.dispatch(vacationDeleted(deletedVacation));
        });
    }

    public disconnect(): void {
        this.socket.disconnect();
    }
}

export default SocketManager;

export const socketManagerInstance = new SocketManager();
import UserModel from "../Components/AuthArea/Models/UserModel";
import { vacationClear } from "../Redux/VacationsState";
import { socketManagerInstance } from "../Socket.io/SocketManager";
import store from "../Redux/Store";
import { userLoggedOutAction } from "../Redux/AuthState";


export class GlobalManager {
    public logout(user: UserModel) {
        store.dispatch(userLoggedOutAction(user));
        sessionStorage.clear();
        store.dispatch(vacationClear());
        socketManagerInstance.disconnect();
    }
}

export default GlobalManager;

export const globalManager = new GlobalManager();

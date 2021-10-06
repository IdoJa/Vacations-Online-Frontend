import UserModel from "../Components/AuthArea/Models/UserModel";


// Auth App State:
export class AuthState {
    public user: UserModel = null; // The data in the app level.
    public constructor() {
        const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        if (userInfo) {
            this.user = userInfo;
        }
    }
}

// User Action Type:
export enum AuthActionType {
    UserLoggedIn = "UserLoggedIn",
    UserLoggedOut = "UserLoggedOut"
}

// User Action:
export interface AuthAction {
    type: AuthActionType; // What has been done
    payload?: any; // The data itself
}

// User Action Creators: 
export function userLoggedInAction(user: UserModel): AuthAction {
    return { type: AuthActionType.UserLoggedIn, payload: user };
}
export function userLoggedOutAction(user: UserModel): AuthAction {
    return { type: AuthActionType.UserLoggedOut, payload: user };
}

// User Reducer: 
export function authReducer(currentState: AuthState = new AuthState(), action: AuthAction): AuthState {
    const newState = { ...currentState };

    switch (action.type) {

        case AuthActionType.UserLoggedIn:
            newState.user = action.payload;
            break;

        case AuthActionType.UserLoggedOut:
            newState.user = null;
            break;
    }

    
    return newState;
}

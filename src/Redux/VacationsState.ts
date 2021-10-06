import VacationModel from "../Components/VacationsArea/Models/VacationModel";

export class VacationsState {
    public vacations: VacationModel[] = [];
}

// Vacations Action Types:
export enum VacationsActionType {
    VacationsDownloaded = "VacationsDownloaded",
    VacationAdded = "VacationAdded",
    VacationUpdated = "VacationUpdated",
    VacationDeleted = "VacationDeleted",
    VacationClear = "VacationClear",
    VacationFollowed = "VacationFollowed",
    VacationUnfollowed = "VacationUnfollowed"
}

// Vacations Action
export interface VacationsAction {
    type: VacationsActionType,
    payload?: any
}

// Vacations Action Creators:
export function vacationsDownloadedAction(vacations: VacationModel[]): VacationsAction {
    return { type: VacationsActionType.VacationsDownloaded, payload: vacations };
}
export function vacationAddedAction(vacation: VacationModel): VacationsAction {
    return { type: VacationsActionType.VacationAdded, payload: vacation };
}
export function vacationUpdated(vacation: VacationModel): VacationsAction {
    return { type: VacationsActionType.VacationUpdated, payload: vacation };
}
export function vacationDeleted(vacation: VacationModel): VacationsAction {
    return { type: VacationsActionType.VacationDeleted, payload: vacation };
}
export function vacationClear(): any {
    return { type: VacationsActionType.VacationClear };
}
export function vacationFollowed(vacation: VacationModel): VacationsAction {
    return { type: VacationsActionType.VacationFollowed, payload: vacation };
}
export function vacationUnfollowed(vacation: VacationModel): VacationsAction {
    return { type: VacationsActionType.VacationUnfollowed, payload: vacation };
}



// Vacation Reducer
export function vacationsReducer(currentState: VacationsState = new VacationsState(), action: VacationsAction): VacationsState {
    const newState = { ...currentState };

    switch (action.type) {
        case VacationsActionType.VacationsDownloaded:
            newState.vacations = action.payload; // payload = all vacations
            break;
        
        case VacationsActionType.VacationAdded:
            newState.vacations.push(action.payload); // payload = the added vacation
            break;
        
        case VacationsActionType.VacationUpdated:
            const indexToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload.vacationId); 
            newState.vacations[indexToUpdate] = action.payload; // payload = the updated vacation
            break;
        
        case VacationsActionType.VacationDeleted:
            const indexToDelete = newState.vacations.findIndex(v => v.vacationId === action.payload); // payload = the id
            newState.vacations.splice(indexToDelete, 1);
            break;
        
        case VacationsActionType.VacationClear:
            newState.vacations = [];
            break;
        
        case VacationsActionType.VacationFollowed:  
            // Step 0 - Set to the selected vacation: isFollowed: 1
            const indexToUpdateFollow = newState.vacations.findIndex(v => v.vacationId === action.payload.vacationId);
            newState.vacations[indexToUpdateFollow].isFollowed = 1;


            // Step 1 - map all the vacations, if there is  a vacation without a follow (undefined) then set isFollowed: 0
            newState.vacations.forEach(function (element) {
                if (newState.vacations[element.isFollowed] === undefined) {
                    element.isFollowed = 0;
                }
            });

            // Step 2 - sort firstly isFollowed: 1 and then isFollowed 0
            newState.vacations.sort(function (a, b) {
                return b.isFollowed - a.isFollowed
            });

            break;
        
        case VacationsActionType.VacationUnfollowed:
            // Step 0 - Set to the selected vacation: isFollowed: 0
            const indexToUpdateUnfollow = newState.vacations.findIndex(v => v.vacationId === action.payload.vacationId);
            newState.vacations[indexToUpdateUnfollow].isFollowed = 0;

            // Step 1 - map all the vacations, if there is  a vacation without a follow (undefined) then set isFollowed: 0
            newState.vacations.forEach(function (element) {
                if (newState.vacations[element.isFollowed] === undefined) {
                    element.isFollowed = 0;
                }
            });

            // Step 2 - sort firstly isFollowed: 1 and then isFollowed 0
            newState.vacations.sort(function (a, b) {
                return b.isFollowed - a.isFollowed
            });

            break;
    }

    return newState;
}

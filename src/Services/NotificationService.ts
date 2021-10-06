import { Notyf } from "notyf";
import { errorsService } from './ErrorsService';

export class NotificationService {

    private myNotyf = new Notyf({ duration: 4000, ripple: true, position: { x: "left", y: "top" } });
   

    public success(message: string): void {
        this.myNotyf.success(message);
    }

    public redMsg(message: string): void {
        this.myNotyf.error(message);
    }

    public error(err: any): void {
        this.myNotyf.error(errorsService.getError(err));
    }

}

export default NotificationService;

export const notificationService = new NotificationService();

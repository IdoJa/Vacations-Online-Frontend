export class ErrorsService {
    
    public getError(err: any) {
        if (typeof err === "string") { // err = one string from a 401.
            return err;
        }

        if (typeof err.error === "string") { // err.error = one string from a 400 error.
            return err.error;
        }

        if (Array.isArray(err.error)) { // err.error = array of strings from a 400 error.
            let allErrors = "";
            for (const item of err.error) {
                allErrors += item + "<br>";
            }
            return allErrors;
        }

        if (typeof err.message === "string") { // Frontend exception containing message
            if (err.message.startsWith("Network")) {
                return "The server is down or your internet connection is down.";
            }
            return err.message;
        }

        return "Some error occurred, please try again later.";
    }

}

export default ErrorsService;

export const errorsService = new ErrorsService();

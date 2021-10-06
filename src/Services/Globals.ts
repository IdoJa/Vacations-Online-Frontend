export class Globals {

    public static authUrl: string;
    public static vacationsUrl: string;
    public static followUrl: string

    public static init() {
        if (process.env.NODE_ENV === "production") {
            Globals.authUrl = "https://ido-ja-vacations.herokuapp.com/api/auth/";
            Globals.vacationsUrl = "https://ido-ja-vacations.herokuapp.com/api/vacations/";
            Globals.followUrl = "https://ido-ja-vacations.herokuapp.com/api/follow/";
        }
        else {
            Globals.authUrl = "http://localhost:3001/api/auth/";
            Globals.vacationsUrl = "http://localhost:3001/api/vacations/";
            Globals.followUrl = "http://localhost:3001/api/follow/";
        }
    }
}

Globals.init();


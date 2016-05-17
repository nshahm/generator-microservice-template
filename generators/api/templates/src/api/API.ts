import * as Express from "express";
import { I<%= microserviceName %>API } from "./I<%= microserviceName %>API";
import {IAPI} from "./IAPI";
import { inject, injectable } from "inversify";
import { Constants } from "../helpers/constants/Constants";

const app: Express.Express = Express();
/**
 * @class
 * This class is to add all the different API as part of this microservices.
 */
@injectable()
class API implements IAPI {
    private <%= microserviceNameLC %>API: I<%= microserviceName %>API;

    constructor(@inject("I<%= microserviceName %>API") <%= microserviceNameLC %>API: I<%= microserviceName %>API) {
        this.<%= microserviceNameLC %>API = <%= microserviceNameLC %>API;
    }

    public routes() {
        app.use("/" + Constants.API_VERSION + "/<%= microserviceNameLC %>/", this.<%= microserviceNameLC %>API.routes());
        return app;
    }
}
export default API;

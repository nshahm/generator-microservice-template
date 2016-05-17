import {IBaseAPI} from "base-api";

interface I<%= microserviceName %>API extends IBaseAPI {
    routes();
}

export {I<%= microserviceName %>API};

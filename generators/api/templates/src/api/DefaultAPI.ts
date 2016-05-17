import * as Express from "express";
import {I<%= microserviceName %>Service} from "./../service/I<%= microserviceName %>Service";
import {I<%= microserviceName %>API} from "./I<%= microserviceName %>API";
import {BaseAPI} from "base-api";

import { injectable, inject } from "inversify";

let router: Express.Router = Express.Router();

/**
 * @class <%= microserviceName %>API
 * @classdesc <%= microserviceName %>API class will have all REST API routes for <%= microserviceName %> service
 * @extends { BaseAPI } - available in base-api package
 * @implements {I<%= microserviceName %>API } - I<%= microserviceName %>API
 */
@injectable()
class <%= microserviceName %>API extends BaseAPI implements I<%= microserviceName %>API {

    /**
     * @private {I<%= microserviceName %>Service } Injected <%= microserviceNameLC %> service instance 
     */
    private <%= microserviceNameLC %>Service: I<%= microserviceName %>Service;

    /**
     * @constructor constructor 
     */
    constructor (@inject("I<%= microserviceName %>Service")  <%= microserviceNameLC %>Service: I<%= microserviceName %>Service) {
        super();
        this.<%= microserviceNameLC %>Service = <%= microserviceNameLC %>Service;
    }

    /**
     * @method
     * @memberof <%= microserviceName %>API
     * @returns { Express.Router } router instance contains all the REST routes added for <%= microserviceName %>API
     */
    public routes (): Express.Router {

        /**
         * @api {get} /<%= microserviceNameLC %>/ Fetch all <%= microserviceNameLC %>s
         * @apiName GetAll<%= microserviceName %>s
         * @apiGroup <%= microserviceName %>
         * @apiVersion 1.0.0
         * @apiSuccess {json} json with list of <%= microserviceNameLC %>.
         */
        router.get("/", this.<%= microserviceNameLC %>Service.retrieve);

        /**
         * @api {get} /<%= microserviceNameLC %>/:id Fetch <%= microserviceName %>
         * @apiName Get<%= microserviceName %>ById 
         * @apiGroup <%= microserviceName %>
         * @apiParam {String} id - mongoose.Types.ObjectId || hexString  
         * @apiVersion 1.0.0
         * @apiSuccess {json} ServiceResponse Response json wrappered with status
         * @apiSuccessExample Example data on success
         * {
         *  status : "Success",
         *  message : [
         *      {
         *          <%= microserviceNameLC %> 1
         *      }, 
         *      {
         *          <%= microserviceNameLC %> 2
         *      }
         *  ]
         * }
         */
        router.get("/:id", this.<%= microserviceNameLC %>Service.findById);

        /**
         * @api {post} /<%= microserviceNameLC %>/ Create <%= microserviceName %>
         * @apiGroup <%= microserviceName %>
         * @apiVersion 1.0.0
         * @apiParam {json=<%= microserviceName %>Model} input json of type <%= microserviceName %>Model
         * @apiParamExample  Example request 
         * {
         *  "<%= microserviceNameLC %> data"
         * }
         * @apiSuccess {json} ServiceResponse Response json wrappered with status
         * @apiSuccessExample Example data on success
         * {
         *     "status": "Success",
         *     "message": "Created successfully",
         * }
         */
        router.post("/", this.<%= microserviceNameLC %>Service.create);

        /**
         * @api {put} /<%= microserviceNameLC %>/:id Update <%= microserviceName %>
         * @apiGroup <%= microserviceName %>
         * @apiVersion 1.0.0
         * @apiParam {string } hexString or mongoose.Types.ObjectId _id of <%= microserviceName %>Model 
         * @apiParam {json=<%= microserviceName %>Model} input json of type <%= microserviceName %>Model
         * @apiParamExample Example request 
         * {
         *  "<%= microserviceNameLC %> updated data"
         * }
         * @apiSuccess {json} ServiceResponse Response json wrappered with status
         * @apiSuccessExample Example data on success
         * {
         *     "status": "Success",
         *     "message": "Updated successfully",
         * }
         */
        router.put("/:id", this.<%= microserviceNameLC %>Service.update);

        /**
         * @api {delete} /<%= microserviceNameLC %>/:id Delete <%= microserviceName %>
         * @apiName Delete<%= microserviceName %>ById 
         * @apiGroup <%= microserviceName %>
         * @apiParam {String} id - mongoose.Types.ObjectId or hexString  
         * @apiVersion 1.0.0
         * @apiSuccess {json} ServiceResponse Response json wrappered with status 
         * @apiSuccessExample Example data on success
         * {
         *     "status": "Success",
         *     "message": "Deleted successfully",
         * }
         */
        router.delete("/:id", this.<%= microserviceNameLC %>Service.delete);

        return router;
    }
}

Object.seal(<%= microserviceName %>API);
export { <%= microserviceName %>API };

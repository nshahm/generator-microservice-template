import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { I<%= microserviceName %>Model, <%= microserviceName %>Model } from "entity-<%= microserviceNameLC %>";
import { BaseService } from "base-service";
import { ParseError } from "mongoose-error-parser";
import { I<%= microserviceName %>Service }  from "./I<%= microserviceName %>Service";
import { I<%= microserviceName %>DAO } from "./../dal/dao/I<%= microserviceName %>DAO";
import { Constants } from "../helpers/constants/Constants";

// Holding the dao instance globally as this operator does not available at method scope.
let <%= microserviceNameLC %>DAO: I<%= microserviceName %>DAO<I<%= microserviceName %>Model>;

/**
 * <%= microserviceName %>Service
 * @class
 * @classdesc <%= microserviceName %> Service is used to write any business validation and the bridge between API and Data access layer
 */
@injectable()
class <%= microserviceName %>Service
    extends BaseService
    implements I<%= microserviceName %>Service {

    constructor( @inject("I<%= microserviceName %>DAO") <%= microserviceNameLC %>DAOObj: I<%= microserviceName %>DAO<I<%= microserviceName %>Model>) {
        super();
        <%= microserviceNameLC %>DAO = <%= microserviceNameLC %>DAOObj;
    }

    /**
     * @method Create <%= microserviceName %>
     * @memberof <%= microserviceName %>Service
     * @param {Express.Request} req - The request of the <%= microserviceNameLC %>.
     * @param {Express.Response} res - The response of the <%= microserviceNameLC %>.
     */
    public create(req: Request, res: Response) {
        let <%= microserviceNameLC %>: I<%= microserviceName %>Model = <I<%= microserviceName %>Model>req.body;
        if (super.validateEntityVersion(<%= microserviceNameLC %>.entityVersion, new <%= microserviceName %>Model().entityVersion)) {
            res.status(505).send(super.createServiceResponse(Constants.FAILURE, "Entity Version Not Supported"));
        } else {

            <%= microserviceNameLC %>DAO.create(<%= microserviceNameLC %>, (error, result) => {
                if (error) {
                    res.status(422).send(super.createServiceResponse(Constants.FAILURE, ParseError.parse(error)));
                } else {
                    res.status(200).send(super.createServiceResponse(Constants.SUCCESS, Constants.CREATE_SUCCESS));
                }
            });
        }
    }

    /**
     * @method Update <%= microserviceName %>
     * @memberof <%= microserviceName %>Service
     * @param {Express.Request} req - The request of the <%= microserviceNameLC %>.
     * @param {Express.Response} res - The response of the <%= microserviceNameLC %>.
     */
    public update(req: Request, res: Response) {
        let <%= microserviceNameLC %>: I<%= microserviceName %>Model = <I<%= microserviceName %>Model>req.body;
        let id: string = req.params.id;

        <%= microserviceNameLC %>DAO.update(id, <%= microserviceNameLC %>, (error, result) => {
            if (error) {
                res.status(422).send(super.createServiceResponse(Constants.FAILURE, ParseError.parse(error)));
            } else {
                res.status(200).send(super.createServiceResponse(Constants.SUCCESS, Constants.UPDATE_SUCCESS));
            }
        });
    }

    /**
     * @method Delete <%= microserviceName %>
     * @memberof <%= microserviceName %>Service
     * @param {Express.Request} req - The request of the <%= microserviceNameLC %>.
     * @param {Express.Response} res - The response of the <%= microserviceNameLC %>.
     */
    public delete(req: Request, res: Response) {
        let id: string = req.params.id;

        <%= microserviceNameLC %>DAO.delete(id, (error, result) => {
            if (error) {
                res.status(422).send(super.createServiceResponse(Constants.FAILURE, ParseError.parse(error)));
            } else {
                res.status(200).send(super.createServiceResponse(Constants.SUCCESS, Constants.DELETE_SUCCESS));
            }
        });
    }

    /**
     * @method Get all <%= microserviceNameLC %>s
     * @memberof <%= microserviceName %>Service
     * @param {Express.Request} req - The request of the <%= microserviceNameLC %>.
     * @param {Express.Response} res - The response of the <%= microserviceNameLC %>.
     */
    public retrieve(req: Request, res: Response) {
        <%= microserviceNameLC %>DAO.retrieve((error, result) => {
            if (error) {
                res.status(422).send(super.createServiceResponse(Constants.FAILURE, ParseError.parse(error)));
            } else {
                res.status(200).send(super.createServiceResponse(Constants.SUCCESS, result));
            }
        });
    }

    /**
     * @method Get <%= microserviceName %> by Id
     * @memberof <%= microserviceName %>Service
     * @param {Express.Request} req - The request of the <%= microserviceNameLC %>.
     * @param {Express.Response} res - The response of the <%= microserviceNameLC %>.
     */
    public findById(req: Request, res: Response) {
        let id: string = req.params.id;

        <%= microserviceNameLC %>DAO.findById(id, (error, result) => {
            if (error) {
                res.status(422).send(super.createServiceResponse(Constants.FAILURE, ParseError.parse(error)));
            } else {
                res.status(200).send(super.createServiceResponse(Constants.SUCCESS, result));
            }
        });
    }
}

/**
 * @export - <%= microserviceName %>Service exported will be used in API layer.
 */
export { <%= microserviceName %>Service };


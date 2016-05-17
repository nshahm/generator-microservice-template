import * as mongoose from "mongoose";
import { injectable } from "inversify";
import { <%= microserviceName %>Model } from "entity-<%= microserviceNameLC %>";
import { I<%= microserviceName %>DAO } from "./I<%= microserviceName %>DAO";
/**
 * @class <%= microserviceName %>DAO
 * @classdesc <%= microserviceName %> Data access layer has interaction with database for CRUD operations.
 */
@injectable()
class <%= microserviceName %>DAO<T extends mongoose.Document>
implements I<%= microserviceName %>DAO<T> {

    /**
     * @private - model
     */
    private model: mongoose.Model<mongoose.Document>;

    /**
     * @constructor <%= microserviceName %>DAO
     * @memberof <%= microserviceName %>DAO
     */
    constructor () {
        this.model = <%= microserviceName %>Model;
    }

    /**
     * @method create
     * @memberof <%= microserviceName %>DAO
     * @param { I<%= microserviceName %>Model }
     * @returns { error } Error if exists
     * @returns { result } Result will be success message. 
     */
    public create (item: T, callback: (error: any, result: any) => void) {
        this.model.create(item, callback);
    }

    /**
     * @method retrieve
     * @memberof <%= microserviceName %>DAO
     * @returns { error } Error if exists
     * @returns { result } Result will be success message. 
     */
    public retrieve (callback: (error: any, result: any) => void) {
         this.model.find({}, callback);
    }

    /**
     * @method update
     * @memberof <%= microserviceName %>DAO
     * @param { id }
     * @returns { error } Error if exists
     * @returns { result } Result will be success message. 
     */
    public update (id: string, item: T, callback: (error: any, result: any) => void) {
            this.model.findByIdAndUpdate( id , item, callback);

    }

    /**
     * @method delete
     * @memberof <%= microserviceName %>DAO
     * @param { id }
     * @returns { error } Error if exists
     * @returns { result } Result will be success message. 
     */
    public delete (id: string, callback: (error: any, result: any) => void) {
        this.model.remove({_id: this.toObjectId(id)}, (error) => callback(error, null));

    }

    /**
     * @method findById
     * @memberof <%= microserviceName %>DAO
     * @param { id }
     * @returns { error } Error if exists
     * @returns { result } Result will be success message. 
     */
    public findById (id: string, callback: (error: any, result: T) => void) {
        this.model.findOne({<%= microserviceNameLC %>ID: id}, callback);
    }

    /**
     * @method toObjectId
     * @memberof <%= microserviceName %>DAO
     * @param { hexString } - input hexString
     * @returns { Mongoose.Types.ObjectId } ObjectId
     */
    private toObjectId (id: string): mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId.createFromHexString(id);
    }
}

Object.seal(<%= microserviceName %>DAO);

/**
 * @export Exported <%= microserviceName %>DAO to use it in service layer
 */
export { <%= microserviceName %>DAO };


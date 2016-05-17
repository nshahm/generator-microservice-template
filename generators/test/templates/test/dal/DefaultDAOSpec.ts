import {expect, Mongoose, mongodb } from "../Testing";

import { getInstance } from "../../src/inversify.config";
import {I<%= microserviceName %>Model} from "entity-<%= microserviceNameLC %>";
import { I<%= microserviceName %>DAO } from  "../../src/dal/dao/I<%= microserviceName %>DAO";



describe("<%= microserviceName %> Data Access layer Spec", function () {

   // To hold ObjectId
   let id: Mongoose.Types.ObjectId;

   // Create payload
   const payload: I<%= microserviceName %>Model = <I<%= microserviceName %>Model> {
        "entityVersion": "1.0.0"
       
    };

    // Update payload
    const updatePayload: I<%= microserviceName %>Model = <I<%= microserviceName %>Model>  {
       
    };

    let <%= microserviceNameLC %>DAO: I<%= microserviceName %>DAO<I<%= microserviceName %>Model>;
    let <%= microserviceNameLC %>ID = "";

    // Delete all document before starting the testcase
    before ((done) => {

       mongodb.connect(
        (error) => {
            console.log(error);
            },
        () => {
            // console.log("Connected");
             done();
        });
    });

    // Disconnect mongoose connection
    after((done) => {
       mongodb.disconnect();
        done();
    });

    /**
     * Before every test case
     */
    beforeEach((done) => {
        <%= microserviceNameLC %>DAO = getInstance <I<%= microserviceName %>DAO<I<%= microserviceName %>Model>>("I<%= microserviceName %>DAO");
        done();
    });


    // /**
    //  * After every testcase
    //  */
    // afterEach((done) => {
    //     done();
    // });


    /**
     * Create <%= microserviceName %>
     */
    it("create", (done) => {

        <%= microserviceNameLC %>DAO.create(payload, (error) => {
            if (error) {
                console.log(error);
            }
            expect(error).to.not.exist;
            done();
        });
    });

    /**
     * Retrieve <%= microserviceName %>
     */
    it("retrieve",  (done) => {

        <%= microserviceNameLC %>DAO.retrieve((error, docs) => {
            if (error) {
                console.log(error);
            }

            id = docs[0]._id;
            expect(error).to.not.exist;
            expect(docs[0]._doc.<%= microserviceNameLC %>ID).to.equal(payload.<%= microserviceNameLC %>ID);
            done();
        });
    });

    /**
     * FindById <%= microserviceName %>
     */
    it("findById", (done) => {

        <%= microserviceNameLC %>DAO.findById(<%= microserviceNameLC %>ID,  (error, docs) => {
            if (error) {
                console.log(error);
            }
            expect(error).to.not.exist;
            expect(docs.name.first).to.equal("John");
            done();
        });
    });

    /**
     * Update <%= microserviceName %>
     */
    it("update",  (done) => {

        <%= microserviceNameLC %>DAO.update( id.toHexString(), updatePayload,  (error, doc: any) => {
            if (error) {
                console.log(error);
            }
            expect(error).to.not.exist;
            expect(doc.ok).to.equal(1);
        });
        done();
    });

    /**
     * Delete <%= microserviceName %>
     */
    it("delete",  (done) => {

        <%= microserviceNameLC %>DAO.delete(id.toHexString(),  (error) => {
            if (error) {
                console.log(error);
            }
            expect(error).to.not.exist;
        });
        done();
    });

});

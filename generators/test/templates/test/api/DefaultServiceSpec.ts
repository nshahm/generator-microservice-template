import  {
    expect,
    sinon,
    getInstance,
 } from "../Testing";
import * as supertest from "supertest";

import { Constants } from "../../src/helpers/constants/Constants";
import {I<%= microserviceName %>Model} from "entity-<%= microserviceNameLC %>";
import { I<%= microserviceName %>DAO } from  "../../src/dal/dao/I<%= microserviceName %>DAO";
import { app } from "../TestApp";

describe("<%= microserviceName %> API and service layer spec", function () {

   let request: supertest.SuperTest;

   // Create payload
   const payload: I<%= microserviceName %>Model = <I<%= microserviceName %>Model> {
        "entityVersion": "1.0.0",
        "<%= microserviceNameLC %>ID": "1000002",
        "name": {
            "first": "Richard",
            "last": "Patrick",
        },
        "address": {
            "lines": [
                "1234 Delk RD SW",
            ],
            "city": "Atlanta",
            "state": "GA",
            "zip": 12345,
        },
    };

    // Update payload
    const updatePayload: I<%= microserviceName %>Model = <I<%= microserviceName %>Model>  {
        name : {
             first: "John William",
             last : "Patrick",
        },
    };

   let <%= microserviceNameLC %>DAOMock: Sinon.SinonMock;
    let <%= microserviceNameLC %>DAO: I<%= microserviceName %>DAO<I<%= microserviceName %>Model>;

    /**
     * Before all testcase
     */
    before ((done) => {

    // Creating monggose connection 
     //  mongodb.connect();

    //    Initializing the request
       request = supertest(app);

       done();
    });

    /**
     * After all test case.
     */
    // after((done) => {
    //   // mongodb.disconnect();
    //    done();
    // });

    /**
     * Before every test case
     */
    beforeEach((done) => {
        <%= microserviceNameLC %>DAO = getInstance <I<%= microserviceName %>DAO<I<%= microserviceName %>Model>>("I<%= microserviceName %>DAO");
        <%= microserviceNameLC %>DAOMock = sinon.mock(<%= microserviceNameLC %>DAO);
        done();
    });


    /**
     * After every testcase
     */
    afterEach((done) => {
         <%= microserviceNameLC %>DAOMock.restore();
        done();
    });

    /**
     * Create <%= microserviceName %>
     */
    it("POST - create <%= microserviceNameLC %> - /<%= microserviceNameLC %>", (done) => {

        <%= microserviceNameLC %>DAOMock
            .expects("create")
            .withArgs(payload)
            .yields(null, {
                "status": "Success",
                "message": "Created successfully",
                });

        const url = "/" + Constants.API_VERSION + "/<%= microserviceNameLC %>/";
        request
            .post(url)
            .send(payload)
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {

                expect(res.body).to.exist;
                expect(res.body).to.have.property("status");
                expect(res.body.status).to.equals("Success");
            }).
            end(done);
    });

    /**
     * GET <%= microserviceName %> by Id
     */
    it("GET - fetch <%= microserviceNameLC %> - /<%= microserviceNameLC %>/id", (done) => {

        <%= microserviceNameLC %>DAOMock
            .expects("findById")
            .withArgs("id")
            .yields(null, { message: [  {"response": "responsedata"} ], status : "Success"});

        const url = "/" + Constants.API_VERSION + "/<%= microserviceNameLC %>/id";
        request
            .get(url)
            .send({id: "data"})
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {

                expect(res.body).to.exist;
                expect(res.body).to.have.property("status");
                expect(res.body.status).to.equals("Success");
            }).
            end(done);
    });

    /**
     * GET <%= microserviceName %> by Id
     */
    it("GET - Retrieve all <%= microserviceNameLC %> - /<%= microserviceNameLC %>/", (done) => {

        <%= microserviceNameLC %>DAOMock
            .expects("retrieve")
            .yields(null, { message: [  {"response": "responsedata"} ], status : "Success"});

        const url = "/" + Constants.API_VERSION + "/<%= microserviceNameLC %>";
        request
            .get(url)
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {

                expect(res.body).to.exist;
                expect(res.body).to.have.property("status");
                expect(res.body.status).to.equals("Success");
            }).
            end(done);
    });

    /**
     * Update <%= microserviceName %>
     */
    it("PUT - Update <%= microserviceNameLC %> - /<%= microserviceNameLC %>", (done) => {
        done();

        <%= microserviceNameLC %>DAOMock
            .expects("update")
            .withArgs("57325119da8a8f5c299edb31", updatePayload)
            .yields(null, {
                    "status": "Success",
                    "message": "Updated successfully",
                    });

        const url = "/" + Constants.API_VERSION + "/<%= microserviceNameLC %>/57325119da8a8f5c299edb31";
        request
            .put(url)
            .send(updatePayload)
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {

                expect(res.body).to.exist;
                expect(res.body).to.have.property("status");
                expect(res.body.status).to.equals("Success");
            }).
            end(done);
    });

    /**
     * Delete <%= microserviceName %>
     */
    it("DELETE - delete <%= microserviceNameLC %> - /<%= microserviceNameLC %>", (done) => {

        <%= microserviceNameLC %>DAOMock
            .expects("delete")
            .withArgs("id")
            .yields(null, {
                "status": "Success",
                "message": "Deleted successfully",
                });

        const url = "/" + Constants.API_VERSION + "/<%= microserviceNameLC %>/id";
        request
            .delete(url)
             .set("id", "57325119da8a8f5c299edb31")
            .send(updatePayload)
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {

                expect(res.body).to.exist;
                expect(res.body).to.have.property("status");
                expect(res.body.status).to.equals("Success");
            }).
            end(done);
    });
});

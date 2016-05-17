import "reflect-metadata";
import { Kernel } from "inversify";

// Actual implementation class
import API from "./api/API";
// import { Middlewares } from "base-middlewares";

import { <%= microserviceName %>API } from "./api/<%= microserviceName %>API";
import { <%= microserviceName %>Service } from "./service/<%= microserviceName %>Service";
import { <%= microserviceName %>DAO } from "./dal/dao/<%= microserviceName %>DAO";

// Interfaces
import {IAPI} from "./api/IAPI";
// import {IMiddlewares} from "base-middlewares";

import { I<%= microserviceName %>API } from "./api/I<%= microserviceName %>API";
import { I<%= microserviceName %>Model }from "entity-<%= microserviceNameLC %>";
import { I<%= microserviceName %>Service } from "./service/I<%= microserviceName %>Service";
import { I<%= microserviceName %>DAO } from "./dal/dao/I<%= microserviceName %>DAO";

let kernel: inversify.IKernel = new Kernel();

kernel.bind<IAPI> ("IAPI").to(API).inSingletonScope();

kernel.bind<I<%= microserviceName %>API>("I<%= microserviceName %>API").to(<%= microserviceName %>API).inSingletonScope();
kernel.bind<I<%= microserviceName %>Service>("I<%= microserviceName %>Service").to(<%= microserviceName %>Service).inSingletonScope();
kernel.bind<I<%= microserviceName %>DAO<I<%= microserviceName %>Model>>("I<%= microserviceName %>DAO").to(<%= microserviceName %>DAO).inSingletonScope();

export {kernel};
export function getInstance<T> (name: string): T {
    return kernel.get<T> (name);
}

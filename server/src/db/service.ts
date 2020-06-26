import {Service} from "@tsed/common";
import {MongooseService} from "@tsed/mongoose";
import { Mongoose } from "mongoose";

@Service()
export class Database {

  default : Mongoose;

  constructor(mongooseService: MongooseService) {
    this.default = mongooseService.get();
  }

}
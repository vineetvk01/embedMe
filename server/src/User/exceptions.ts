import {BadRequest} from "@tsed/exceptions";

export class EmailAlreadyExists extends BadRequest {
  constructor() {
    super("This email id is already registered");
  }
}
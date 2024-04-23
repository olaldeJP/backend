import { Server } from "../../app/app.js";
import { PORT, URL_MONGO } from "../config/config.js";
import Assert from "assert";
import { usersService } from "../services/users.Service.js";
const assert = Assert.strict;
describe("System Test:", function () {
  before(function () {
    this.server = new Server(URL_MONGO);
    this.server.connect(PORT);
  });
  describe("Unit Test", function () {
    describe("UserServices ", function () {
      describe("Register", function () {
        describe("Register with invalid data", function () {
          it("Error Invalid Data", function () {});
        });
      });
    });
  });
});

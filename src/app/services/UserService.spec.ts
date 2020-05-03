import Mongoose from 'mongoose'
import User from '@Models/UserModel'
import UserController from '@Controllers/UserController'

describe("User", () => {
    beforeAll(async () => {

    });
    afterAll(async () => {

    });
    beforeEach(async () => {
        await User.deleteMany({});
    });

});
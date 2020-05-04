import Mongoose from 'mongoose'
import UserModel from '@models/UserModel';

describe("User", () => {
    beforeAll(async () => {

    });
    afterAll(async () => {

    });
    beforeEach(async () => {
        await UserModel.deleteMany({});
    });

});
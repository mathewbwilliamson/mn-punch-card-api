import { User, UserAttributes } from '../../models/User';
import { NewUser } from '../../src/types/userTypes';

export const findSingleUser = async (attributes: { where: any }) => {
    return (await User.findOne(attributes)) as UserAttributes;
};

export const createNewUser = async (newUser: NewUser) => {
    return await User.create({ ...newUser });
};

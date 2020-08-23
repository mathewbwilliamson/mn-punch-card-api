import { User, UserAttributes } from '../../models/User';

export const findSingleUser = async (attributes: { where: any }) => {
    return (await User.findOne(attributes)) as UserAttributes;
};

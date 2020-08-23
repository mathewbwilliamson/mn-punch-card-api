import { User, UserAttributes } from '../../models/User';
import { NewUser } from '../../src/types/userTypes';
import bcrypt from 'bcrypt';

export const findSingleUser = async (attributes: { where: any }) => {
    return (await User.findOne(attributes)) as UserAttributes;
};

export const createNewUser = async (newUser: NewUser) => {
    const { password, username, email, role } = newUser;
    let hashedPassword = '';

    // Hash Password
    await bcrypt.genSalt(10, (error, salt) =>
        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) {
                throw err;
            }

            hashedPassword = hash;

            return await User.create({
                username,
                email,
                role,
                password: hashedPassword,
            });
        })
    );
};

export const authorizeUser = async (userId: string) => {
    const existingUser = await findSingleUser({ where: { id: userId } });
    if (!existingUser) {
        return false;
    }

    await User.update(
        { authorizedDate: new Date().toISOString() },
        { where: { id: userId } }
    );

    return true;
};

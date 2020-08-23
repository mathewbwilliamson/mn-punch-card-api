import { NewUser } from '../types/userTypes';
import { findSingleUser, createNewUser } from '../repositories/UserRepo';
import bcryptjs from 'bcryptjs';

export const validateNewUser = async (newUser: NewUser) => {
    const { username, email, password, password2, role } = newUser;
    const errors = [];

    if (!username || !email || !password || !password2 || !role) {
        errors.push({ message: 'Please fill in every field.' });
    }

    // Check passwords
    if (password !== password2) {
        errors.push({ message: 'Passwords do not match.' });
    }

    // Check password length
    if (password.length < 8) {
        errors.push({ message: 'Password should be at least 8 characters.' });
    }

    if (errors.length === 0) {
        const foundUser = await findSingleUser({
            where: {
                username,
            },
        });
        if (!!foundUser) {
            errors.push({ message: 'That username already exists.' });
        }
    }

    return errors;
};

export const registerUser = async (newUser: NewUser) => {
    const errors = await validateNewUser(newUser);

    if (errors.length > 0) {
        console.log('\x1b[42m%s \x1b[0m', '[matt] errors', errors);
        return errors;
    } else {
        // Validation passed
        const newModelUser = await createNewUser(newUser);
        console.log('\x1b[42m%s \x1b[0m', '[matt] newModelUser', newModelUser);
        return true;
    }
};

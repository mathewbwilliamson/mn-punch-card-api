import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import { User } from '../../models/User';
import { PassportStatic } from 'passport';

const LocalStrategy = passportLocal.Strategy;

export const usePassport = (passport: PassportStatic) => {
    passport.use(
        new LocalStrategy(
            { usernameField: 'username' },
            async (username, password, done) => {
                // Match user
                const foundUser = await User.findOne({ where: { username } });
                if (!foundUser) {
                    return done(null, false, {
                        message: 'That username is not registered',
                    });
                }

                // Match password
                bcrypt.compare(password, foundUser.password, (err, isMatch) => {
                    if (!!err) {
                        throw err;
                    }
                    if (!!isMatch) {
                        return done(null, foundUser);
                    } else {
                        return done(null, false, {
                            message: 'Password incorrect!',
                        });
                    }
                });
            }
        )
    );

    passport.serializeUser((user: User, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id: string, done) => {
        const foundUser = await User.findByPk(id);
        done('User not found', foundUser);
    });
};

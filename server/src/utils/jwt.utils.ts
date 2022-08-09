import {SignOptions, VerifyOptions, sign, verify} from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';
import {config} from "../config";

interface TokenPayload {
    status: boolean,
    message: string,
    data: Object
}

/*** Generate Token ***/
export const signAccessToken = (payload: Object) => {
    return new Promise((resolve, reject) => {
        const privateKey = {
            key: fs.readFileSync(path.join(__dirname, '../../private.pem'), 'utf8'),
            passphrase: config.jwtSecret,
        };
        const signInOptions: SignOptions = {algorithm: 'RS256', expiresIn: '12h'};
        sign(payload, privateKey, signInOptions, (err, token) => {
            if (err) {
                reject(err);
            }
            resolve(token);
        })
    })
};
export const verifyAccessToken = (token: string): Promise<TokenPayload> => {
    return new Promise((resolve, reject) => {
        const verifyOptions: VerifyOptions = {algorithms: ['RS256']};
        const publicKey = fs.readFileSync(path.join(__dirname, '../../public.pem'));

        //TODO Разобраться в чём тут проблема
        // @ts-ignore
        verify(token,
            publicKey,
            verifyOptions,
            (err, payload: TokenPayload) => {
                if (!err) {
                    resolve(payload);
                } else {
                    const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
                    return reject(message);
                }
            });
    })
}

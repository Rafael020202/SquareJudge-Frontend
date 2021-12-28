import { Parms } from '../config/constants';

function getCookiesParams(cookie: string): Parms {
    const params = cookie.replace(/\s+/g, '').split(';');
    const obj = {} as Parms;

    for (let i = 0; i < params.length; i++) {
        const param = params[i].split('=');

        obj[param[0]] = param[1];
    }

    return obj;
}

export default getCookiesParams;
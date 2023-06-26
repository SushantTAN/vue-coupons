import { IncomingMessage, ServerResponse } from 'http';
import { db } from '../db';


export default async (event: any) => {
    const body = await readBody(event);

    if (body.username === 'admin' && body.password === 'admin') {
        return { status: 200, message: 'Logged in successfully', token: '1234567890' }
    }
    return { status: 400, message: 'Enter correct username and password' }
}
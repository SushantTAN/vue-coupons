import { IncomingMessage, ServerResponse } from 'http';
import { db } from '../db';
// import { useBody } from 'h3';

export default async (event:any) => {
    const body = await readBody(event);

    const id = db.coupons.length + 1;

    db.coupons.push({
        id,
        name: body.name,
    });
    return {id}
}
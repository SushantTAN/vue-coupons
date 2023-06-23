interface CouponType {
    id: number,
    name: string,
}

interface DB {
    coupons: CouponType[],
}

export const db: DB = {
    coupons: [
        {id: 1, name: 'test 1'}
    ],
}
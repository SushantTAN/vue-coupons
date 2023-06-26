export interface CouponType {
  id: number;
  name: string;
  redeemed: boolean;
  promoCode: string;
}

export interface ModalDataType {
  id: number | null;
  name: string | null;
  redeemed: boolean | null;
  promoCode: string | null;
}
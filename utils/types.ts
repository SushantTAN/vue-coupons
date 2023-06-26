export interface CouponType {
  id: number;
  name: string;
  canRedeem: boolean;
  promoCode: string;
}

export interface ModalDataType {
  id: number | null;
  name: string | null;
  canRedeem: boolean | null;
  promoCode: string | null;
}

export interface LoginResponse {
  status: number;
  message: string;
  token?: string;
}
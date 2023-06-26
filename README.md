# Nuxt 3 Coupon application for frontend

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install --legacy-peer-deps

# yarn
yarn install --legacy-peer-deps
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# yarn
yarn dev
```

After running the development server, login with credentials: ( username: admin  password: admin ).

You will be redirected to the list page, where you can redeem the coupons. 
The redemed tokens will be present at the bottom of the page. When you hover or click on the redemed tokens, you will see the promo code for the tokens which can be copied by clicking on the code itself. 

The promo code can be used in the form found at the top of the login screen. One promo code can only be used once.
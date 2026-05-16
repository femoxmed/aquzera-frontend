# Next.js Starter Project

A themed Next.js starter with Tailwind CSS, shadcn-style components, lucide-react, Sonner toast notifications, TanStack Query, Formik, Yup validation, Zustand, auth pages, cart flow, SEO metadata, and middleware token/refresh-token protection.

## Brand Theme

- Primary: `#0040D3`
- Secondary: `#03D4FF`
- Tertiary: `#03D4FF`

Theme tokens are configured in `src/app/globals.css` and mapped in `tailwind.config.ts`.

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Included Pages

- Home
- Product
- About
- Contact
- FAQ
- Profile
- Cart
- Shipping
- Payment
- Sign In
- Sign Up
- Password Reset
- Verification
- Loading
- Error
- Not Found

## Included Components

- Header
- Footer
- Button
- Input
- Label
- Card
- Dialog
- ConfirmDialog
- DataTable
- SearchInput
- Pagination
- PageHeader

## Auth Middleware

Protected routes are configured in `src/middleware.ts`:

- `/profile`
- `/cart`
- `/shipping`
- `/payment`

The middleware checks for `accessToken` or `refreshToken` cookies.

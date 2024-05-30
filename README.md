# Movie Library

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It uses [Prisma](https://www.prisma.io/) as the ORM and [MongoDB](https://www.mongodb.com/) as the database. Authentication is handled by [Clerk](https://clerk.com/).

## Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version specified in the `package.json` file)
- [yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/) (package manager)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-username/your-project.git
```
2. Navigate to the project directory:
cd movie-library

3. Install The Dependencies
```
yarn install
# or
npm install
```
4. Set Up Environmental Variables
   These are provided for testing purposes so as to reduce setup requirements temporarily
```
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_c3BlY2lhbC1tb2xlLTguY2xlcmsuYWNjb3VudHMuZGV2JA   
  CLERK_SECRET_KEY=sk_test_8QxRVO9a9jqpJRYkoqssQZjho5HJMaLu3Vt5DH40oJ
  DATABASE_URL="mongodb+srv://ayush:zyW9cCZNKcgMVyHo@cluster0.tbfbemh.mongodb.net/movie-library?retryWrites=true&w=majority&appName=Cluster0"
```
5. Setup Prisma
   ```
   npx prisma generate
   ```
   npx prisma db push(To be used to push local changes to server)
   
7. Run the Development Server
```
   yarn dev
   # or
   npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

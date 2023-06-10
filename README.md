This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


## Prisma:
- `$ npx prisma db push` -- Use this command during development to keep updating and making changes to the initial state of the DB. See more in the [Prototyping section of Prisma Docs](https://www.prisma.io/docs/guides/database/prototyping-schema-db-push)

- `$ npx prisma migrate dev --name init-state` -- **Not Used with PlanetScale**. Use this command when you have defined the initial state, and would like to start tracking DB histories.

- `$ npx prisma generate` -- needs to be manually invoked after changes to the schema, in order for Prisma Client to be updated to accomodate the new schema
- `$ npx prisma studio` -- spin up a GUI to view and interact with your data. This opens in the browser.
- `$ npx prisma format` -- format the prisma.schema file
- `$ npx prisma-repl` -- spin up an interactive command line tool, similar to Laraval Tinker or Rails Console. [Docs here](https://www.npmjs.com/package/prisma-repl)

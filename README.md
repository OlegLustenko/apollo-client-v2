## Tech

This project is using [Next.js](https://nextjs.org/) and [Apollo](https://www.apollographql.com/docs/) with [experimental package for Next.js + Apollo](https://github.com/apollographql/apollo-client-nextjs)
- **For api** integration used [GraphQLZero](https://graphqlzero.almansi.me/)
- **For styling** is used [Tailwind](https://tailwindcss.com/) with UI library [shadcn](https://ui.shadcn.com/)
- **For forms** validation is used [Zod](https://ui.shadcn.com/) and [react-hooks-form](https://react-hook-form.com/)
- **For testing** is used [Playwright](https://playwright.dev/)

## Requirements
- **Use of React**: The application should be written in React using functional components and hooks.
- **TypeScript**: All code should be written in TypeScript.
- **Apollo Client**: Apollo Client should be used for interacting with the GraphQL API.
- **UI/UX**: The UI should be simple and clean, with minimal styling.
- **Validation**: Add validation for the fields used in post editing.
- **Documentation**: Write brief documentation on how to run the application and describe its main components.

## Acceptance Criteria
- The application should display a list of posts fetched from the server.
- Clicking on a post should open an input field for editing the post's text.
- Changes to the post's text should be automatically saved.
- The application should correctly handle the situation when the page is closed before the data is sent.

## Preconditions
To run the project you must have Node.js installed
You need to install packages 

### Install packages

```bash
npm install
```

### To run application in development
```bash
npm run dev
```



## After words

The goal of this project was to i

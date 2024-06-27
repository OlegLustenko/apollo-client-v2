demo: https://apollo-client-v2.vercel.app/posts/1

### Afterwords
Generally this project combines Next.js router, apollo prefetching with SSR.
Testing was out of scope, but I still added a few tests for demonstration purposes.

I didn't go hard with Application Architecture since the app is a small and
it's makes sense to apply more advanced refactorings incrementally

tldr;

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

```bash
npm install
```

### To run application in development
```bash
npm run dev
```

### To run app for demo/production mode
```bash
npm run serve
```

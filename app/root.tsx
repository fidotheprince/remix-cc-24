import type { LinksFunction } from "@remix-run/node";
import MainNavigation from "~/components/MainNavigation";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from './styles/main.css'

//register links here: returns an array of objects with rel and href properties
export const links: LinksFunction = () => {
  return [{rel: 'stylesheet', href: styles}]
};
//app level root component

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {/*Outlet component will be replaced by the contents of your actual page components*/}
        <header>
          <MainNavigation />
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {

  const response : string = error?.message ? error.message : ''

  return (
    <div>
      <h1>App Error</h1>
      <main className="error">
        <h1>An error occured!</h1>
        <p>{response}</p>
      </main>
    </div>
  );
}
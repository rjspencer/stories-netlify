import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { cssBundleHref } from "@remix-run/css-bundle";
import { json, LinksFunction } from "@remix-run/node";
import resetStyles from "~/reset.css?url";
import stylesheet from "~/index.css?url";
import { incrementVisitorCount } from "./services/database/visitorCount";
import VisitorCount from "./components/VisitorCount";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Patua+One&display=swap",
  },
  { rel: "stylesheet", href: resetStyles },
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async () => {
  const count = await incrementVisitorCount();
  return json({ count });
};

export default function App() {
  const { count } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <VisitorCount count={count} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

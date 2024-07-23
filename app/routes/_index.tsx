import type { MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = () => {
  return { message: "That Conference Rocks 🪨🪨🪨" };
};

export default function Index() {
  const { message } = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>{message}</h1>
      <Link to="/stories">Go to stories</Link>
    </div>
  );
}

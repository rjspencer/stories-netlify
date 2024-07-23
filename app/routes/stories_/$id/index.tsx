import { LinksFunction, LoaderFunction, json, redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import styles from "./styles.css?url";

import ContentfulDocument from "~/components/ContentfulDocument";
import { Stories } from "~/services/contentful";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.id, "No id provided");
  const story = await Stories.get(params.id);
  invariant(story, "No story found with that ID");

  if (!params.pageId) {
    return redirect(`/stories/${params.id}/page/${story.entryPage?.sys.id}`);
  }

  return json({
    story,
  });
};

const Story: React.FC = () => {
  const { story } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="header">
        <Link to="/stories">Back to stories</Link>
        <h1>{story.title}</h1>
        <ContentfulDocument document={story.description} />
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Story;

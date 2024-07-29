import { LinksFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import ContentfulDocument from "~/components/ContentfulDocument";
import { Pages } from "~/services/contentful";

import styles from "./styles.css?url";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export async function loader({ params }: LoaderFunctionArgs) {
  invariant(params.id, "No story ID provided");
  invariant(params.pageId, "No page ID provided");
  const page = await Pages.get(params.pageId);
  invariant(page, "No page found with that ID");

  return json({
    storyId: params.id,
    pageId: params.pageId,
    page,
  });
}

const StoriesPage: React.FC = () => {
  const { page, storyId } = useLoaderData<typeof loader>();

  return (
    <article>
      <h2>{page.title}</h2>
      {page.content ? <ContentfulDocument document={page.content} /> : null}
      <section>
        <ul className="choices">
          {page.choice.map(({ fields }) => {
            const id = fields.destination.sys.id;
            return (
              <li key={id}>
                <Link
                  key={id}
                  to={`/stories/${storyId}/page/${id}`}
                  className="buttonLink"
                >
                  {fields.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </article>
  );
};

export default StoriesPage;

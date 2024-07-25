import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, Node } from "@contentful/rich-text-types";

// Create a bespoke renderOptions object to target BLOCKS.EMBEDDED_ENTRY (linked block entries e.g. code blocks)
// INLINES.EMBEDDED_ENTRY (linked inline entries e.g. a reference to another blog post)
// and BLOCKS.EMBEDDED_ASSET (linked assets e.g. images)

interface RenderOptionsConfig {
  image: {
    className?: string;
    height?: number;
    width?: number;
    fit?: "pad" | "fill" | "scale" | "crop" | "thumb";
  };
}

const renderOptions = (config?: RenderOptionsConfig) => {
  return {
    renderNode: {
      [INLINES.EMBEDDED_ENTRY]: (node: Node) => {
        // target the contentType of the EMBEDDED_ENTRY to display as you need
        if (node.data.target.sys.contentType.sys.id === "blogPost") {
          return (
            <a href={`/blog/${node.data.target.fields.slug}`}>
              {" "}
              {node.data.target.fields.title}
            </a>
          );
        }
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node: Node) => {
        // target the contentType of the EMBEDDED_ENTRY to display as you need
        if (node.data.target.sys.contentType.sys.id === "codeBlock") {
          if (node.data.target.fields.code.split("\n").length > 5) {
            return (
              <details open>
                <summary>{node.data.target.fields.language?.toUpperCase() || "Code:"}</summary>
                <pre>
                  <code>{node.data.target.fields.code}</code>
                </pre>
              </details>
            );
          }
          return (
              <pre>
              <code>{node.data.target.fields.code}</code>
            </pre>
          );
        }

        if (node.data.target.sys.contentType.sys.id === "videoEmbed") {
          return (
            <iframe
              src={node.data.target.fields.embedUrl}
              height="100%"
              width="100%"
              title={node.data.target.fields.title}
              allowFullScreen={true}
            />
          );
        }
      },

      [BLOCKS.EMBEDDED_ASSET]: (node: Node) => {
        // render the EMBEDDED_ASSET as you need
        if (node.data.target.fields.file.contentType.includes("zip")) {
          return (
            <a
              href={node.data.target.fields.file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="downloadLink"
            >
              Download: {node.data.target.fields.file.fileName}
            </a>
          );
        } else if (node.data.target.fields.file.contentType.includes("image")) {
          const asset = node.data.target;
          const url = new URL(
            asset.fields?.file?.url || "",
            "https://images.ctfassets.net",
          );
          url.searchParams.set("h", String(config?.image.height || 900));
          url.searchParams.set("w", String(config?.image.width || 700));

          return (
            <img
              className={`contentful ${config?.image.className || ""}`}
              src={url.toString()}
              alt={node.data.target.fields.description}
            />
          );
        }
      },
    },
  };
};

type Props = {
  document?: Parameters<typeof documentToReactComponents>[0];
  config?: RenderOptionsConfig;
};

// eslint-disable-next-line react/prop-types
const ContentfulDocument: React.FC<Props> = ({ document, config }) => {
  if (!document) return null;
  return documentToReactComponents(document, renderOptions(config));
};

export default ContentfulDocument;

import client from "./client";
import { TypeCyoaStorySkeleton } from "./contentTypes";

export const getAll = async () => {
  const response = await client.getEntries<TypeCyoaStorySkeleton>({
    content_type: "cyoaStory",
  });
  return response.items;
};

export const get = async (id: string) => {
  const response = await client.getEntry<TypeCyoaStorySkeleton>(id);
  if (response.sys.contentType.sys.id === "cyoaStory") {
    return response.fields;
  }
  return null;
};

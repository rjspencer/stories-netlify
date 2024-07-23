import client from "./client";
import { isTypeCyoaChoice, TypeCyoaChoiceSkeleton } from "./contentTypes";

export const getAll = async () => {
  const response = await client.getEntries<TypeCyoaChoiceSkeleton>({
    content_type: "cyoaChoice",
  });
  return response.items;
};

export const get = async (id: string) => {
  const response = await client.getEntry<TypeCyoaChoiceSkeleton>(id);

  if (isTypeCyoaChoice(response)) {
    return response.fields;
  }
  return null;
};

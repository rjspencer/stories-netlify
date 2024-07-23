import client from "./client";
import {
  isTypeCyoaChoice,
  isTypeCyoaPage,
  TypeCyoaPageSkeleton,
} from "./contentTypes";

export const getAll = async () => {
  const response = await client.getEntries<TypeCyoaPageSkeleton>({
    content_type: "cyoaPage",
  });
  return response.items;
};

export const get = async (id: string) => {
  const response = await client.getEntry<TypeCyoaPageSkeleton>(id);

  if (isTypeCyoaPage(response)) {
    // Filter out any mis-linked entries and lock in a better type
    const choice =
      response.fields.choice?.filter((entry) => isTypeCyoaChoice(entry)) ?? [];

    return {
      ...response.fields,
      choice,
    };
  }
  return null;
};

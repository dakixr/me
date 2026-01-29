import { defaultSchema } from "rehype-sanitize";
import type { Options } from "rehype-sanitize";

export const markdownSanitizeSchema: Options = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code || []), "className"],
    pre: [...(defaultSchema.attributes?.pre || []), "className"],
    span: [...(defaultSchema.attributes?.span || []), "className"],
  },
};

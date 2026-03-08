import Type from 'typebox';

export const ContentInfoSchema = Type.Object({
  key: Type.String(),
  title: Type.String(),
});

export type ContentInfoType = Type.Static<typeof ContentInfoSchema>;

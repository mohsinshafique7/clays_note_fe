import { z } from 'zod';
export const NoteSchema = z.object({
  id: z.number().min(1),
  title: z.string(),
  description: z.string(),
  createdAt: z.string().transform((str) => new Date(str)),
});
export const AllNotesSchema = z.array(NoteSchema);
export const createUpdateNoteSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const deleteNoteschema = z.object({
  noteId: z.string().nullish(),
});

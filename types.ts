import { z } from 'zod';

const AllNotesSchema = z.object({
  id: z.string().min(1),
  title: z.string(),
  description: z.string(),
  createdAt: z.date(),
});
export type Note = z.infer<typeof AllNotesSchema>;

const createUpdateNoteSchema = z.object({
  title: z.string(),
  description: z.string(),
});
export type CreateUpdateNote = z.infer<typeof createUpdateNoteSchema>;

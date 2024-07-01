import { NoteSchema, createUpdateNoteSchema } from '@/validators/validatores';
import { z } from 'zod';

export type Note = z.infer<typeof NoteSchema>;

export type CreateUpdateNote = z.infer<typeof createUpdateNoteSchema>;

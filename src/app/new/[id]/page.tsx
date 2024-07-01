import { SubmitButton } from '../../components/SubmitButton';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { revalidatePath, unstable_noStore as noStore } from 'next/cache';
import AxiosInstance from '../../../lib/axiosConfig';
import { CreateUpdateNote, Note } from '../../../../types';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { NoteSchema, createUpdateNoteSchema } from '@/validators/validatores';
const getSingleNotes = async (id: string): Promise<Note> => {
  noStore();
  const response = await AxiosInstance.get(`/notes/${id}`);
  console.log(response.data.row);
  const result = NoteSchema.safeParse(response.data.row);
  if (!result.success) {
    throw new Error('Internal Server Error');
  }

  return result.data;
};
const updateNote = async (id: number, data: CreateUpdateNote) => {
  return await AxiosInstance.patch(`/notes/${id}`, data);
};

export default async function DynamicRoute({
  params,
}: {
  params: { id: string };
}) {
  const data: Note = await getSingleNotes(params.id);
  async function updateData(formData: FormData) {
    'use server';
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const valid = createUpdateNoteSchema.safeParse({ title, description });
    if (valid.success) {
      await updateNote(data.id, { title, description });
      revalidatePath('/');
      return redirect('/');
    } else {
      throw new Error('Internal Server Error');
    }
  }
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen w-full">
          <Loader2 className="mr-2 w-10 h-10 animate-spin" />
          <p>Loading your favorite Note.......</p>
        </div>
      }
    >
      <Card>
        <form action={updateData}>
          <CardHeader>
            <CardTitle>Edit Note</CardTitle>
            <CardDescription>
              Right here you can now edit your notes
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-5">
            <div className="gap-y-2 flex flex-col">
              <Label>Title</Label>
              <Input
                required
                type="text"
                name="title"
                placeholder="Title for your note"
                defaultValue={data?.title}
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Description</Label>
              <Textarea
                name="description"
                placeholder="Describe your note as you want"
                required
                defaultValue={data?.description}
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button asChild variant="destructive">
              <Link href="/">Cancel</Link>
            </Button>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
    </Suspense>
  );
}

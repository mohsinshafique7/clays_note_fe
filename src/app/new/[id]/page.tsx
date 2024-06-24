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
const getSingleNotes = async (id: string) => {
  noStore();
  const data = await AxiosInstance.get(`/notes/${id}`);
  return data.data.row;
};
const updateNote = async (id: string, data: CreateUpdateNote) => {
  return await AxiosInstance.patch(`/notes/${id}`, data);
};

export default async function DynamicRoute({
  params,
}: {
  params: { id: string };
}) {
  const data: Note = await getSingleNotes(params.id);
  async function postData(formData: FormData) {
    'use server';
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    await updateNote(data.id, { title, description });
    revalidatePath('/');

    return redirect('/');
  }
  return (
    <Card>
      <form action={postData}>
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
  );
}

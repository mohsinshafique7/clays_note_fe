import { SubmitButton } from '@/app/components/SubmitButton';
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
import AxiosInstance from '../../lib/axiosConfig';
import { CreateUpdateNote } from '../../../types';
const createNewNotes = async (data: CreateUpdateNote) => {
  await AxiosInstance.post('/notes', data);
};

export default function NewNote() {
  async function postData(formData: FormData) {
    'use server';

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    await createNewNotes({ title, description });
    return redirect('/');
  }

  return (
    <Card>
      <form action={postData}>
        <CardHeader>
          <CardTitle>New Notes</CardTitle>
          <CardDescription>
            Right here you can new create your new notes
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
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              placeholder="Note description goes here...."
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button asChild variant={'destructive'}>
            <Link href="/dashboard">Cancel</Link>
          </Button>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}

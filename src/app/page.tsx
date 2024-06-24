import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Edit, File, LoaderIcon, Trash } from 'lucide-react';
import moment from 'moment-timezone';
import Link from 'next/link';
import AxiosInstance from '../lib/axiosConfig';
import { revalidatePath, unstable_noStore as noStore } from 'next/cache';
import { TrashDelete } from './components/SubmitButton';
import { z } from 'zod';
import { Note } from '../../types';
import { validateSchema } from '@/lib/zod.lib';

const getAllNotes = async () => {
  noStore();
  const data = await AxiosInstance.get('/notes');
  const formatedData: Note[] = data.data.map((note: Note) => {
    return {
      id: note.id,
      title: note.title,
      description: note.description,
      createdAt: note.createdAt,
    };
  });
  return formatedData;
};

async function deleteNote(formData: FormData) {
  'use server';

  const noteId = formData.get('noteId') as string;
  const schema = z.object({
    noteId: z.string().nullish(),
  });
  console.log(noteId, typeof noteId);
  if (validateSchema(schema)) return;

  await AxiosInstance.delete(`/notes/${noteId}`);

  revalidatePath('/');
}
async function Home() {
  const notesData = await getAllNotes();
  return (
    <div className="grid items-start gap-y-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl"> Your Notes</h1>
          <p className="text-lg text-muted-foreground">
            Here you can see and create new notes...
          </p>
        </div>
        <Button asChild>
          <Link href="/new">Create a new Note</Link>
        </Button>
      </div>
      {notesData.length < 1 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md boarder-md boarder-dashboard p-8 text-center animate-in fade-in-50">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <File className="w-10 h-10 text-primary" />
          </div>
          <h2 className="mt-6 text-xl font-semibold">
            {' '}
            You dont have any notes created
          </h2>
          <p className="mb-8 mt-2 text-center text-sm loading-6 text-muted-foreground max-w-sm mx-auto">
            You currently dont have any notes, please create some so that you
            can see them right here
          </p>
          <Button asChild>
            <Link href="/new">Create a new Note</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-y-4">
          {notesData &&
            notesData?.map((item: Note) => (
              <Card
                key={item.id}
                className="flex items-center justify-between p-4"
              >
                <div>
                  <Link href={`/new/${item.id}`}>
                    <h2 className="font-semibold text-xl text-primary">
                      {' '}
                      {item.title}
                    </h2>
                  </Link>

                  <p>
                    {moment(item.createdAt)
                      .tz('Europe/London')
                      .format('dddd, MMMM Do, YYYY')}
                  </p>
                </div>
                <div className="flex gap-x-4">
                  <Link href={`/new/${item.id}`}>
                    <Button variant={'outline'} size={'icon'}>
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <form action={deleteNote}>
                    <input type="hidden" name="noteId" value={item.id} />
                    <TrashDelete />
                  </form>
                </div>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
}
export default Home;

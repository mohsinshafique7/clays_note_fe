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
import { revalidatePath } from 'next/cache';
import { SubmitButton } from '@/app/components/SubmitButton';

export default async function DynamicRoute() {
  //   const { getUser } = getKindeServerSession();
  //   const user = await getUser();
  //   const data = await getData({ userId: user?.id as string, noteId: params.id });

  async function postData(formData: FormData) {
    'use server';
    console.log(formData);
    // if (!user) throw new Error("you are not allowed");

    // const title = formData.get('title') as string;
    // const description = formData.get('description') as string;

    // await prisma.note.update({
    //   where: {
    //     id: data?.id,
    //     userId: user.id,
    //   },
    //   data: {
    //     description: description,
    //     title: title,
    //   },
    // });

    revalidatePath('/dashboard');

    return redirect('/dashboard');
  }
  const data = { id: 10, title: 'Mohsin', description: 'ashdasjdh' };
  // {
  //     "extends": "next/core-web-vitals"
  //   }
  // {
  //     "extends": ["next", "prettier"],
  //     "trailingComma": "es5",
  //     "semi": true,
  //     "tabWidth": 2,
  //     "singleQuote": true,
  //     "jsxSingleQuote": true,
  //     "plugins": ["prettier-plugin-tailwindcss"]
  //   }
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
            <Link href="/dashboard">Cancel</Link>
          </Button>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}

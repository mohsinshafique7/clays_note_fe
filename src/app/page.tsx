import Image from 'next/image';
import { ThemeToggle } from './components/theme-toggle';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div>
      <section className=" flex items-center justify-center bg-background h-[90vh]">
        <div className="relative items-center w-full px-5 py-12 mx-auto lg:px-16 max-w-7xl md:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <div>
              ......



              <span className="w-auto px-6 py-4 rounded-full bg-secondary">
                <span className="text-sm font-medium text-primary">
                  Sort Your notes easily
                </span>
              
              
              </span>
              <h1 className="mt-8 text-3xl font-extrabold tracking-tight lg:text-6xl">
                Create Notes with ease
              </h1>
              <p className="mx-w-xl mx-auto mt-8 text-base lg:text-xl text-secondary-foreground">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Voluptas, nihil sapiente ad quae tenetur, veritatis velit, sed
                laboriosam accusamus neque adipisci! Libero ipsam eum doloribus
                dolores similique dolore cumque, architecto, iusto illum
                inventore necessitatibus quam culpa. Architecto dolores
                cupiditate exercitationem vitae eligendi minus incidunt porro
                harum. Itaque nulla vitae aliquid!
              </p>
            </div>
            <div className="flex justify-center max-w-sm max-auto mt-10">
              <Button size="lg" className="w-full">
                Sign Up for Free
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

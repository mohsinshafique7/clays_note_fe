import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  return (
    <div className="border-b bg-background h-[10vh] flex items-center">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <h1 className="font-bold text-3xl">
            Marshal<span className="text-primary">Sass</span>{' '}
          </h1>
        </Link>
        <div className="flex items-center gap-x-5">
          <ThemeToggle />
          <div className="flex items-center gap-x-5">
            <Button>Sign In</Button>
            <Button>Sign Up</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

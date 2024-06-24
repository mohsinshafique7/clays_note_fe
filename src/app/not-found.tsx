// pages/404.tsx

'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
const Custom404: React.FC = () => {
  const router = useRouter(); // Use useNavigate hook from next/navigation

  const handleRetry = () => {
    router.refresh();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-xl text-gray-600">
        Oops! The page you're looking for doesn't exist.
      </p>
      <div className="mt-8 flex space-x-4">
        <Link href="/" passHref>
          <Button
            as="a"
            variant="primary"
            className="bg-primary hover:bg-accent hover:text-accent-foreground text-white"
          >
            Go to Index
          </Button>
        </Link>
        <Button
          onClick={handleRetry}
          variant="secondary"
          className="bg-primary hover:bg-accent hover:text-accent-foreground text-white"
        >
          Retry
        </Button>
      </div>
    </div>
  );
};

export default Custom404;

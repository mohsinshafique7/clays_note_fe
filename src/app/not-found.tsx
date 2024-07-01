'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
const Custom404: React.FC = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-6xl font-bold text-gray-800">500</h1>
      <p className="mt-4 text-xl text-gray-600">Internal Server Error</p>
      <div className="mt-8 flex space-x-4">
        <Link href="/" passHref>
          <Button
            variant="link"
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

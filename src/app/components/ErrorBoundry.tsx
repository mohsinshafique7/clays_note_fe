'use client';
import React, { ReactNode, ErrorInfo } from 'react';
interface FallbackErrorComponentProps {
  error: Error | null;
}
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const FallbackErrorComponent: React.FC<FallbackErrorComponentProps> = ({
  error,
}) => {
  const router = useRouter();

  const handleRetry = () => {
    router.refresh();
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="mt-4 text-xl text-gray-600">
          Oops! Something went wrong.
        </p>
        <p className="mt-4 text-sm text-gray-600">{error && error.message}</p>
        <div className="mt-8 flex space-x-4">
          <Link href="/" passHref>
            <Button
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
    </div>
  );
};

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error: error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by Error Boundary:', error, errorInfo);
    // Log the error to an error reporting service console
  }

  render() {
    if (this.state.hasError) {
      return <FallbackErrorComponent error={this.state.error} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

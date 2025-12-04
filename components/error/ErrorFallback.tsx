import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Button from '../ui/Button';

interface ErrorFallbackProps {
  error?: Error;
  resetErrorBoundary?: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
         
         <div className="w-20 h-20 bg-red-100 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
             <AlertTriangle size={40} />
         </div>

         <h1 className="font-display font-bold text-3xl text-gray-900 mb-4">
             Something went wrong.
         </h1>
         <p className="text-gray-500 mb-8 leading-relaxed">
             We're experiencing technical difficulties. Our team has been notified.
             {error && <span className="block mt-4 text-xs font-mono bg-gray-100 p-2 rounded text-red-800">{error.message}</span>}
         </p>

         <div className="flex flex-col gap-3">
             {resetErrorBoundary && (
                 <Button 
                    onClick={resetErrorBoundary} 
                    className="w-full bg-gray-900 hover:bg-black"
                    leftIcon={<RefreshCw size={18} />}
                 >
                     Try Again
                 </Button>
             )}
             
             <Button 
                onClick={() => window.location.href = '/'}
                variant="outline"
                className="w-full"
                leftIcon={<Home size={18} />}
             >
                Return Home
             </Button>
         </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
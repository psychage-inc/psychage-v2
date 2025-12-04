import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Loader2 } from 'lucide-react';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Base Skeleton Primitive
const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div 
    className={cn("animate-pulse bg-gray-200 rounded-md", className)} 
    style={{
        backgroundImage: 'linear-gradient(90deg, #e5e7eb 0%, #f3f4f6 50%, #e5e7eb 100%)',
        backgroundSize: '200% 100%',
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
    }}
  />
);

export const GlobalLoading = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#fafaf9]/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4">
            <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-gray-200" />
                <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-teal-500 border-t-transparent animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-teal-500 rounded-full" />
                </div>
            </div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest animate-pulse">Loading</p>
        </div>
    </div>
);

export const SkeletonArticleCard = () => (
  <div className="bg-white rounded-3xl border border-gray-100 p-6 h-full flex flex-col shadow-sm">
    <Skeleton className="w-full aspect-video rounded-2xl mb-6" />
    <div className="space-y-3 flex-grow">
       <div className="flex gap-2 mb-4">
          <Skeleton className="h-6 w-20 rounded-full" />
       </div>
       <Skeleton className="h-8 w-3/4 mb-2" />
       <Skeleton className="h-8 w-1/2" />
       <div className="mt-4 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
       </div>
    </div>
    <div className="mt-6 pt-4 border-t border-gray-50 flex items-center gap-2">
       <Skeleton className="h-4 w-4 rounded-full" />
       <Skeleton className="h-4 w-24" />
    </div>
  </div>
);

export const SkeletonVideoCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
    <Skeleton className="w-full aspect-video" />
    <div className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <div className="flex items-center gap-2 mt-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-1 w-1 rounded-full" />
            <Skeleton className="h-4 w-24" />
        </div>
    </div>
  </div>
);

export const SkeletonProviderCard = () => (
  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full">
      <div className="flex items-start gap-4 mb-6">
          <Skeleton className="w-16 h-16 rounded-full shrink-0" />
          <div className="flex-grow">
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-4 w-20" />
          </div>
      </div>
      <div className="flex gap-2 mb-6">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
      </div>
      <div className="space-y-3 mb-6">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="flex gap-3">
          <Skeleton className="h-10 flex-1 rounded-lg" />
          <Skeleton className="h-10 w-20 rounded-lg" />
      </div>
  </div>
);

export const SkeletonArticleDetail = () => (
  <div className="animate-pulse bg-white min-h-screen">
    <div className="container mx-auto max-w-5xl px-6 pt-32 pb-24">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-12 text-center md:text-left">
            <div className="flex justify-center md:justify-start gap-2 mb-8">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-4 w-24 mb-6 mx-auto md:mx-0 rounded-full" />
            <Skeleton className="h-12 w-3/4 mb-4 mx-auto md:mx-0" />
            <Skeleton className="h-12 w-2/3 mb-8 mx-auto md:mx-0" />
            
            <div className="flex flex-col md:flex-row justify-between gap-6 border-t border-b border-gray-100 py-6">
                 <div className="flex items-center gap-4">
                     <Skeleton className="w-12 h-12 rounded-full" />
                     <div className="space-y-2">
                         <Skeleton className="h-4 w-32" />
                         <Skeleton className="h-3 w-24" />
                     </div>
                 </div>
                 <div className="flex gap-4">
                     <Skeleton className="h-8 w-24" />
                     <Skeleton className="h-8 w-24" />
                 </div>
            </div>
        </div>
    
        {/* Image */}
        <Skeleton className="w-full aspect-[21/9] rounded-[2rem] mb-16" />
    
        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-[1280px] mx-auto">
            <div className="hidden lg:block lg:col-span-3 space-y-4">
                <Skeleton className="h-4 w-24 mb-6" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="lg:col-span-7 space-y-6">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-32 w-full rounded-2xl my-8" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
            </div>
        </div>
    </div>
  </div>
);

export const SkeletonVideoDetail = () => (
  <div className="animate-pulse min-h-screen bg-white">
      {/* Sticky Header */}
      <div className="border-b border-gray-100 px-6 py-4">
         <div className="container mx-auto max-w-[1280px] flex items-center gap-4">
             <Skeleton className="w-8 h-8 rounded-full" />
             <Skeleton className="h-4 w-48 flex-grow" />
             <Skeleton className="h-8 w-24 rounded-full" />
         </div>
      </div>

      <div className="container mx-auto max-w-[1280px] px-6 py-8">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
             <div className="lg:col-span-8">
                 <Skeleton className="w-full aspect-video rounded-2xl mb-6" />
                 <Skeleton className="h-8 w-3/4 mb-4" />
                 <div className="flex justify-between mb-6 pb-6 border-b border-gray-100">
                     <div className="flex gap-4">
                         <Skeleton className="w-10 h-10 rounded-full" />
                         <div className="space-y-2">
                             <Skeleton className="h-4 w-32" />
                             <Skeleton className="h-3 w-24" />
                         </div>
                     </div>
                     <Skeleton className="h-8 w-48 rounded-full" />
                 </div>
                 <Skeleton className="h-32 w-full rounded-2xl" />
             </div>
             <div className="lg:col-span-4 space-y-6">
                 <Skeleton className="h-6 w-24 mb-4" />
                 {[1,2,3].map(i => (
                     <div key={i} className="flex gap-3">
                         <Skeleton className="w-40 h-24 rounded-lg shrink-0" />
                         <div className="space-y-2 w-full">
                             <Skeleton className="h-4 w-full" />
                             <Skeleton className="h-3 w-20" />
                         </div>
                     </div>
                 ))}
             </div>
         </div>
      </div>
  </div>
);

export const SkeletonProviderProfile = () => (
    <div className="animate-pulse pt-28 pb-20 container mx-auto max-w-5xl px-6 bg-[#fafaf9] min-h-screen">
        <Skeleton className="h-4 w-32 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-8">
                     <Skeleton className="w-32 h-32 rounded-full shrink-0" />
                     <div className="space-y-4 w-full">
                         <Skeleton className="h-8 w-1/2" />
                         <Skeleton className="h-6 w-1/3" />
                         <div className="flex gap-4">
                             <Skeleton className="h-8 w-24 rounded-lg" />
                             <Skeleton className="h-8 w-32 rounded-lg" />
                         </div>
                     </div>
                </div>
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-4">
                    <Skeleton className="h-6 w-32 mb-4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-4">
                    <Skeleton className="h-6 w-48 mb-4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
            </div>
            <div className="lg:col-span-4">
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-lg space-y-6">
                    <div className="flex justify-between">
                         <Skeleton className="h-4 w-20" />
                         <Skeleton className="h-4 w-20" />
                    </div>
                    <div className="space-y-4">
                         <Skeleton className="h-16 w-full rounded-xl" />
                         <Skeleton className="h-16 w-full rounded-xl" />
                    </div>
                    <Skeleton className="h-12 w-full rounded-xl" />
                </div>
            </div>
        </div>
    </div>
);

export const SkeletonProviderDirectory = () => (
    <div className="min-h-screen bg-[#fafaf9] pt-28 pb-20">
         <div className="container mx-auto max-w-[1200px] px-6">
             <div className="text-center max-w-2xl mx-auto mb-12">
                 <Skeleton className="h-12 w-3/4 mx-auto mb-6" />
                 <Skeleton className="h-6 w-1/2 mx-auto" />
             </div>
             
             <Skeleton className="h-24 w-full max-w-4xl mx-auto rounded-2xl mb-8" />
             
             <div className="flex justify-center gap-3 mb-12">
                  {[1,2,3,4].map(i => <Skeleton key={i} className="h-10 w-24 rounded-full" />)}
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1,2,3,4,5,6].map(i => <SkeletonProviderCard key={i} />)}
             </div>
         </div>
    </div>
);

export default Skeleton;
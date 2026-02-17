"use client"
import Reveal from '@/components/Reveal'
import SplineHero from '@/components/SplineHero'
import { lazy, Suspense, useEffect, useState } from 'react';

const InteractiveScene = lazy(() => import("@/components/three/InteractiveScene"));

// Simple error boundary component
function SceneErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.message?.includes('WebGL') || event.message?.includes('three')) {
        setHasError(true);
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (event.reason?.message?.includes('WebGL') || event.reason?.message?.includes('three')) {
        setHasError(true);
      }
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="text-center p-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">3D Scene Unavailable</h3>
          <p className="text-gray-600 text-sm mb-4">
            There was an issue loading the interactive 3D scene.
          </p>
          <button 
            onClick={() => setHasError(false)}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default function Main() {
  const [isDesktop, setIsDesktop] = useState(0);
  const [showFallback, setShowFallback] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsDesktop(window.innerWidth);
    
    // Check for WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setShowFallback(true);
    }
    
    // Force loading for 1 second to allow InteractiveScene to render
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white relative">
      {/* Loading overlay */}
      <div 
        className={`fixed inset-0 z-50 bg-white flex items-center justify-center transition-opacity duration-500 pointer-events-none ${
          isLoading ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
          <p className="font-editorial text-gray-500 text-sm italic">Loading experience...</p>
        </div>
      </div>
      <section className="relative isolate px-4 lg:px-6 flex justify-center mb-4 sm:mb-20">
        <div className="mx-auto max-w-5xl py-12 flex flex-col gap-12">
          <div className="text-center">
            <Reveal>
              <h1 className="font-editorial text-4xl font-medium tracking-tight text-gray-900 sm:text-6xl italic">
              Designing intelligence  that feels human.            </h1>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="font-editorial mt-6 text-lg leading-8 text-gray-600">
              Fragments of practice and thinking.              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 flex items-center justify-center gap-x-4">
                <a href='/projects' className="rounded-full border border-black px-5 py-2 text-sm font-medium hover:bg-black hover:text-white transition-colors">View Projects</a>
                <a href='/resume' className="rounded-full px-5 py-2 text-sm font-medium underline underline-offset-4">Resume</a>
              </div>
            </Reveal>
          </div>
          <div className="w-full max-w-8xl sm:w-full mx-auto h-96 sm:h-128 rounded-lg border border-border overflow-hidden animate-enter">
            {showFallback ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-50">
                <div className="text-center p-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">WebGL Not Supported</h3>
                  <p className="text-gray-600 text-sm">
                    Your browser doesn't support WebGL required for the 3D scene.
                  </p>
                </div>
              </div>
            ) : (
              <SceneErrorBoundary>
                <Suspense
                  fallback={
                    <div className="w-full h-full animate-pulse bg-muted" />
                  }
                >
                  <InteractiveScene />
                </Suspense>
              </SceneErrorBoundary>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}





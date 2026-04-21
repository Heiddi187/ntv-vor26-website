import { useState } from "react";

// 1. "Crash on next render" → flips a useState flag that causes a child
//    component to `throw new Error(...)` during render.
//    => should be caught by <ErrorBoundary>

function CrashOnRender(): React.ReactNode {
  throw new Error('Crash during render (ErrorBoundry test)')
}

function CrashButton() {
  const [crash, setCrash] = useState(false)
  if (crash) return <CrashOnRender />
  return (
    <button
      onClick={() => setCrash(true)}
      className="rounded border px-3 py-2 text-left hover:bg-gray-300"
    >
      Crash on next render (caught by ErrorBoundary)
    </button>
  )
}

export function IndexPage() {
  // TODO: Add three test buttons so you can verify every part of your error
  // handling is wired up correctly. Each button targets a different handler:
  //
  const triggerUnhandledRejection = () => {
    Promise.reject(new Error('unhandled promise rejection'));
  }

    const throwInTimeout = () => {
      setTimeout(() => {
        throw new Error('error from setTimeout')
      }, 0)
    }
  
  // 2. "Unhandled promise rejection" → onClick creates a `Promise.reject(...)`
  //    with no .catch().
  //    => should be caught by the window 'unhandledrejection' listener
  //
  // 3. "Throw from setTimeout" → onClick schedules a setTimeout callback
  //    that throws.
  //    => should be caught by the window 'error' listener
  //
  // After clicking each one, check the console — every error should be
  // prefixed with [error] (your logger), proving it flowed through logger.error.

  return (
    <main className="min-h-screen bg-background">
      <h1 className="text-4xl font-bold">Verkefni 12</h1>
      <div className="mt-6 flex flex-col gap-2">
        <CrashButton />
        <button
          onClick={triggerUnhandledRejection}
          className="rounded border px-3 py-2 text-left hover:bg-gray-200"
        >
          Throw unhandled promise rejection (caught by global handler) check it out in 'inspect'
        </button>
        <button 
          onClick={throwInTimeout}
          className="rounded border px-3 py-2 text-left hover:bg-gray-200"
        >
          Throw inside setTimeout (caught by global handler) check it out in 'inspect'
        </button>
      </div>
    </main>
  );
}

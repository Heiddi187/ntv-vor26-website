import { Counter } from '@/components/Counter/Counter';
import { Greeting } from '@/components/Greeting/Greeting';
import { QuoteCard } from '@/components/Quote/QuoteCard';
import Task, { type TaskData } from '@/components/Task/Task';
import { useState } from 'react';

export function IndexPage() {
  const [task, setTask] = useState<TaskData>({
    id: '1',
    title: 'Learning stuff',
    state: 'TASK_INBOX' as const
  });

  return (
    <div className="mx-auto max-w-lg space-y-6 text-left">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">
          Verkefni 14 — Storybook og prófanir
        </h1>
        <ul className="text-muted-foreground mt-2 list-inside list-disc space-y-1.5 text-sm">
          <li>
            <strong className="text-foreground">Vitest</strong> — rökfræði,
            hjálparföll og smá hegðun í íhlutum (jsdom).{' '}
            <code className="bg-muted rounded px-1 py-0.5 font-mono text-xs">
              npm run test:run
            </code>
          </li>
          <li>
            <strong className="text-foreground">Storybook</strong> — sjónræn
            ásýnd, mismunandi ástand og sýning á gagnvirkni.{' '}
            <code className="bg-muted rounded px-1 py-0.5 font-mono text-xs">
              npm run storybook
            </code>
          </li>
          <li>
            <strong className="text-foreground">Cypress</strong> — enda-í-enda
            próf í vafra gegn keyrandi appi.{' '}
            <code className="bg-muted rounded px-1 py-0.5 font-mono text-xs">
              npm run e2e
            </code>{' '}
            (ræsir Vite + Cypress)
          </li>
        </ul>
      </header>
      <Counter />
      <Greeting />
      <QuoteCard />
      <Task 
        task={task}
        onArchiveTask={(id) => 
          setTask((t) => ({ 
            ...t, 
            state: t.state === 'TASK_ARCHIVED'
              ? 'TASK_INBOX'
              : 'TASK_ARCHIVED'
          }))
        }
        onPinTask={(id) =>
          setTask((t) => ({ 
            ...t, 
            state: t.state === 'TASK_PINNED'
              ? 'TASK_INBOX' 
              : 'TASK_PINNED'
          }))
        }
      />
    </div>
  );
}

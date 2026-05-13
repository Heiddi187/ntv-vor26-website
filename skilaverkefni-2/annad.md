Vitest
npm install -D vitest
npm install --save-dev @testing-library/react @testing-library/dom @types/react @types/react-dom
npm install -D @testing-library/jest-dom
npm install -D jsdom

Storybook
// npx storybook@latest init //

Cypress
// npm install cypress --save-dev //

CI Pipeline

Visual testing
-bætist endalaust við, task container stækkar endalaust og textinn alltaf á botninum
-TASKS stats breytist ekki þegar maður eyðir projecti, completed og incomplete haldast inn í stats
-þegar ég eyði öllum projectum er ennþá tasks í chartinu

-react-dom_client.js?v=09814bf7:3713 Encountered two children with the same key, `ccbbf653-aa80-49f7-b489-293baf1cce47`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.
-Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received

-- Gular viðvaranir (): 
-checkbox.tsx: rounded-[4px]

-select.tsx: data-[disabled]:pointer-events-none data-[disabled]:opacity-50 
/AND/ h-[var(--radix-select-trigger-height)]
/AND/ min-w-[var(--radix-select-trigger-width)]
/AND/ min-w-[8rem]
/AND/ data-[placeholder]:text-muted-foreground

-table.tsx: [&>[role=checkbox]]:translate-y-[2px]
/AND/ [&>[role=checkbox]]:translate-y-[2px]

-Chart.tsx: max-h-[250px]
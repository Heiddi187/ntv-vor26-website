npx shadcn@latest add ... (card, input, field, label) kemur í components/ui

grunnregla arkitektúrs - aðskilja UI, business logic, data access, state
src/
    features/
        users/
        components/
        api/
        hooks/
        types.ts
    users/
    shared/
        components/
            Button.tsx
            Modal.tsx
        hooks/
            useFetch.ts
        utils/
            formatDate.ts
        types/
    auth/
    dashboarad/

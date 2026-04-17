// TODO: Build a class-based ErrorBoundary component.
// React's error boundary API only exists on class components — there is no
// hook version. This is the one place you still need `class extends Component`.
//
// Requirements:
// 1. It must be a class component that extends React.Component.
// 2. It takes `children: ReactNode` as a prop.
// 3. It has internal state with a `hasError: boolean` flag.
// 4. Implement the static method `getDerivedStateFromError` that returns the
//    new state ({ hasError: true }) when a child throws during render.
// 5. Implement `componentDidCatch(error, info)` and call `logger.error(...)`
//    inside it so every render crash is reported through your logger.
// 6. In render(), if hasError is true, show a fallback UI (e.g. a red banner
//    saying "Something went wrong."). Otherwise return this.props.children.

import { Component, type ErrorInfo, type ReactNode } from 'react'
import { logger } from '@/shared/lib/logger'

type Props = {
    children: ReactNode
};

type State = {
    hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false };

    // _error: Error to make it clear what triggered the error
    static getDerivedStateFromError(_error: Error): State {
        return { hasError: true };
    };

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        logger.error('ErrorBoundary caught a render error', { error, errorInfo });
    };

    render(): React.ReactNode {
        if (this.state.hasError) {
            return (
                <div className='rounded border border-red-500 bg-red-50 p-4 text-red-900'>
                    <p className='font-semibold'>Something went wrong</p>
                    <p className='text-sm'>Please try refreshing the page</p>
                </div>
            )
        }
        return this.props.children
    }
}
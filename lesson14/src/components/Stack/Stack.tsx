import type { CSSProperties, PropsWithChildren } from "react";

type StackProps = PropsWithChildren & {
    orientation: 'horizontal' | 'vertical';
    count?: number;
};

export default function Stack({
    children,
    orientation = 'horizontal',
    count = 3
}: StackProps) {
    const orientationStyles: Record<StackProps['orientation'], CSSProperties> = {
        horizontal: {
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem'
        },
        vertical: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'flex-start'
        },
    };

    return <div style={{ ...orientationStyles[orientation] }}>
            {Array.from({ length: count }).map((_, i) => (
                <div 
                    key={i}
                    style={{
                        padding: '2rem',
                        background: '#ddd',
                        borderRadius: '6px'
                    }}
                >
                    Item {i + 1}
                </div>
            ))}
        </div>
}
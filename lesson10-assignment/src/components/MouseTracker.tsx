import { useState } from 'react';

// TODO: Type this render-props component so that:
// 1. `children` is NOT ReactNode — it must be a function (render prop)
// 2. The function receives a typed object: { x: number; y: number; isHovering: boolean }
// 3. The function must return a valid ReactNode
// If a consumer passes a plain JSX element as children (not a function), TypeScript should error.
function MouseTracker({ children }: any) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      onMouseMove={(e: any) => setPosition({ x: e.clientX, y: e.clientY })}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ minHeight: '200px' }}
    >
      {children({ x: position.x, y: position.y, isHovering })}
    </div>
  );
}

export { MouseTracker };

// TODO: Type this component so that:
// 1. `children` is properly typed as React.ReactNode
// 2. `title` is a required string
// 3. `bordered` is an optional boolean
// 4. `background` only accepts 'none' | 'muted' | 'accent'
// 5. All remaining native <section> props (className, id, aria-*, etc.) are forwarded and type-checked
function Section({ title, children, bordered, background, className, ...props }: any) {
  const bgStyles: any = {
    none: '',
    muted: 'bg-gray-50',
    accent: 'bg-blue-50',
  };

  return (
    <section
      className={`${bordered ? 'rounded-lg border' : ''} ${bgStyles[background || 'none']} ${className || ''}`}
      {...props}
    >
      <h2 className="mb-3 text-lg font-bold">{title}</h2>
      <div>{children}</div>
    </section>
  );
}

export { Section };

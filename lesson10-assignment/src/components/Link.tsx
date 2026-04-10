// TODO: Make this component polymorphic.
// The `as` prop should accept any valid HTML element type (e.g. 'a', 'button', 'span').
// The remaining props should be inferred from the resolved element —
// for example, if as="a" then `href` and `target` should autocomplete,
// if as="button" then `disabled` and `type` should autocomplete.
// Default `as` to 'a' when not provided.
// `variant` should only accept 'default' | 'muted' | 'underline'.
function Link({ as, variant, children, className, ...props }: any) {
  const Component = as || 'a';

  const variantStyles: any = {
    default: 'text-blue-600 hover:text-blue-800',
    muted: 'text-gray-500 hover:text-gray-700',
    underline: 'text-blue-600 underline underline-offset-2 hover:text-blue-800',
  };

  return (
    <Component
      className={`inline-flex items-center gap-1 ${variantStyles[variant || 'default']} ${className || ''}`}
      {...props}
    >
      {children}
    </Component>
  );
}

export { Link };

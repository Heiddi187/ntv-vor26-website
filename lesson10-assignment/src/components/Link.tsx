// TODO: Make this component polymorphic.
// // The `as` prop should accept any valid HTML element type (e.g. 'a', 'button', 'span').
// // The remaining props should be inferred from the resolved element —
// // for example, if as="a" then `href` and `target` should autocomplete,
// // if as="button" then `disabled` and `type` should autocomplete.
// // Default `as` to 'a' when not provided.
// // `variant` should only accept 'default' | 'muted' | 'underline'.

type LinkProps<T extends React.ElementType = "a"> = {
   as?: T;
   variant?: "default" | "muted" | "underline";
   className?: string;
   children: React.ReactNode;
} & Omit<React.ComponentProps<T>, "as" | "className" | "children">;

function Link<T extends React.ElementType = "a">({
   as,
   variant = 'default',
   children,
   className,
   ...props
}: LinkProps<T>) {
   const Component = as || "a";

   const variantStyles = {
      default: "text-blue-600 hover:text-blue-800",
      muted: "text-gray-500 hover:text-gray-700",
      underline:
         "text-blue-600 underline underline-offset-2 hover:text-blue-800",
   };

   return (
      <Component
         className={`inline-flex items-center gap-1 ${variantStyles[variant]} ${className || ""}`}
         {...props}
      >
         {children}
      </Component>
   );
}

// orginal //
// function Link({ as, variant, children, className, ...props }: any) {
//   const Component = as || 'a';

//   const variantStyles: any = {
//     default: 'text-blue-600 hover:text-blue-800',
//     muted: 'text-gray-500 hover:text-gray-700',
//     underline: 'text-blue-600 underline underline-offset-2 hover:text-blue-800',
//   };

//   return (
//     <Component
//       className={`inline-flex items-center gap-1 ${variantStyles[variant || 'default']} ${className || ''}`}
//       {...props}
//     >
//       {children}
//     </Component>
//   );
// }

export { Link };

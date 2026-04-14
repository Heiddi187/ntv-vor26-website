// TODO: Type this component so that:
// 1. `children` is properly typed as React.ReactNode
// 2. `title` is a required string
// 3. `bordered` is an optional boolean
// 4. `background` only accepts 'none' | 'muted' | 'accent'
// 5. All remaining native <section> props (className, id, aria-*, etc.) are forwarded and type-checked

// const bgStyles = {
//    none: "",
//    muted: "bg-gray-50",
//    accent: "bg-blue-50",
// } as const;

type SectionProps = {
   title: string;
   bordered?: boolean;
   background: "none" | "muted" | "accent";
   children?: React.ReactNode;
} & React.ComponentProps<"section">;

function Section({
   title,
   children,
   bordered,
   background = "none",
   className,
   ...props
}: SectionProps) {
   const bgStyles = {
      none: "",
      muted: "bg-gray-50",
      accent: "bg-blue-50",
   };

   return (
      <section
         className={`${bordered ? "rounded-lg border" : ""} ${bgStyles[background]} ${className || ""}`}
         {...props}
      >
         <h2 className="mb-3 text-lg font-bold">{title}</h2>
         <div>{children}</div>
      </section>
   );
}

// first try //
// const bgStyles = {
//    none: "",
//    muted: "bg-gray-50",
//    accent: "bg-blue-50",
// } as const;

// type SectionProps<T extends React.ElementType = "section"> = {
//    as?: T;
//    children?: React.ReactNode;
//    className?: string;
//    title: string;
//    bordered?: boolean;
//    background: keyof typeof bgStyles;
// } & Omit<React.ComponentProps<T>, "children" | "as" | "className">;

// function Section<T extends React.ElementType>({
//    title,
//    children,
//    bordered,
//    background,
//    className,
//    ...props
// }: SectionProps<T>) {
//    return (
//       <section
//          className={`${bordered ? "rounded-lg border" : ""} ${bgStyles[background || "none"]} ${className || ""}`}
//          {...props}
//       >
//          <h2 className="mb-3 text-lg font-bold">{title}</h2>
//          <div>{children}</div>
//       </section>
//    );
// }

// orginal //
// function Section({ title, children, bordered, background, className, ...props }: any) {
//   const bgStyles: any = {
//     none: '',
//     muted: 'bg-gray-50',
//     accent: 'bg-blue-50',
//   };

//   return (
//     <section
//       className={`${bordered ? 'rounded-lg border' : ''} ${bgStyles[background || 'none']} ${className || ''}`}
//       {...props}
//     >
//       <h2 className="mb-3 text-lg font-bold">{title}</h2>
//       <div>{children}</div>
//     </section>
//   );
// }

export { Section };

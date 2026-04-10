// TODO: Make this component polymorphic.
// The `as` prop should accept any valid HTML element type (e.g. 'h1', 'p', 'span').
// The remaining props should be inferred from whatever element `as` resolves to —
// for example, if as="a", then `href` should be valid and autocomplete.
// Default `as` to 'p' when not provided.
type TextProps<T extends React.ElementType = "p"> = {
   as?: T;
   className?: string;
   children?: React.ReactNode;
} & Omit<React.ComponentProps<T>, "as" | "className" | "children">;

function Text<T extends React.ElementType>({
   as,
   children,
   className,
   ...props
}: TextProps<T>) {
   const Component = as || "p";

   return (
      <Component className={className} {...props}>
         {children}
      </Component>
   );
}

const ArrowText = <T extends React.ElementType>({
   as,
   children,
   className,
   ...props
}: TextProps<T>) => {
   const Component = as || "p";

   return (
      <Component className={className} {...props}>
         {children}
      </Component>
   );
};

export { Text };

// Generic examples from lesson
type Person = {
   age: number;
   height: number;
   eyeColor: string;
};

type FemalePerson = Person & {
   pregnant: boolean;
};

const female: FemalePerson = {
   age: 10,
   eyeColor: "blue",
   height: 100,
   pregnant: false,
};

type Animal<T> = T extends Fish
   ? {
        type: "fish";
        properties: T;
        hasColdBlood: boolean;
     }
   : T extends Person
     ? {
          type: "mammal";
          properties: T;
          hasColdBlood: boolean;
       }
     : never;

type Animal2 =
   | {
        type: "mammal";
        properties: Mammal;
     }
   | {
        type: "fish";
        properties: Fish;
     };

type Fish = {
   hasScales: boolean;
   freshWater: boolean;
   saltWater: boolean;
};

type Mammal = {
   hasFur: boolean;
   givesLiveBirth: boolean;
   producesMilk: boolean;
   numOfLegs: number;
};

const salmon: Animal<Fish> = {
   type: "fish",
   hasColdBlood: false,
   properties: {
      freshWater: true,
      hasScales: true,
      saltWater: true,
   },
};

const dog: Animal2 = {
   type: "mammal",
   properties: {
      givesLiveBirth: true,
      hasFur: true,
      numOfLegs: 4,
      producesMilk: true,
   },
};

console.log(female);
console.log(ArrowText);
console.log(salmon);
console.log(dog);

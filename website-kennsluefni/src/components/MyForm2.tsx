import { useCallback, useRef, useState } from "react";
import { Input } from "./Input";
import { Card, CardHeader, CardTitle } from "./ui/card";
import {
   FieldGroup,
   FieldLabel,
   FieldDescription,
   Field,
   FieldSet,
} from "./ui/field";
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from "./ui/select";
import { Button } from "./Button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import useDebounce from "@/hooks/useDebounce";

type FormValuesType = {
   firstName: string;
   lastName: string;
   email: string;
   phoneNumber: string;
   selectedFruit: string;
   radioButton: string | null;
};

export function MyForm2() {
   const [newsletter, setNewsletter] = useState(false);
   const [promotions, setPromotions] = useState(false);

   const dataRef = useRef<FormValuesType>({
      firstName: "",
      email: "",
      lastName: "",
      phoneNumber: "",
      selectedFruit: "",
      radioButton: null,
   });

   const [defaultValues, setDefaultValues] = useState<FormValuesType>({
      firstName: "",
      email: "",
      lastName: "",
      phoneNumber: "",
      selectedFruit: "",
      radioButton: null,
   });

   const firstNameRef = useRef("");

   const onSubmit = () => {
      const { firstName, email } = dataRef.current;
      localStorage.setItem(email, JSON.stringify(dataRef.current));
      window.alert(`Hello ${firstName}, email address ${email} `);
   };

   const loadEmailRef = useRef<HTMLInputElement>(null);

   const [emailKey, setEmailKey] = useState<string | null>(null);

   const onLoad = useCallback(() => {
      if (loadEmailRef.current && loadEmailRef.current.value) {
            const loadedEmail = loadEmailRef.current.value;
            const localStorageValue = localStorage.getItem(
            loadEmailRef.current?.value,
            );
            if (localStorageValue) {
                const parsedLocalStorageValue: FormValuesType =
                JSON.parse(localStorageValue);
                window.alert(parsedLocalStorageValue.firstName);
                loadEmailRef.current.value = "";
                setDefaultValues(parsedLocalStorageValue);
                setEmailKey(loadedEmail);
            } else {
                window.alert("Email not found");
            }
        } else {
            window.alert("A bug was found");
        }
    }, []);

   const onInputChange = useCallback(
      (key: keyof FormValuesType, value: string) => {
         dataRef.current[key] = value;
      },
      [],
   );

   const [searchTerm, setSearchTerm] = useState("");

   const debouncedSearchTerm = useDebounce(searchTerm, 1000);

   const handleInputChange = (value: string) => {
      setSearchTerm(value);
   };

   // // header name (notar setFirstName inn í onchange a inputti)
   // const [firstName, setFirstName] = useState('')
   // // btw þetta er kallað að gera nýtt state...
   // const [lastName, setLastName] = useState('')
   // const headerValueName = useMemo(() => {
   //     if (firstName || lastName) {
   //         return `${firstName} ${lastName}`
   //     }
   //     return ''
   // }, [firstName, lastName])

   return (
      <div>
         <Card className="bg-gray-200 msx-w-md mx-auto mt-10 shadow-lg">
            <CardHeader>
               <CardTitle>My Form 2</CardTitle>
               <p>FirstNameRefValue: {firstNameRef.current}</p>
            </CardHeader>

            <form
               className="space-y-6 p-6"
               onSubmit={(e) => {
                  e.preventDefault();
                  onSubmit();
                  // window.alert(`Hello ${dataRef.current.firstName}`)
               }}
            >
               <div className="space-y-2">
                  <FieldLabel htmlFor="name">
                     <div>Full name</div>
                  </FieldLabel>
                  <div>
                     {/* Header name dæmi */}
                     {/* {(firstName || lastName) ? <p>Your name is: {headerValueName} </p> : <p>What is your name?</p> } */}

                     {/* {(firstName && lastName) && <p>Your full name is: {headerValueName}</p>}
                            {(firstName && !lastName) && <p>Your first name is: {headerValueName}</p>}
                            {(!firstName && lastName) && <p>Your last name is: {headerValueName}</p>} */}
                  </div>
                  <div className="flex gap-4">
                     <Input
                        className="bg-white"
                        id="firstName"
                        autoComplete="off"
                        placeholder="First name"
                        defaultValue={defaultValues.firstName}
                        onChange={(e) => {
                           onInputChange("firstName", e.target.value);
                           //setFirstName(e.target.value) //sjá header name
                        }}
                        // onChange={(e) => {
                        //     dataRef.current = ({
                        //         ...dataRef.current,
                        //         firstName: e.target.value
                        //     });
                     />
                     <Input
                        className="bg-white"
                        id="lastName"
                        autoComplete="off"
                        placeholder="Last name"
                        // onChange={(e) => {
                        //     dataRef.current = ({
                        //         ...dataRef.current,
                        //         lastName: e.target.value
                        //     });
                        // }}
                        onChange={(e) => {
                           onInputChange("lastName", e.target.value);
                           //setLastName(e.target.value) //sjá header name
                        }}
                     />
                  </div>

                  <div className="flex gap-4">
                     <Input
                        className="bg-white"
                        id="email"
                        autoComplete="off"
                        type="email"
                        placeholder="Email"
                        // onChange={(e) => {
                        //     dataRef.current = ({
                        //         ...dataRef.current,
                        //         email: e.target.value
                        //     });
                        // }}
                        onChange={(e) => {
                           onInputChange("email", e.target.value);
                        }}
                     />
                     <Input
                        className="bg-white"
                        id="phoneNumber"
                        autoComplete="off"
                        placeholder="Phone number"
                        // onChange={(e) => {
                        //     dataRef.current = ({
                        //         ...dataRef.current,
                        //         phoneNumber: e.target.value
                        //     });
                        // }}
                        onChange={(e) => {
                           onInputChange("phoneNumber", e.target.value);
                        }}
                     />
                  </div>
               </div>

               <FieldDescription>
                  What kind a fruit would you like?
               </FieldDescription>

               <FieldGroup>
                  <Select
                     onValueChange={(e) => {
                        // dataRef.current = ({
                        //         ...dataRef.current,
                        //         selectedFruit: e
                        //     });
                        onInputChange("selectedFruit", e);
                     }}
                  >
                     <SelectTrigger className="w-full max-w-48 bg-white">
                        <SelectValue placeholder="Select a fruit" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectGroup className="bg-white">
                           <SelectLabel>Fruits</SelectLabel>
                           <SelectItem value="apple">Apple</SelectItem>
                           <SelectItem value="banana">Banana</SelectItem>
                           <SelectItem value="blueberry">Blueberry</SelectItem>
                           <SelectItem value="grapes">Grapes</SelectItem>
                           <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                     </SelectContent>
                  </Select>
                  <FieldDescription>Ripe or fresh?</FieldDescription>
                  <RadioGroup
                     defaultValue="Ripe"
                     className="w-fit"
                     onValueChange={(e) => {
                        // dataRef.current = ({
                        //     ...dataRef.current,
                        //     radioButton: e
                        // });
                        onInputChange("radioButton", e);
                     }}
                  >
                     <div className="flex gap-3">
                        <RadioGroupItem
                           className="bg-white"
                           value="Ripe"
                           id="r1"
                        />
                        <Label htmlFor="Ripe">Ripe</Label>
                        <RadioGroupItem
                           className="bg-white"
                           value="Fresh"
                           id="r2"
                        />
                        <Label htmlFor="Fresh">Fresh</Label>
                     </div>
                  </RadioGroup>
               </FieldGroup>

               <div className="space-y-2">
                  <FieldLabel>Would you like:</FieldLabel>
                  <div className="flex gap-6">
                     <div className="flex items-center gap-2">
                        <Checkbox
                           className="bg-white"
                           id="newsletter"
                           checked={newsletter}
                           onCheckedChange={(value) => setNewsletter(!!value)}
                        />
                        <Label htmlFor="newsletter">Newsletter</Label>
                     </div>

                     <div className="flex items-center gap-2">
                        <Checkbox
                           className="bg-white"
                           id="promotions"
                           checked={promotions}
                           onCheckedChange={(value) => setPromotions(!!value)}
                        />
                        <Label htmlFor="promotions">Promotions</Label>
                     </div>
                  </div>
               </div>

               <div>
                  <Button
                     className="border-black border w-1/2 bg-white hover:bg-green-200 rounded-2xl uppercase py-3 text-center"
                     type="submit"
                  >
                     Submit
                  </Button>
               </div>
            </form>
         </Card>

         <Card className="my-4">
            <CardHeader>
               <div className="flex items-center gap-2">
                  <div className="grow border h-0"></div>
                  <CardTitle>Already filled out form?</CardTitle>
                  <div className="grow border h-0"></div>
               </div>
            </CardHeader>
            <form
               onSubmit={(e) => {
                  e.preventDefault();
                  onLoad();
               }}
               className="w-full"
            >
               <FieldSet>
                  <FieldGroup>
                     <Field>
                        <Input
                           className="bg-white"
                           id="email"
                           autoComplete="off"
                           type="email"
                           ref={loadEmailRef}
                           placeholder="asdf@ntv.is"
                        />
                     </Field>
                  </FieldGroup>
               </FieldSet>
               <div className="flex flex-col py-4 gap-4">
                  <Button
                     value="load"
                     type="submit"
                     className="bg-green-500 p-4 rounded text-white uppercase"
                  />
                  <Button
                     value="create new"
                     type="submit"
                     className="bg-green-500 p-4 rounded text-white uppercase"
                  />
               </div>
            </form>
         </Card>
      </div>
   );
}

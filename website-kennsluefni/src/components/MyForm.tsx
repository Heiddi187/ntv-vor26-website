import { useRef, useState } from "react";
import { Input } from "./Input"
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Field, FieldGroup, FieldLabel, FieldDescription, FieldSet } from "./ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./Button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";

export function MyForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [myEmail, setMyEmail] = useState('');
    const [myPhoneNumber, setMyPhoneNumber] = useState('')
    const [selectedFruit, setSelectedFruit] = useState('')
    const [radioButton, setRadioButton] = useState<string | null>(null);
    const myName = `${firstName} ${lastName}`;
    const [newsletter, setNewsletter] = useState(false)
    const [promotions, setPromotions] = useState(false)

    const firstNameRef = useRef('');
    // const onSubmit = () => {
    //     window.alert(firstNameRef.current)
    // }

    return (
        <Card className="bg-gray-200 msx-w-md mx-auto mt-10 shadow-lg">
            <CardHeader>
                <CardTitle>My Form</CardTitle>
                <p>FirstNameRefValue: {firstNameRef.current}</p>
            </CardHeader>

            <form className="space-y-6 p-6" onSubmit={(e) => {
                // onSubmit
                e.preventDefault()
                window.alert(`${myName} just placed an order for ${selectedFruit}
                    \nWe'll send confirmation to ${myEmail} & ${myPhoneNumber}`)
                }}>

                <div className="space-y-2">
                    <FieldLabel htmlFor="name">
                        <div>Full name</div>
                    </FieldLabel>
                    <div className="flex gap-4">
                        <Input className="bg-white" id='firstName' autoComplete="off" placeholder="First name" value={firstName} onChange={(e) => {
                            setFirstName(e.target.value)
                        }} />
                        <Input className="bg-white" id='lastName' autoComplete="off" placeholder="Last name" value={lastName} onChange={(e) => {
                            setLastName(e.target.value)
                        }} />
                    </div>
                    
                    <div className="flex gap-4">
                        <Input className="bg-white" id='email' autoComplete="off" placeholder="Email" onChange={(e) => {
                            setMyEmail(e.target.value)
                        }} />
                        <Input className="bg-white" id='phoneNumber' autoComplete="off" placeholder="Phone number" onChange={(e) => {
                            setMyPhoneNumber(e.target.value)
                        }} />
                    </div>
                </div>

                <FieldDescription>
                    What kind a fruit would you like?
                </FieldDescription>
                
                <FieldGroup>
                    <Select onValueChange={(e) => {
                        setSelectedFruit(e)
                    }}>
                        <SelectTrigger className="w-full max-w-48 bg-white">
                            <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent >
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
                    <FieldDescription>
                        Ripe or fresh?
                    </FieldDescription>
                    <RadioGroup defaultValue="Ripe" className="w-fit" onValueChange={(e) => {
                        setRadioButton(e)
                    }}>
                        <div className="flex gap-3">
                            <RadioGroupItem className="bg-white" value="Ripe" id="r1" />
                            <Label htmlFor="Ripe">Ripe</Label>
                            <RadioGroupItem className="bg-white" value="Fresh" id="r2" />
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
    )
}

{/*
export function MyForm() {
    const [myName, setMyName] = useState("Heiddi");
    const [email, setEmail] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Form</CardTitle>
      </CardHeader>
      <CardContent>
        <Input 
            value={myName} 
            onChange={(e) => setMyName(e.target.value)} 
        />
        <Input 
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
        />
        <p>Card Content</p>
      </CardContent>
    </Card>
  );
}
*/}
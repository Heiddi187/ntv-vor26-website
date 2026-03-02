import { useState } from "react";
import { Input } from "./Input"
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Field, FieldGroup, FieldLabel, FieldDescription, FieldSet } from "./ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./Button";

export function MyForm() {
    const [myName, setMyName] = useState('Heiddi')
    const [email, setEmail] = useState("");
    const [selectedFruit, setSelectedFruit] = useState('')

    return (
        <Card className="bg-gray-100">
            <CardHeader>
                <CardTitle>My Form</CardTitle>
            </CardHeader>
            <div className="w-full max-w-md">
                <form onSubmit={(e) => {
                    e.preventDefault()
                    window.alert(`${myName} just placed an order for ${selectedFruit}`)
                }}>
                    <FieldSet>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="name">
                                    <div>Full name</div>
                                </FieldLabel>
                                <Input className="bg-white" id='name' autoComplete="off" placeholder="Sinister Rabbit" onChange={(e) => {
                                    setMyName(e.target.value)
                                }} />
                                <FieldDescription>
                                    Some text here
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                    <FieldSet>
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
                        </FieldGroup>
                    </FieldSet>
                    <Button className="bg-white hover:bg-green-200" type='submit' />
                </form>
            </div>
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
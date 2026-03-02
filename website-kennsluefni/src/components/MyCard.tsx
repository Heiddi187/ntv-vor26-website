import { useState } from "react";
import { Input } from "./Input"
import { Button } from "./Button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

export function MyCard() {
    const [myName, setMyName] = useState("Heiddi");
    const [email, setEmail] = useState("");
    const onClick = () => {
    alert(`Submitted: name ${myName} and email ${email}`);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Card Title</CardTitle>
        <CardDescription>My Card Description</CardDescription>
        <CardAction>
          <Button onClick={onClick} /> 
        </CardAction>
      </CardHeader>
      <CardContent>
        <Input value={myName} onChange={(e) => setMyName(e.target.value)} />
        <Input 
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
        />
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
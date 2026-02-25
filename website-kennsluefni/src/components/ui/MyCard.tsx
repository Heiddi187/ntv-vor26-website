import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";

export function MyCard() {
  return (
    <Card>
  <CardHeader>
    <CardTitle>My Card Title</CardTitle>
    <CardDescription>My Card Description</CardDescription>
    <CardAction>Card Action or button?</CardAction>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>
  );
}
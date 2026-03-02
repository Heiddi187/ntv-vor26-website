import "./App.css";
import { MyCard } from "./components/MyCard";
import { MyForm } from "./components/MyForm";

function App() {
  
  return (
    <>
      <h1>Hello website</h1>
      <div>my name and email</div>
      <div>
        {/* Card component */}
        <div>Card</div>
        <MyCard />
        <MyCard></MyCard>
        <MyForm />
      </div>
      <p className="footer-note">Not copywrited by me</p>{" "}
      {/* til að setja neðst á síðuna. gera classname og bæta við í css skrá. og svo setja className í p tagið*/}
    </>
  );
}

export default App;

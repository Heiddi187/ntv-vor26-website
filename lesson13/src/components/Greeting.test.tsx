import { Greeting } from "./Greeting";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

function setup() {
   const user = userEvent.setup();
   render(<Greeting />);
   return { user };
}

describe("Greeting tests", () => {
   it("should not show message initially", async () => {
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
   });

   it('should match what you write in input', async () => {
    const {user} = setup();
    const input = screen.getByLabelText('Nafn');
    await user.type(input, 'Bobby')
    expect(input).toHaveValue('Bobby')
   });

   it('should send greeting with the name provided', async () => {
    const {user} = setup();
    await user.type(screen.getByLabelText('Nafn'), 'Bobby');
    await user.click(screen.getByRole('button', {name: 'Senda'}));
    expect(screen.getByRole('status')).toHaveTextContent('Halló, Bobby')
    expect(screen.getByRole('status')).not.toHaveTextContent('Halló, Jimmy')
   })

   it('should not send message if input is empty', async () => {
    const {user} = setup();
    await user.click(screen.getByRole('button', {name: 'Senda'}));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
   })
});

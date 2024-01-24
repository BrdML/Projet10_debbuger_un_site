import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    render(<Home />);
    expect(screen.getByTestId("eventscard-testid")).toBeInTheDocument();
    waitFor(() => {
      const eventCard = screen.queryAllByTestId("card-testid");
      expect(eventCard.length).toBeGreaterThan(0);
      const eventImg = document.querySelector('.EventCard__imageContainer img');
      expect(eventImg).toBeLoaded();
      expect(eventImg).toHaveAttribute('alt');
      expect(eventImg.getAttribute('alt')).toBe('image');
      expect(eventImg).toHaveSrc('images/charlesdeluvio-wn7dOzUh3Rs-unsplash.png');
      expect(screen.getByText("conférence")).toBeInTheDocument();
      expect(screen.getByText("JANVIER")).toBeInTheDocument();
      expect(screen.getByText("#ProductCon")).toBeInTheDocument();
    })
  })

  it("a list a people is displayed", () => {
    render(<Home />);
    waitFor(() => {
      expect(screen.getByTestId("peoplecard-testid")).toBeInTheDocument();
    })
    expect(screen.getByText("Samira")).toBeInTheDocument();
    expect(screen.getByText('Luís')).toBeInTheDocument();
  })

  it("a footer is displayed", () => {
    render(<Home />);
    expect(screen.getByTestId("footer-testid")).toBeInTheDocument();
    
    expect(screen.getByText("45 avenue de la République, 75000 Paris")).toBeInTheDocument();

    const logo = document.querySelector(".Logo");
    const svgs = logo.querySelectorAll("svg")
    waitFor(() => {
      expect(svgs).toBeInTheDocument();
    })
  })

  it("an event card, with the last event, is displayed", () => {
    render(<Home />);
    waitFor(() => {
      expect(screen.getByTestId("lastEvent")).toBeInTheDocument()
      
      const lastImg = document.querySelector('.EventCard__imageContainer img');
      expect(lastImg).toBeLoaded();
      expect(lastImg).toHaveAttribute('alt');
      expect(lastImg.getAttribute('alt')).toBe('image');
      expect(lastImg).toHaveSrc('/images/charlesdeluvio-wn7dOzUh3Rs-unsplash.png');
      
      
      expect(screen.getByText("expérience digitale")).toBeInTheDocument();
      expect(screen.getByText("janvier")).toBeInTheDocument();
      expect(screen.getByText("#DigitonPARIS")).toBeInTheDocument();
    })
  })
});

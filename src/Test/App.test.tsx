import { screen } from "@testing-library/react";
import '@testing-library/jest-dom/vitest';
import {expect, it, describe, beforeEach, vi} from "vitest";
import { renderWithMantine } from './render';
import SpaceXList from "../Components/SpaceXList/SpaceXList.tsx";
import ky from "ky";
import {userEvent} from "@testing-library/user-event";


Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
vi.mock('ky');

const mock = {
  launches: [
    {
      flight_number: 1,
      links: {
        mission_patch_small: "small.jpg",
        mission_patch: "large.jpg",
      },

      mission_name: "FalconSat",
      rocket: {
        rocket_name: "Falcon 1",
      },
      details: "Engine failure at 33 seconds and loss of vehicle",
    },

    {
      flight_number: 2,
      links: {
        mission_patch_small: "small.jpg",
        mission_patch: "large.jpg",
      },
      mission_name: "DemoSat",
      rocket: {
        rocket_name: "Falcon 1",
      },
      details: "Successful first stage burn",
    },
  ],
};



describe("Testing SpaceXList component", () => {

  beforeEach(() => {
    (ky.get as any).mockReturnValue({
      json: () => Promise.resolve(mock),
    });

    renderWithMantine(<SpaceXList />);
  });

  it("Render logo", () => {
    expect(screen.getByText(/SpaceX Launches 2020/i)).toBeInTheDocument();
  });

  it("Render Cards", async () => {
    const card1 = await screen.findByText('FalconSat')
    const card2 = await screen.findByText('DemoSat')

    expect(card1).toBeInTheDocument();
    expect(card2).toBeInTheDocument();
  })

  it("Render Buttons", async () => {
    const buttons = await screen.findAllByText("See more");

    expect(buttons).toHaveLength(2);
  });

  it("Open Modal", async () => {

    const modalRoot = document.createElement("div");
    modalRoot.id = "modal";
    document.body.appendChild(modalRoot);

    const buttons = await screen.findAllByText("See more");

    await userEvent.click(buttons[0]);
    const modal = await screen.findByText("Engine failure at 33 seconds and loss of vehicle");

    expect(modal).toBeInTheDocument()
  });

})

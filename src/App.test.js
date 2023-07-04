import React from 'react';
import App from './App';
import {render, cleanup, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


const renderApp = () => render(<App/>);

afterEach(() => {
    cleanup()
});

const TEST_IDS = {
    inputGuestName: "input-guest-name",
    inputCheckInDate: "input-checkin-date",
    inputCheckOutDate: "input-checkout-date",
    addButton: "add-button",
    guestList: "guest-list"
}

let inputGuestName, inputCheckInDate, inputCheckOutDate, addButton, guestList;

beforeEach(() => {
    let {getByTestId, queryByTestId} = renderApp();
    inputGuestName = getByTestId(TEST_IDS.inputGuestName);
    inputCheckInDate = getByTestId(TEST_IDS.inputCheckInDate);
    inputCheckOutDate = getByTestId(TEST_IDS.inputCheckOutDate);
    addButton = getByTestId(TEST_IDS.addButton);
    guestList = queryByTestId(TEST_IDS.guestList);
})

it("should have correct input types", () => {
    expect(inputGuestName).toHaveAttribute("type", "text");
    expect(inputCheckInDate).toHaveAttribute("type", "date");
    expect(inputCheckOutDate).toHaveAttribute("type", "date");
});

it("Initially the guestlist should be empty", () => {
    expect(guestList.children).toHaveLength(0);
})

it("clicking the add button should display an alert if any of the input fields is empty", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation();
    fireEvent.change(inputCheckOutDate, {target: {value: ""}});
    fireEvent.click(addButton);
    expect(alertMock).toHaveBeenCalledWith(
        "Please enter all the fields"
    );
});

it("should empty the input field on clicking the add button", () => {
    fireEvent.click(addButton);
    expect(inputGuestName).toHaveValue("");
    expect(inputCheckInDate).toHaveValue("");
    expect(inputCheckOutDate).toHaveValue("");
})

it("clicking the add button should add list of all the dates from checkIn to checkOut for that customer", () => {
    fireEvent.change(inputGuestName, {target: {value: "John"}});
    fireEvent.change(inputCheckInDate, {target: {value: "2022-11-02"}});
    fireEvent.change(inputCheckOutDate, {target: {value: "2022-11-05"}});
    fireEvent.click(addButton);
    for(let i = 0; i < 4; i++) {
        expect(guestList.children[i].children[1].children[0]).toHaveTextContent("John");
    }
    expect(guestList.children[0].children[0]).toHaveTextContent("2022-11-02");
    expect(guestList.children[1].children[0]).toHaveTextContent("2022-11-03");
    expect(guestList.children[2].children[0]).toHaveTextContent("2022-11-04");
    expect(guestList.children[3].children[0]).toHaveTextContent("2022-11-05");
});

it("clicking the add button should display data in sorted order of dates", () => {
    fireEvent.change(inputGuestName, {target: {value: "John"}});
    fireEvent.change(inputCheckInDate, {target: {value: "2022-11-06"}});
    fireEvent.change(inputCheckOutDate, {target: {value: "2022-11-08"}});
    fireEvent.click(addButton);

    fireEvent.change(inputGuestName, {target: {value: "Erica"}});
    fireEvent.change(inputCheckInDate, {target: {value: "2022-11-01"}});
    fireEvent.change(inputCheckOutDate, {target: {value: "2022-11-02"}});
    fireEvent.click(addButton);

    expect(guestList.children[0].children[1].children[0]).toHaveTextContent("Erica");
    expect(guestList.children[1].children[1].children[0]).toHaveTextContent("Erica");
    expect(guestList.children[2].children[1].children[0]).toHaveTextContent("John");
    expect(guestList.children[3].children[1].children[0]).toHaveTextContent("John");
    expect(guestList.children[4].children[1].children[0]).toHaveTextContent("John");

    expect(guestList.children[0].children[0]).toHaveTextContent("2022-11-01");
    expect(guestList.children[1].children[0]).toHaveTextContent("2022-11-02");
    expect(guestList.children[2].children[0]).toHaveTextContent("2022-11-06");
    expect(guestList.children[3].children[0]).toHaveTextContent("2022-11-07");
    expect(guestList.children[4].children[0]).toHaveTextContent("2022-11-08");
})

it("clicking the add button should add new customers to already existing dates", () => {
    fireEvent.change(inputGuestName, {target: {value: "John"}});
    fireEvent.change(inputCheckInDate, {target: {value: "2022-11-06"}});
    fireEvent.change(inputCheckOutDate, {target: {value: "2022-11-08"}});
    fireEvent.click(addButton);

    fireEvent.change(inputGuestName, {target: {value: "Erica"}});
    fireEvent.change(inputCheckInDate, {target: {value: "2022-11-06"}});
    fireEvent.change(inputCheckOutDate, {target: {value: "2022-11-07"}});
    fireEvent.click(addButton);

    expect(guestList.children[0].children[1].children[0]).toHaveTextContent("John");
    expect(guestList.children[0].children[1].children[1]).toHaveTextContent("Erica");
    expect(guestList.children[1].children[1].children[0]).toHaveTextContent("John");
    expect(guestList.children[1].children[1].children[1]).toHaveTextContent("Erica");
    expect(guestList.children[2].children[1].children[0]).toHaveTextContent("John");

    expect(guestList.children[0].children[0]).toHaveTextContent("2022-11-06");
    expect(guestList.children[1].children[0]).toHaveTextContent("2022-11-07");
    expect(guestList.children[2].children[0]).toHaveTextContent("2022-11-08");

});

it("clicking the add button should add new customers to already existing dates and new dates", () => {
    fireEvent.change(inputGuestName, {target: {value: "John"}});
    fireEvent.change(inputCheckInDate, {target: {value: "2022-11-06"}});
    fireEvent.change(inputCheckOutDate, {target: {value: "2022-11-08"}});
    fireEvent.click(addButton);

    fireEvent.change(inputGuestName, {target: {value: "Erica"}});
    fireEvent.change(inputCheckInDate, {target: {value: "2022-11-04"}});
    fireEvent.change(inputCheckOutDate, {target: {value: "2022-11-07"}});
    fireEvent.click(addButton);

    expect(guestList.children[0].children[1].children[0]).toHaveTextContent("Erica");
    expect(guestList.children[1].children[1].children[0]).toHaveTextContent("Erica");
    expect(guestList.children[2].children[1].children[0]).toHaveTextContent("John");
    expect(guestList.children[3].children[1].children[0]).toHaveTextContent("John");
    expect(guestList.children[2].children[1].children[1]).toHaveTextContent("Erica");
    expect(guestList.children[3].children[1].children[1]).toHaveTextContent("Erica");
    expect(guestList.children[4].children[1].children[0]).toHaveTextContent("John");

    expect(guestList.children[0].children[0]).toHaveTextContent("2022-11-04");
    expect(guestList.children[1].children[0]).toHaveTextContent("2022-11-05");
    expect(guestList.children[2].children[0]).toHaveTextContent("2022-11-06");
    expect(guestList.children[3].children[0]).toHaveTextContent("2022-11-07");
    expect(guestList.children[4].children[0]).toHaveTextContent("2022-11-08");
});




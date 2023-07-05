import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MealSchedule from "./MealSchedule";

function GuestForm() {
  const [guestName, setGuestName] = useState("");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [items, setItems] = useState({});
  const scheduleObject = {};

  const generateDateRange = () => {
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);

    const currentDate = new Date(startDate);
    console.log("Generating date range.");
    while (currentDate <= endDate) {
      const dateKey = currentDate.toISOString().split("T")[0];
      if (!!scheduleObject[dateKey]) {
        scheduleObject[dateKey] = scheduleObject[dateKey] + "\n" + guestName;
      } else {
        scheduleObject[dateKey] = guestName;
      }
      // datesArray.push({
      //   date: currentDate.toISOString().split("T")[0],
      //   guestName: guestName,
      // });
      // currentDate.setDate(currentDate.getDate() + 1);
    }
    return scheduleObject;
    //    console.log(scheduleObject);
    // return datesArray;
  };

  const handleGuestNameChange = (event) => {
    setGuestName(event.target.value);
  };

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
  };

  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
  };

  const handleAddToMenu = () => {
    console.log("we are here");
    // Perform any desired action with the input values
    // console.log("Guest Name:", guestName);
    // console.log("Check-in Date:", checkInDate);
    // console.log("Check-out Date:", checkOutDate);
    setItems(generateDateRange());
    console.log(items);
    // Reset input values
    setGuestName("");
    setCheckInDate(null);
    setCheckOutDate(null);
  };

  return (
    <>
      <div className="layout-column align-items-center justify-content-start">
        <section className="layout-row align-items-center justify-content-center mt-30">
          <input
            data-testid="input-guest-name"
            value={guestName}
            onChange={handleGuestNameChange}
            className="large mx-8"
            placeholder="Guest Name"
          />
          <div className="datepicker-container">
            <DatePicker
              data-testid="input-checkin-date"
              selected={checkInDate}
              onChange={handleCheckInDateChange}
              className="large mx-8"
              placeholderText="Check-in Date"
            />
          </div>
          <div className="datepicker-container">
            <DatePicker
              data-testid="input-checkout-date"
              selected={checkOutDate}
              onChange={handleCheckOutDateChange}
              className="large mx-8"
              placeholderText="Check-out Date"
            />
          </div>
          <button data-testid="add-button" onClick={handleAddToMenu}>
            Add to Menu
          </button>
        </section>
        <MealSchedule items={items} />
      </div>
    </>
  );
}

export default GuestForm;

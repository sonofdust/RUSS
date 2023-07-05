import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MealSchedule from "./MealSchedule";
import Modal from "react-modal";

function GuestForm() {
  const [guestName, setGuestName] = useState("");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [items, setItems] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const generateDateRange = () => {
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);

    const currentDate = new Date(startDate);
    const temp = items;
    while (currentDate <= endDate) {
      const dateKey = currentDate.toISOString().split("T")[0];
      if (temp[dateKey]) {
        temp[dateKey] += "\n" + guestName;
      } else {
        temp[dateKey] = guestName;
      }
      setItems(temp);

      currentDate.setDate(currentDate.getDate() + 1);
    }
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // const handleGuestNameChange = (event) => {
  //   setGuestName(event.target.value);
  // };

  // const handleCheckInDateChange = (date) => {
  //   setCheckInDate(date);
  // };

  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
  };

  const handleAddToMenu = () => {
    if (!!guestName && !!checkInDate && !!checkOutDate) {
      generateDateRange();
    } else {
      setIsOpen(true);
    }

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
            onChange={(event) => {
              setGuestName(event.target.value);
            }}
            className="large mx-8"
            placeholder="Guest Name"
          />
          <div className="datepicker-container">
            <DatePicker
              data-testid="input-checkin-date"
              selected={checkInDate}
              onChange={(date) => {
                setCheckInDate(date);
              }}
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
        <div>
          <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(!isOpen)}
            contentLabel="My dialog"
          >
            <table>
              <tr>
                <td>
                  <p>Please enter all the fields.</p>
                </td>
                <td>
                  <button onClick={toggleModal}>Ok</button>
                </td>
              </tr>
            </table>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default GuestForm;

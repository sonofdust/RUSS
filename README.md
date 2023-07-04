# React: Meal Scheduler

## Environment 

- React Version: 16.13.1
- Node Version: 14(LTS)
- Default Port: 8000

## Application Demo:

![](https://hrcdn.net/s3_pub/istreet-assets/fBpPQubsA5MyTo3-5dmsLQ/Screen-Recording-2022-11-11-at-1.gif)

Create a Meal Scheduler for a Hotel that generates the meal schedules for their guests.

## Functionality Requirements

The component must have the following functionalities:

- For the GuestForm component:
  - First is a text input to add guest name.
  - Second is a date input to add guest's check-in date.
  - Third is a date input to add guest's check-out date.
  - Clicking on 'Add to Menu' button should:
    - add the guest to the meal schedule along with all the dates.
    - reset all input fields.
    - display an alert saying "Please enter all the fields" if any of the input fields is input.
    
- For the MealSchedule component:
  - The final meal schedule of the guests should be displayed in table along with all the dates between check-in and check-out dates.
  - For each booked date, the schedule is rendered as a separate row. The table rows should be sorted by date.
  - First column renders the respective date.
  - Second column renders the list of guests staying on that date who will have meals in the order they were added where each guest name is rendered as a       `<p>`.
  
Note:
1. The dates entered in the table are in YYYY-MM-DD format.
2. Avoid using Global variables as they may cause tests to fail.

## Project Specifications

**Read Only Files**

    - src/App.test.js
    - src/App.js
    - src/App.css
    - src/index.css
    - src/index.js
    - src/registerServiceWorker.js


**Commands**
- run: 
```bash
npm start
```
- install: 
```bash
npm install
```
- test: 
```bash
npm test
```

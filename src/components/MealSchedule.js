import React from "react";

function MealSchedule(props) {
  const {items} = props;

  return (
    <div className="card w-40 pt-30 pb-8 mt-20">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Customer Name for Meals</th>
          </tr>
        </thead>
        <tbody data-testid="guest-list">
          {Object.keys(items).map((key) => (
            <tr key={key}>
              <td>{key}</td>
              <td>
                <p>
                  {items[key].split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      {index !== items[key].split("\n").length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MealSchedule;

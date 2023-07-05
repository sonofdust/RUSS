import React, {useEffect, useState} from "react";

function MealSchedule(props) {
  const {items} = props;
  //const [dataObject, setDataObject] = useState({});

  useEffect(() => {
    // You can perform any additional actions with the updated dataObject if needed
    // For example, call a function or update state in the parent component using setData
    // if (setItem) {
    //   setItem(newDataObject);
    // }
    console.log("MY ITEMS: ", items);
  }, [items]);

  return (
    <div className="card w-40 pt-30 pb-8 mt-20">
      <table>
        <thead>
          {}
          <tr>
            <th>Date</th>
            <th>Customer Name for Meals</th>
          </tr>
        </thead>
        <tbody data-testid="guest-list">
          {Object.keys(items).map((key) => (
            <tr>
              <td>{key}</td>
              <td>
                <p>{items[key]}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MealSchedule;

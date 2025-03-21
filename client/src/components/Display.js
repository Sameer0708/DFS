import { useState } from "react";
import "./Display.css";

const Display = ({ contract, account }) => {
  const [data, setData] = useState("");

  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;

    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (e) {
      alert("You don't have access");
    }

    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");

      const buttons = str_array.map((item, i) => {
        return (
          <button
            key={i}
            className="image-button"
            onClick={() => window.open(`${item.substring(6)}`, "_blank")}
          >
            Asset {i + 1} {/* Display "Image 1", "Image 2", etc. */}
          </button>
        );
      });

      setData(buttons);
    } else {
      alert("No image to display");
    }
  };

  return (
    <>
      <div className="button-list">{data}</div>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <button className="center button" onClick={getdata}>
        Get Data
      </button>
    </>
  );
};

export default Display;
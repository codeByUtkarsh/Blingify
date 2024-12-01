import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function PincodeChecker() {
  const [pincode, setPincode] = useState("");
  const [deliveryMessage, setDeliveryMessage] = useState("");
  const [isPincodeValid, setIsPincodeValid] = useState(false);

  const handlePincodeChange = (e) => setPincode(e.target.value);

  const handleCheckPincode = () => {
    const pinRegex = /^[1-9][0-9]{5}$/;
    if (pinRegex.test(pincode)) {
      setIsPincodeValid(true);
      setDeliveryMessage("Delivered within 4-5 days");
    } else {
      setIsPincodeValid(false);
      setDeliveryMessage("Invalid pincode. Please enter a valid 6-digit Indian pincode.");
    }
  };

  return (
    <>
      <div className="mt-6 flex">
        <input
          type="text"
          value={pincode}
          onChange={handlePincodeChange}
          placeholder="Enter Pincode"
          className="mt-2 p-2 border border-border rounded-md w-40"
        />
        <button onClick={handleCheckPincode} className="ml-4 bg-primary text-white rounded-md px-4 py-2 my-1">
          Check
        </button>
      </div>
      <div className="mt-2">
        {isPincodeValid ? (
          <div className="flex items-center text-green-600">
            <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
            <span>{deliveryMessage}</span>
          </div>
        ) : (
          <p className="text-red-600">{deliveryMessage}</p>
        )}
      </div>
    </>
  );
}

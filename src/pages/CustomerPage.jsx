import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { database } from "../firebaseConfig";
import { ref, onValue, set, push } from "firebase/database";
import Papa from "papaparse"; // CSV Export Library

const CustomerPage = () => {
  const { customerName } = useParams();
  const [records, setRecords] = useState([]);
  const [addedToTotal, setAddedToTotal] = useState({});
  const [totalBalance, setTotalBalance] = useState(0);
  const [manualAmount, setManualAmount] = useState("");
  const [manualDate, setManualDate] = useState("");
  const [manualPaidVia, setManualPaidVia] = useState("cash"); // Payment method: cash or online
  const [subtractions, setSubtractions] = useState([]);

  // New state variables for customer details
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [additionalNote, setAdditionalNote] = useState("");

  useEffect(() => {
    const formattedName = customerName.replace(/\s+/g, "_");
    const customerRef = ref(database, `customers/${formattedName}`);
    const balanceRef = ref(database, `balances/${formattedName}`);
    const subtractionRef = ref(database, `subtractions/${formattedName}`);
    const detailsRef = ref(database, `customerDetails/${formattedName}`);

    // Fetch customer records
    onValue(customerRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const recordArray = Object.keys(data)
          .map((date) => ({ date, ...data[date] }))
          .sort((a, b) => new Date(a.date) - new Date(b.date));
        setRecords(recordArray);
      } else {
        setRecords([]);
      }
    });

    // Fetch current total balance
    onValue(balanceRef, (snapshot) => {
      const balance = snapshot.val();
      if (balance !== null) {
        setTotalBalance(balance);
      }
    });

    // Fetch subtraction records
    onValue(subtractionRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSubtractions(Object.values(data));
      } else {
        setSubtractions([]);
      }
    });

    // Fetch customer details
    onValue(detailsRef, (snapshot) => {
      const details = snapshot.val();
      if (details) {
        setPhoneNumber(details.phone || "");
        setAddress(details.address || "");
        setAdditionalNote(details.note || "");
      }
    });
  }, [customerName]);

  const toggleAddToTotal = (index, amount) => {
    setAddedToTotal((prev) => {
      const newState = { ...prev, [index]: !prev[index] };
      return newState;
    });

    setTotalBalance((prevTotal) => {
      const newTotal = addedToTotal[index] ? prevTotal - amount : prevTotal + amount;
      set(ref(database, `balances/${customerName.replace(/\s+/g, "_")}`), newTotal);
      return newTotal;
    });
  };

  const handleManualSubtract = () => {
    if (!manualAmount || isNaN(manualAmount) || !manualDate) return;
    const formattedName = customerName.replace(/\s+/g, "_");
    const amountToSubtract = parseFloat(manualAmount);
    const newTotal = totalBalance - amountToSubtract; // Subtract the entered amount

    // Update the balance in Firebase
    set(ref(database, `balances/${formattedName}`), newTotal);
    // Push the subtraction record (with date, amount, and paidVia) to Firebase
    push(ref(database, `subtractions/${formattedName}`), {
      date: manualDate,
      amount: amountToSubtract,
      paidVia: manualPaidVia,
    });
    setTotalBalance(newTotal);
    setManualAmount("");
    setManualDate("");
  };

  const handleSaveCustomerDetails = () => {
    const formattedName = customerName.replace(/\s+/g, "_");
    const details = {
      phone: phoneNumber,
      address: address,
      note: additionalNote,
    };
    set(ref(database, `customerDetails/${formattedName}`), details);
  };

  const exportToCSV = () => {
    const csvData = records.map((record) => ({
      Date: record.date,
      "Vehicle No": record.vehicleNo || "-",
      "Company Weight": record.companyWeight || "-",
      "Delivery Weight": record.deliveryWeight || "-",
      Rate: record.rate || "-",
      "Shipping Charges": record.shippingCharges || "-",
      "Paid By": record.paidBy || "-",
      Total: record.total || "-",
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${customerName}_transactions.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-14 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4 font-serif pt-6 text-center text-gray-800">
        {decodeURIComponent(customerName)}'s Records
      </h1>

      {/* Customer Details Form Section */}
      <div className="mb-8 p-4 bg-white rounded shadow-md">
        
        {/* Display saved details above the records table */}
        {(phoneNumber || address) && (
          <div className="mt-4 text-left text-gray-700">
            <h2 className="text-xl font-bold">Customer Info:</h2>
            <p><span className="font-semibold">Phone:</span> {phoneNumber}</p>
            <p><span className="font-semibold">Address:</span> {address}</p>
            <p><span className="font-semibold">Note:</span> {additionalNote}</p>
          </div>
        )}
      </div>

      {/* Records Table */}
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Vehicle No</th>
              <th className="border px-4 py-2">Company Weight</th>
              <th className="border px-4 py-2">Delivery Weight</th>
              <th className="border px-4 py-2">Rate</th>
              <th className="border px-4 py-2">Shipping Charges</th>
              <th className="border px-4 py-2">Paid By</th>
              <th className="border px-4 py-2">Total</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {records.length > 0 ? (
              records.map((record, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{record.date}</td>
                  <td className="border px-4 py-2">{record.vehicleNo || "-"}</td>
                  <td className="border px-4 py-2">{record.companyWeight || "-"}</td>
                  <td className="border px-4 py-2">{record.deliveryWeight || "-"}</td>
                  <td className="border px-4 py-2">{record.rate || "-"}</td>
                  <td className="border px-4 py-2">{record.shippingCharges || "-"}</td>
                  <td className="border px-4 py-2">{record.paidBy || "-"}</td>
                  <td className="border px-4 py-2">{record.total || "-"}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() =>
                        toggleAddToTotal(
                          index,
                          parseFloat(record.total) || 0
                        )
                      }
                      className={`px-3 py-1 rounded text-white ${
                        addedToTotal[index] ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {addedToTotal[index] ? "Added" : "Add to Total"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="border px-4 py-2 text-center">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Total Balance & Manual Subtraction Section */}
      <div className="w-full bg-gradient-to-br from-gray-200 to-gray-500 h-auto p-4 text-center font-bold text-lg mt-4">
        <h1 className="text-3xl">Total Balance: {totalBalance}</h1>
        <div className="mt-4 flex space-x-2 items-center space-y-2">
          <input
            type="number"
            value={manualAmount}
            onChange={(e) => setManualAmount(e.target.value)}
            placeholder="Enter amount"
            className="p-2 border rounded"
          />
          <input
            type="date"
            value={manualDate}
            onChange={(e) => setManualDate(e.target.value)}
            className="p-2 border rounded"
          />
          <select
            value={manualPaidVia}
            onChange={(e) => setManualPaidVia(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="cash">Cash</option>
            <option value="online">Online</option>
          </select>
          <button
            onClick={handleManualSubtract}
            className="p-2 bg-red-500 text-white rounded"
          >
            Subtract Balance
          </button>
        </div>
        <h2 className="text-xl font-bold mt-4">Subtracted Amounts</h2>
        <div className="overflow-x-auto mt-2">
          <table className="table-auto border-collapse border border-gray-300 w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Amount Subtracted</th>
                <th className="border px-4 py-2">Paid Via</th>
              </tr>
            </thead>
            <tbody>
              {subtractions.length > 0 ? (
                subtractions.map((sub, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{sub.date}</td>
                    <td className="border px-4 py-2">{sub.amount}</td>
                    <td className="border px-4 py-2">{sub.paidVia}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="border px-4 py-2 text-center">
                    No subtractions recorded
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <button
        onClick={exportToCSV}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Download CSV
      </button>
      <div className="customerdetailform pt-5">

      <h2 className="text-2xl font-bold mb-4">Customer Details</h2>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
            className="p-2 border rounded"
          />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
            className="p-2 border rounded"
          />
          <textarea
            value={additionalNote}
            onChange={(e) => setAdditionalNote(e.target.value)}
            placeholder="Enter additional note"
            className="p-2 border rounded h-24"
          />
        </div>
        <button
          onClick={handleSaveCustomerDetails}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Customer Details
        </button>
        </div>

      <Link to="/" className="block mt-4 text-blue-500 underline">
        Back to Home
      </Link>
    </div>
  );
};

export default CustomerPage;

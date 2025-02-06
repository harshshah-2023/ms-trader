import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { database } from "../firebaseConfig";
import { ref, onValue, update } from "firebase/database";
import Papa from "papaparse"; // CSV Export Library

const CustomerPage = () => {
  const { customerName } = useParams();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const formattedName = customerName.replace(/\s+/g, "_");
    const customerRef = ref(database, `customers/${formattedName}`);

    onValue(customerRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const recordArray = Object.keys(data)
          .map((date) => ({ date, ...data[date] }))
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        let runningBalance = 0;
        const updatedRecords = recordArray.map((record) => {
          const total = record.total || 0;
          const paidAmount = record.paidAmount || 0;
          const balance = total - paidAmount;

          runningBalance += balance;
          return { ...record, runningBalance };
        });

        setRecords(updatedRecords);
        updatedRecords.forEach((record) => {
          update(ref(database, `customers/${formattedName}/${record.date}`), {
            runningBalance: record.runningBalance,
          });
        });
      } else {
        setRecords([]);
      }
    });
  }, [customerName]);

  const handlePaidAmountChange = (index, newPaidAmount) => {
    const formattedName = customerName.replace(/\s+/g, "_");
    const updatedRecords = [...records];

    updatedRecords[index].paidAmount = parseFloat(newPaidAmount) || 0;
    let runningBalance = 0;

    updatedRecords.forEach((record, i) => {
      const total = record.total || 0;
      const balance = total - (record.paidAmount || 0);
      runningBalance += balance;
      record.runningBalance = runningBalance;

      // Update only changed record in Firebase
      if (i >= index) {
        update(ref(database, `customers/${formattedName}/${record.date}`), {
          paidAmount: record.paidAmount,
          runningBalance: record.runningBalance,
        });
      }
    });

    setRecords(updatedRecords);
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
      "Paid Amount": record.paidAmount || "0",
      "Running Balance": record.runningBalance || "0",
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{decodeURIComponent(customerName)}'s Records</h1>

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
              <th className="border px-4 py-2">Paid Amount</th>
              <th className="border px-4 py-2">Running Balance</th>
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
                    <input
                      type="number"
                      value={record.paidAmount || ""}
                      onChange={(e) => handlePaidAmountChange(index, e.target.value)}
                      className="w-24 px-2 py-1 border rounded"
                    />
                  </td>
                  <td className="border px-4 py-2 font-bold">{record.runningBalance || "0"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="border px-4 py-2 text-center">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button
        onClick={exportToCSV}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Download CSV
      </button>

      <Link to="/" className="block mt-4 text-blue-500 underline">
        Back to Home
      </Link>
    </div>
  );
};

export default CustomerPage;

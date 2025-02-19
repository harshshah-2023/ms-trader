import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../firebaseConfig";
import { ref, set, onValue } from "firebase/database";

const DynamicTable = () => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const customersRef = ref(database, "customers");
    onValue(customersRef, (snapshot) => {
      if (snapshot.exists()) {
        const fetchedData = snapshot.val();
        let newRows = [];

        Object.keys(fetchedData).forEach((customer) => {
          const customerData = fetchedData[customer];
          Object.keys(customerData).forEach((date) => {
            newRows.push({ ...customerData[date], date, customerName: customer.replace(/_/g, " ") });
          });
        });

        console.log("Processed Data:", newRows);
        setRows(newRows);
      }
    });
  }, []);

  const handleInputChange = (e, rowIndex, field) => {
    const { value } = e.target;
    const updatedRows = [...rows];
    updatedRows[rowIndex][field] = field === "vehicleNo" ? value.toUpperCase() : value;

    if (["deliveryWeight", "rate", "shippingCharge1", "shippingCharge2", "paidBy"].includes(field)) {
      const weight = parseFloat(updatedRows[rowIndex].deliveryWeight) || 0;
      const rate = parseFloat(updatedRows[rowIndex].rate) || 0;
      const charge1 = parseFloat(updatedRows[rowIndex].shippingCharge1) || 0;
      const charge2 = parseFloat(updatedRows[rowIndex].shippingCharge2) || 0;
      const totalShippingCharge = charge1 + charge2;

      updatedRows[rowIndex].totalShippingCharge = totalShippingCharge;
      updatedRows[rowIndex].total = updatedRows[rowIndex].paidBy === "Customer" ? weight * rate - totalShippingCharge : weight * rate;
    }
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    setRows([...rows, {
      date: new Date().toISOString().slice(0, 10),
      customerName: "",
      vehicleNo: "",
      companyWeight: "",
      deliveryWeight: "",
      rate: "",
      shippingCharge1: "",
      shippingCharge2: "",
      totalShippingCharge: "",
      paidBy: "Customer",
      total: ""
    }]);
  };

  const handleSaveToFirebase = () => {
    rows.forEach(row => {
      if (!row.customerName) return;
      const formattedName = row.customerName.replace(/\s+/g, "_");
      const customerRef = ref(database, `customers/${formattedName}/${row.date}`);
      set(customerRef, row)
        .then(() => console.log(`Saved for ${row.customerName} on ${row.date}`))
        .catch(error => console.error("Error saving data:", error.message));
    });
    alert("Data saved successfully!");
  };

  return (
    <div className="p-4 pt-14">
      <h1 className="text-xl font-bold mb-4">Customer Table</h1>
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr className="bg-gradient-to-br from-gray-200 to-gray-400">
            <th className="border px-2 py-2">#</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Customer</th>
            <th className="border px-4 py-2">Vehicle No</th>
            <th className="border px-4 py-2">Company Weight (kg)</th>
            <th className="border px-4 py-2">Delivery Weight (kg)</th>
            <th className="border px-4 py-2">Rate (/kg)</th>
            <th className="border px-4 py-2">Shipping Charge 1</th>
            <th className="border px-4 py-2">Shipping Charge 2</th>
            <th className="border px-4 py-2">Total Shipping Charge</th>
            <th className="border px-4 py-2">Paid By</th>
            <th className="border px-4 py-2">Total (/-)</th>
            <th className="border px-4 py-2">View More</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">
                <input type="date" className="w-full" value={row.date} onChange={(e) => handleInputChange(e, index, "date")} />
              </td>
              <td className="border px-4 py-2">
                <input type="text" className="w-full" value={row.customerName} onChange={(e) => handleInputChange(e, index, "customerName")} />
              </td>
              <td className="border px-4 py-2">
                <input type="text" className="w-full" value={row.vehicleNo} onChange={(e) => handleInputChange(e, index, "vehicleNo")} />
              </td>
              <td className="border px-4 py-2">
                <input type="text" className="w-full" value={row.companyWeight} onChange={(e) => handleInputChange(e, index, "companyWeight")} />
              </td>
              <td className="border px-4 py-2">
                <input type="text" className="w-full" value={row.deliveryWeight} onChange={(e) => handleInputChange(e, index, "deliveryWeight")} />
              </td>
              <td className="border px-4 py-2">
                <input type="text" className="w-full" value={row.rate} onChange={(e) => handleInputChange(e, index, "rate")} />
              </td>
              <td className="border px-4 py-2">
                <input type="text" className="w-full" value={row.shippingCharge1} onChange={(e) => handleInputChange(e, index, "shippingCharge1")} />
              </td>
              <td className="border px-4 py-2">
                <input type="text" className="w-full" value={row.shippingCharge2} onChange={(e) => handleInputChange(e, index, "shippingCharge2")} />
              </td>
              <td className="border px-4 py-2">{row.totalShippingCharge}</td>
              <td className="border px-4 py-2">
                <select className="w-full" value={row.paidBy} onChange={(e) => handleInputChange(e, index, "paidBy")}>
                  <option value="Customer">Customer</option>
                  <option value="Ms Traders">Ms Traders</option>
                </select>
              </td>
              <td className="border px-4 py-2">{row.total}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => navigate(`/customer/${row.customerName.replace(/\s+/g, "_")}`)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  View More
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddRow} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Add Row</button>
      <button onClick={handleSaveToFirebase} className="mt-4 ml-4 bg-green-500 text-white px-4 py-2 rounded">Save</button>
    </div>
  );
};

export default DynamicTable;
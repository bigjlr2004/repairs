import { useEffect, useState } from "react";
import { GetNonStaff } from "../../services/userService.jsx";
import "./Customer.css";
import { User } from "../Users/User.jsx";
import { Link } from "react-router-dom";

export const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    GetNonStaff().then((customerArray) => {
      setCustomers(customerArray);
    });
  }, []);
  return (
    <div className="customers">
      {customers.map((customerObj) => {
        return (
          <Link key={customerObj.id} to={`/customers/${customerObj.id}`}>
            <User user={customerObj} />
          </Link>
        );
      })}
    </div>
  );
};

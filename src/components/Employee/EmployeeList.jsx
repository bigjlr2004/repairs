import { useEffect, useState } from "react";
import { GetStaff } from "../../services/userService.jsx";
import { User } from "../Users/User.jsx";
import "./Employee.css";
import { Link } from "react-router-dom";

export const EmployeeList = () => {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    GetStaff().then((employeeArray) => {
      setStaff(employeeArray);
    });
  }, []);

  return (
    <div className="employees">
      {staff.map((userObj) => {
        return (
          <Link key={userObj.id} to={`/employees/${userObj.id}`}>
            <User user={userObj} />
          </Link>
        );
      })}
    </div>
  );
};

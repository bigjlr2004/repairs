import { useEffect, useState } from "react";
import { GetStaff } from "../../services/userService.jsx";
import { User } from "../Users/User.jsx";
import "./Employee.css";

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
        return <User user={userObj} key={userObj.id} />;
      })}
    </div>
  );
};

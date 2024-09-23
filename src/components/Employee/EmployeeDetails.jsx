import { useParams } from "react-router-dom";
import "./Employee.css";
import { useEffect, useState } from "react";
import { GetEmployeeById } from "../../services/EmployeeService.jsx";

export const EmployeeDetails = () => {
  const [employee, setEmployee] = useState({});
  const { employeeUserId } = useParams();

  useEffect(() => {
    GetEmployeeById(employeeUserId).then((data) => {
      const employeeObj = data[0];
      setEmployee(employeeObj);
    });
  }, [employeeUserId]);
  return (
    <section className="employee">
      <header className="employee-header">{employee.user?.fullName}</header>
      <div>
        <span className="employee-info">Email: </span>
        {employee.user?.email}
      </div>
      <div>
        <span className="employee-info">Specialty: </span>
        {employee.specialty}
      </div>
      <div>
        <span className="employee-info">Tickets: </span>
        {employee.employeeTickets?.length === 1
          ? `${employee.user?.fullName.split(" ")[0]} is working on ${
              employee.employeeTickets?.length
            } ticket.`
          : `${employee.user?.fullName.split(" ")[0]} is working on ${
              employee.employeeTickets?.length
            } tickets.`}
      </div>
    </section>
  );
};

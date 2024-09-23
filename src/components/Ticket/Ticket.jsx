import { useEffect, useState } from "react";
import { GetAllEmployees } from "../../services/EmployeeService.jsx";

export const Ticket = ({ ticket }) => {
  const [allEmployees, setAllEmployees] = useState([]);
  const [assignedEmployee, setAssignedEmployee] = useState({});

  useEffect(() => {
    GetAllEmployees().then((employeesArray) => {
      setAllEmployees(employeesArray);
    });
  }, []);

  useEffect(() => {
    const foundEmployee = allEmployees.find(
      (employee) => employee.id === ticket.employeeTickets[0]?.employeeId
    );
    setAssignedEmployee(foundEmployee);
  }, [allEmployees, ticket]);

  return (
    <section className="ticket" key={ticket.id}>
      <header className="ticket-info">{ticket.id}</header>
      <div>{ticket.description}</div>
      <footer>
        <div>
          <div className="ticket-info">assignee</div>
          <div>
            {assignedEmployee
              ? `${assignedEmployee.user?.fullName}`
              : "No employee is assigned"}
          </div>
        </div>
        <div>
          <div className="ticket-info">emergency</div>
          <div>{ticket.emergency ? "Yes" : "No"}</div>
        </div>
      </footer>
    </section>
  );
};

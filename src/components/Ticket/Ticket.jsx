import { useEffect, useState } from "react";
import { GetAllEmployees } from "../../services/EmployeeService.jsx";
import {
  AssignTicket,
  deleteTicket,
  updateTicket,
} from "../../services/TicketService.jsx";

export const Ticket = ({ ticket, currentUser, getAndSetTickets }) => {
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

  const HandleClaim = () => {
    const currentEmployee = allEmployees.find(
      (employee) => employee.userId === currentUser.id
    );

    const newEmployeeTicket = {
      employeeId: currentEmployee.id,
      serviceTicketId: ticket.id,
    };

    AssignTicket(newEmployeeTicket).then(() => {
      getAndSetTickets();
    });
  };
  const handleDelete = () => {
    deleteTicket(ticket.id).then(() => {
      getAndSetTickets();
    });
  };
  const HandleClose = () => {
    const closedTicket = {
      id: ticket.id,
      userId: ticket.userId,
      description: ticket.description,
      dateCompleted: new Date(),
    };

    updateTicket(closedTicket).then(() => {
      getAndSetTickets();
    });
  };

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
        <div className="btn-container">
          {currentUser.isStaff && !assignedEmployee ? (
            <button className="btn btn-secondary" onClick={HandleClaim}>
              Claim
            </button>
          ) : (
            ""
          )}
          {assignedEmployee?.userId === currentUser.id &&
          !ticket.dateCompleted ? (
            <button className="btn btn-warning" onClick={HandleClose}>
              Close
            </button>
          ) : (
            ""
          )}
          {!currentUser.isStaff ? (
            <button className="btn btn-warning" onClick={handleDelete}>
              Delete
            </button>
          ) : (
            ""
          )}
        </div>
      </footer>
    </section>
  );
};

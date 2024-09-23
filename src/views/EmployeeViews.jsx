import { Outlet, Route, Routes } from "react-router-dom";
import { EmployeeNav } from "../components/Nav/EmployeeNav.jsx";
import { Welcome } from "../components/Welcome/Welcome.jsx";
import { TicketList } from "../components/Ticket/TicketList.jsx";
import { CustomerList } from "../components/Customer/CustomerList.jsx";
import { CustomerDetails } from "../components/Customer/CustomerDetails.jsx";
import { EmployeeList } from "../components/Employee/EmployeeList.jsx";
import { EmployeeDetails } from "../components/Employee/EmployeeDetails.jsx";
import { EmployeeForm } from "../components/Forms/EmployeeForm.jsx";

export const EmployeeViews = ({ currentUser }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <EmployeeNav />
            <Outlet />
          </>
        }
      >
        <Route index element={<Welcome />} />
        <Route
          path="tickets"
          element={<TicketList currentUser={currentUser} />}
        />
        <Route path="customers">
          <Route index element={<CustomerList />} />
          <Route path=":customerId" element={<CustomerDetails />} />
        </Route>
        <Route path="employees">
          <Route index element={<EmployeeList />} />
          <Route path=":employeeUserId" element={<EmployeeDetails />} />
        </Route>
        <Route
          path="profile"
          element={<EmployeeForm currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};

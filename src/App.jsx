import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import { CustomerList } from "./components/Customer/CustomerList.jsx";
import { EmployeeList } from "./components/Employee/EmployeeList.jsx";

import { TicketList } from "./components/Ticket/TicketList.jsx";
import { NavBar } from "./components/Nav/NavBar.jsx";
import { Welcome } from "./components/Welcome/Welcome.jsx";
import { CustomerDetails } from "./components/Customer/CustomerDetails.jsx";

export const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<Welcome />} />
        <Route path="tickets" element={<TicketList />} />
        <Route path="customers">
          <Route index element={<CustomerList />} />

          <Route path=":customerId" element={<CustomerDetails />} />
        </Route>
        <Route path="employees" element={<EmployeeList />} />
      </Route>
    </Routes>
  );
};

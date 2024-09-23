import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "../components/Nav/NavBar.jsx";
import { Welcome } from "../components/Welcome/Welcome.jsx";
import { TicketList } from "../components/Ticket/TicketList.jsx";
import { CustomerList } from "../components/Customer/CustomerList.jsx";
import { CustomerDetails } from "../components/Customer/CustomerDetails.jsx";
import { EmployeeList } from "../components/Employee/EmployeeList.jsx";
import { EmployeeDetails } from "../components/Employee/EmployeeDetails.jsx";
import { useEffect, useState } from "react";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localHoneyUser = localStorage.getItem("honey_user");
    const honeyUserObject = JSON.parse(localHoneyUser);

    setCurrentUser(honeyUserObject);
  }, []);

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
      </Route>
    </Routes>
  );
};

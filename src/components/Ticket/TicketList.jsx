import { useEffect, useState } from "react";
import { getAllTickets } from "../../services/TicketService.jsx";
import "./Tickets.css";
import { Ticket } from "./Ticket.jsx";
import { TicketFilterBar } from "./TicketFilterBar.jsx";

export const TicketList = ({ currentUser }) => {
  const [allTickets, setAllTickets] = useState([]);
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false);
  const [showOpenOnly, setShowOpenOnly] = useState(false);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getAndSetTickets = () => {
    getAllTickets().then((ticketsArray) => {
      if (currentUser.isStaff) {
        setAllTickets(ticketsArray);
      } else {
        const customerTickets = ticketsArray.filter(
          (ticket) => ticket.userId === currentUser.id
        );
        setAllTickets(customerTickets);
      }
    });
  };
  useEffect(() => {
    getAndSetTickets();
  }, [currentUser]);

  useEffect(() => {
    setFilteredTickets(allTickets);
  }, [allTickets]);

  useEffect(() => {
    if (showEmergencyOnly) {
      const emergencyTickets = allTickets.filter((ticket) => ticket.emergency);
      setFilteredTickets(emergencyTickets);
    } else {
      setFilteredTickets(allTickets);
    }
  }, [showEmergencyOnly, allTickets]);
  useEffect(() => {
    const results = allTickets.filter((ticket) =>
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTickets(results);
  }, [searchTerm, allTickets]);

  useEffect(() => {
    if (showOpenOnly) {
      const openTickets = allTickets.filter(
        (ticket) => ticket.dateCompleted === ""
      );
      setFilteredTickets(openTickets);
    } else {
      setFilteredTickets(allTickets);
    }
  }, [allTickets, showOpenOnly]);

  return (
    <div className="tickets-container">
      <h2>Tickets</h2>
      <TicketFilterBar
        currentUser={currentUser}
        setSearchTerm={setSearchTerm}
        setShowEmergencyOnly={setShowEmergencyOnly}
        setShowOpenOnly={setShowOpenOnly}
      />

      <article className="tickets">
        {filteredTickets.map((ticket) => {
          return (
            <Ticket
              ticket={ticket}
              key={ticket.id}
              currentUser={currentUser}
              getAndSetTickets={getAndSetTickets}
            />
          );
        })}
      </article>
    </div>
  );
};

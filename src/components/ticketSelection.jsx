import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const TicketSelection = () => {
  const initialTicketCounts = {
    regular: 100,
    vip: 50,
    vvip: 20,
  };

  const [ticketType, setTicketType] = useState("regular");
  const [ticketCount, setTicketCount] = useState(1);
  const [ticketCounts, setTicketCounts] = useState(initialTicketCounts);
  const navigate = useNavigate(); 

  useEffect(() => {
    const savedTicketType = localStorage.getItem("ticketType");
    const savedTicketCount = localStorage.getItem("ticketCount");
    const savedTicketCounts = JSON.parse(localStorage.getItem("ticketCounts"));

    if (savedTicketType) setTicketType(savedTicketType);
    if (savedTicketCount) setTicketCount(Number(savedTicketCount));
    if (savedTicketCounts) setTicketCounts(savedTicketCounts);
  }, []);

  useEffect(() => {
    localStorage.setItem("ticketType", ticketType);
    localStorage.setItem("ticketCount", ticketCount);
    localStorage.setItem("ticketCounts", JSON.stringify(ticketCounts));
  }, [ticketType, ticketCount, ticketCounts]);

  const handleBookTicket = () => {
    if (ticketCounts[ticketType] >= ticketCount) {
      setTicketCounts((prevCounts) => ({
        ...prevCounts,
        [ticketType]: prevCounts[ticketType] - ticketCount,
      }));
      navigate("/form");
    } else {
      alert("Sorry, not enough tickets available.");
    }
  };

  return (
    <div className="ticketWrapper">
      <section className="ticket-selection">
        <div className="ticket-header">
          <p className="headerTic">Ticket Selection</p>
          <p className="step">Step 1/3</p>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar"></div>
        </div>
        <div className="event-details">
          <div className="headSection">
            <p className="sectionHeader">Techember Fest ”25</p>
            <p className="details">
              Join us for an unforgettable experience at [Event Name]! Secure
              your spot now.
            </p>
            <div className="sectionBottom">
              <span>📍 [Event Location]</span>
              <span>||</span>
              <span>March 15, 2025 | 7:00 PM</span>
            </div>
          </div>
          <div className="progress-bar-containers"></div>
          <div className="optionWrapper">
            <p className="optionP">Select Ticket Type:</p>
            <div className="ticket-options">
              <button
                className={`ticket-option ${
                  ticketType === "regular" ? "active" : ""
                }`}
                onClick={() => setTicketType("regular")}
              >
                <span className="span1">Free</span>
                <span className="span2">Regular Ticket</span>
                <span className="span3">{ticketCounts.regular} Left</span>
              </button>

              <button
                className={`ticket-option ${
                  ticketType === "vip" ? "active" : ""
                }`}
                onClick={() => setTicketType("vip")}
              >
                <span className="span1">$100</span>
                <span className="span2">VIP Access Ticket</span>
                <span className="span3">{ticketCounts.vip} Left</span>
              </button>

              <button
                className={`ticket-option ${
                  ticketType === "vvip" ? "active" : ""
                }`}
                onClick={() => setTicketType("vvip")}
              >
                <span className="span1">$150</span>
                <span className="span2">VVIP Access Ticket </span>
                <span className="span3">{ticketCounts.vvip} Left</span>
              </button>
            </div>
          </div>

          <div className="ticket-count">
            <label className="optionP">Number of Tickets</label>
            <br />
            <input
              type="number"
              value={ticketCount}
              min="1"
              onChange={(e) => setTicketCount(e.target.value)}
            />
          </div>

          <div className="actions">
            <button className="cancel">Cancel</button>
            <button className="next" onClick={handleBookTicket}>
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TicketSelection;

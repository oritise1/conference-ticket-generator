import React, { useEffect, useState, useRef  } from "react";
import html2canvas from "html2canvas";
import "./Ticket.css";

const Ticket = () => {
  const [userData, setUserData] = useState(null);
  const [ticketCount, setTicketCount] = useState(null);
  const [ticketType, setTicketType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const ticketRef = useRef(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    const storedTicketCount = localStorage.getItem("ticketCount");
    const storedTicketType = localStorage.getItem("ticketType");

    if (storedUserData && storedTicketCount && storedTicketType) {
      setUserData(JSON.parse(storedUserData));
      setTicketCount(storedTicketCount);
      setTicketType(storedTicketType);
    }
  }, []);

  const handleDownload = async () => {
    setIsLoading(true);
    const ticketElement = ticketRef.current;

    if (!ticketElement) {
      setIsLoading(false);
      return;
    }

    try {
      const canvas = await html2canvas(ticketElement, {
        allowTaint: true,
        useCORS: true,
        logging: false,
        backgroundColor: false,
        scale: 2, 
        onclone: (clonedDoc) => {
          // Ensure all images are loaded in the cloned document
          const images = clonedDoc.getElementsByTagName('img');
          return Promise.all(Array.from(images).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise((resolve) => {
              img.onload = resolve;
              img.onerror = resolve;
            });
          }));
        }
      });

      // Convert and download
      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.href = image;
      link.download = `Techember_Ticket_${userData?.name || 'ticket'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating ticket:', error);
      alert('Failed to download ticket. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!userData || !ticketCount || !ticketType) {
    return (
      <div className="ticket-container">
        <div className="ticket">
          <div className="ticketHeader">
            <h2>No Ticket Data Found</h2>
            <p>Please book a ticket to see your details here.</p>
            <button
              className="back"
              onClick={() => (window.location.href = "/")}
            >
              Book a Ticket
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ticket-container">
      <div className="ticket">
        <div className="form-header">
          <p className="formTic">Ready</p>
          <p className="formStep">Step 3/3</p>
        </div>
        <div className="progress-container">
          <div className="progressBars"></div>
        </div>
        <div className="ticketHeader">
          <h2>Your Ticket is Booked!</h2>
          <p>You can download or Check your email for a copy</p>
        </div>
          <div className="ticket-card" ref={ticketRef}>
            <div className="ticket-card-background"></div>
            <div className="ticketContent">
              <h1 className="ticket-title">Techember Fest "25</h1>
              <div className="event-detail">
                <span className="icon">📍</span>
                <span>04 Rumens Road, Ikoyi, Lagos</span>
              </div>
              <div className="event-detail">
                <span className="icon">📅</span>
                <span>March 15, 2025 | 7:00 PM</span>
              </div>

              <div className="upload-boxs">
                {userData.imageUrl && (
                  <img 
                    src={userData.imageUrl} 
                    alt="ticket preview" 
                    crossOrigin="anonymous"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'fallback-image-url.png'; 
                    }}
                  />
                )}
              </div>

              <div className="ticket-info">
                <div className="info-grid">
                  <div className="name">
                    <p className="label">Enter your name</p>
                    <p className="value">{userData.name}</p>
                  </div>
                  <div className="email">
                    <p className="label">Enter your email *</p>
                    <p className="value">{userData.email}</p>
                  </div>
                </div>
                <div className="info-grid">
                  <div className="type">
                    <p className="label">Ticket Type:</p>
                    <p className="value bold">{ticketType}</p>
                  </div>
                  <div className="tic">
                    <p className="label">Ticket for:</p>
                    <p className="value">{ticketCount}</p>
                  </div>
                </div>
                <div>
                  <p className="label">Special request?</p>
                  <p className="value">{userData.about}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="dash"></div>
          <div className="barcode">
            <div className="barcode-background"></div>
            <img
               src="https://barcode.tec-it.com/barcode.ashx?data=978020137962&code=EAN13"
              alt="barcode"
            />
          </div>
        <div className="download-button">
          <button 
            className="back"
            onClick={() => (window.location.href = "/")}
          >
            Book Another Ticket
          </button>
          <button 
            className="submit" 
            onClick={handleDownload}
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Download'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
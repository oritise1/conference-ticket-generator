import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import TicketSelection from "./components/ticketSelection";
import Confirmation from "./components/confirmation";
import "./App.css";
import FormPage from "./components/formPage";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<TicketSelection />} />
          <Route path="/my-tickets" element={<Confirmation />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/about-project" element={<AboutProject />} />
        </Routes>
      </div>
    </Router>
  );
};

const AboutProject = () => {
  return (
    <div className="formWrapper">
      <section className="container">
        <h1>Event Ticket Booking UI – Open Source Practice Project 🎟️</h1>

        <h2>Overview</h2>
        <p>
          This is a beginner-friendly yet practical Event Ticket Booking UI
          designed for developers to clone, explore, and build upon. The design
          focuses on a seamless, login-free ticket reservation flow, allowing
          users to book event tickets quickly and efficiently.
        </p>
        <p>
          The project consists of a three-step ticket booking flow, and
          developers can extend it further by integrating payment solutions,
          user authentication (optional), and ticket validation systems.
        </p>

        <h2>Flow & Features</h2>
        <h3>1️⃣ Ticket Selection</h3>
        <ul>
          <li>Users can browse available tickets (Free & Paid).</li>
          <li>Ticket options are displayed in a list or card view.</li>
          <li>
            For Free Tickets → Clicking “Get Free Ticket” proceeds to attendee
            details.
          </li>
          <li>
            For Paid Tickets → Clicking “Purchase Ticket” would ideally open a
            payment modal.
          </li>
        </ul>

        <h3>2️⃣ Attendee Details Form</h3>
        <ul>
          <li>Users input their Name, Email, and optional Phone Number.</li>
          <li>Profile picture upload option with preview functionality.</li>
          <li>
            Ticket summary is visible to ensure users review their details
            before submission.
          </li>
        </ul>

        <h3>3️⃣ Payment or Success Page</h3>
        <ul>
          <li>
            If the ticket is free, the user is taken directly to the Ticket
            Confirmation Page.
          </li>
          <li>
            If the ticket is paid, developers can integrate Stripe, Paystack, or
            Flutterwave to process payments before showing the confirmation
            page.
          </li>
          <li>
            Upon successful booking, users should receive:
            <ul>
              <li>A visual ticket preview with a unique QR Code.</li>
              <li>
                An option to download the ticket as PDF or save it to their
                device.
              </li>
              <li>An email confirmation containing ticket details.</li>
            </ul>
          </li>
        </ul>

        <h2>How to Build This 🚀</h2>
        <p>This UI can be implemented using:</p>

        <h3>📌 Frontend (Next.js or React)</h3>
        <ul>
          <li>
            <strong>Component Breakdown:</strong>
            <ul>
              <li>
                <code>TicketCard.tsx</code> → Displays ticket details
              </li>
              <li>
                <code>AttendeeForm.tsx</code> → Captures user details
              </li>
              <li>
                <code>PaymentModal.tsx</code> → Handles payment processing
              </li>
              <li>
                <code>SuccessScreen.tsx</code> → Shows the final ticket preview
              </li>
            </ul>
          </li>
          <li>
            <strong>State Management:</strong> React’s Context API, Zustand, or
            Redux (if needed).
          </li>
          <li>
            <strong>File Handling:</strong> Users should be able to upload
            images (profile picture for ticket) using Firebase Storage,
            Cloudinary, or local preview with <code>URL.createObjectURL()</code>
            .
          </li>
        </ul>

        <h3>📌 Backend (Optional)</h3>
        <ul>
          <li>
            If persistence is required, a backend can be built using:
            <ul>
              <li>Node.js & Express or Firebase Functions</li>
              <li>
                Database: MongoDB, PostgreSQL, or Firebase Firestore to store
                ticket records
              </li>
            </ul>
          </li>
        </ul>

        <h3>📌 Payment Integration</h3>
        <ul>
          <li>
            For paid events, developers should integrate:
            <ul>
              <li>Stripe Checkout (for international transactions)</li>
              <li>Paystack or Flutterwave (for African users)</li>
            </ul>
          </li>
        </ul>

        <h2>What You’ll Learn �</h2>
        <ul>
          <li>File handling & validation (profile picture uploads).</li>
          <li>Dynamic UI updates based on ticket selection.</li>
          <li>Persisting bookings using local state or a backend.</li>
          <li>Integrating payment gateways for ticket purchases.</li>
          <li>
            Generating & validating QR Codes for event check-in (Advanced).
          </li>
        </ul>

        <h2>Need Help? Reach Out! 💬</h2>
        <p>
          If you have any questions or need assistance, feel free to reach out!
        </p>
      </section>
      <div className="buttons">
        <button className="back">
          <a
            href="https://www.figma.com/design/mnnJHwncb8YZhu0QBPyG7Z/Event-Ticket-Booking-UI-%E2%80%93-Open-Source-Practice-Project-%F0%9F%8E%9F%EF%B8%8F-(Community)?node-id=2004-266&p=f&t=PaET4aBXgQMnworm-0"
            target="_blank"
          >
            Figma File
          </a>
        </button>
        <button className="submit">
          <a
            href="https://github.com/oritise1/conference-ticket-generator"
            target="_blank"
          >
            GitHub Code
          </a>
        </button>
      </div>
    </div>
  );
};

export default App;

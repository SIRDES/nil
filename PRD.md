# Product Requirements Document (PRD): IT Training & Adult Education Platform

## 1. Project Overview
A full-stack web application serving as the primary marketing site and student registration portal for an education agency. It features a public-facing website for lead generation and a secure admin dashboard for content, student, and lead management. 
**Target Cohort Launch:** 1st Week of April.

## 2. Technical Stack
* **Frontend/Backend:** Next.js (App Router).
* **Database:** MongoDB (using Mongoose).
* **Styling:** Tailwind CSS (Navy blue primary, white, light gray backgrounds).
* **Forms:** `react-hook-form` for complex state management in multi-step wizards.
* **Authentication:** NextAuth.js for the `/admin` routes.

## 3. Public Website Features & UI Layouts
* **Global Styles:** Trustworthy navy blue headers and primary buttons. Crisp white cards with subtle shadows on off-white/light gray backgrounds. Modern sans-serif typography.
* **Landing Page:** * Hero section ("April Cohorts Now Open").
  * 4-column Programs Grid (Junior Coders, Developer Accelerator, AI & Emerging Tech, Adult Education).
  * Statistics banner (Hiring Rate, Graduates, Hiring Partners, Avg. Starting Salary).
* **Dynamic Program Detail Page:**
  * Header with prominent pill-shaped badges for variable details like "Duration" (editable by admin).
  * Main content: "Program Focus" cards, "Curriculum Highlights" with checkmark list, Lead Instructor profile.
  * Sticky right sidebar with Tuition cost, Career Outcomes, and primary "Register" CTA.
* **Contact Us Page:** * Split layout featuring a form (First Name, Last Name, Email, Phone, Subject dropdown, Message).
  * "Visit Our Campus" card with Google Maps integration and direct contact info.

## 4. Academic Programs Data
The platform offers the following tracks, with durations and details manageable via the admin dashboard:
* **Junior Coders Program (Beginners):** 3 months. Focuses on Foundation & Confidence Building (Programming Logic, Python Basics, HTML/CSS, Git, Personal Website).
* **Developer Accelerator Program (Intermediate):** 4 months. Focuses on Real-world Development (Advanced Python/Java, DSA, APIs, Databases, Agile, Portfolio).
* **AI & Emerging Technologies Program (Advanced):** 6 months. Focuses on Innovation (Machine Learning, AI Tools, Cloud, DevOps, System Design).
* **Adult Education (Legon/UCC Mature Entrance):** 3 months. Preparation classes covering English, Mathematics, General Knowledge, and Current Affairs.
* **Adult Education (JHS pre-SHS):** Variable duration based on term.

## 5. Student Registration Flow (Multi-Step Wizard)
A frictionless, 3-step client-side form using a top progress bar to prevent form fatigue.
* **Step 1: Personal Information:** First Name, Last Name, Email Address, Phone Number, Location (City, Country).
* **Step 2: Program Selection:** Dropdown menu. 
  * *Conditional Logic:* If "Mature Entrance" is selected, dynamically reveal an "Age Verification Required" alert card containing an interactive Date Picker component. Manual text entry for dates is strictly prohibited. Validation must enforce age >= 25 years.
* **Step 3: Review & Submit:** Summary of Personal Details (with 'Edit' button), Selected Program card (showing duration, tuition, start date), and a Terms & Conditions agreement checkbox. Final "Submit Registration" button.

## 6. Admin Dashboard (Backend/CMS)
Protected route requiring login credentials.
* **Authentication:** Clean login card ("Welcome Back") requiring Admin Email and Password.
* **Dashboard Overview:**
  * Top Metric Cards: Total Registrations, Active Visitors, New Leads, Completion Rate.
  * "Recent Sign-ups" table: Columns for Student Name, Program, Date, Amount (Tuition), Status (Pending, Enrolled, Waitlist pills), and Action links.
* **Registrations Management:**
  * Full data table view with filters ("All Programs", "All Statuses").
  * **Add Registration Modal:** A popup to manually add students. Includes fields for Name, Email, Phone, Student ID (optional), Program, Enrollment Status, a "Payment Received" toggle switch, and an Internal Notes textarea.
* **Content Management:** Interfaces to modify Program variables (Duration, Next Cohort Start Dates, Tuition, Curriculum).

## 7. Database Schema Needs (MongoDB)
* **`Program`:** name, category, duration, tuition, focus, curriculum (Array), nextCohortDate.
* **`Registration`:** firstName, lastName, email, phone, location, programId, dateOfBirth (Date), status (String), paymentReceived (Boolean), studentId, internalNotes.
* **`User` (Admin):** email, passwordHash, role.
* **`ContactMessage`:** firstName, lastName, email, phone, subject, message.

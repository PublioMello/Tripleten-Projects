Around The U.S. – React Version
📌 Project Description

This project is a React-based version of the Around The U.S. web application. The goal of the project is to refactor a previously built HTML/CSS/JavaScript application into a modular React architecture, improving code organization, component reuse, and maintainability.

The application allows users to view photo cards, edit their profile, update their avatar, add new cards, and view images in an enlarged popup.

🚀 Technologies Used

- React
- JavaScript (ES6+)
- HTML5
- CSS3
- Vite
- BEM Methodology

🧩 Components Structure

The application was divided into reusable React components to improve maintainability and scalability.

Main components include:

Layout Components

- App – Root component of the application.
- Header – Displays the website logo.
- Main – Contains the profile section and card list.
- Footer – Displays the copyright information.

Profile Components

- EditProfile – Popup form for editing the user profile.
- EditAvatar – Popup form for updating the user avatar.

Card Components

- Card – Displays an individual image card.
- ImagePopup – Popup used to display an enlarged card image.

Popup Components

- Popup – Reusable popup wrapper used for all modal windows.

- NewCard – Popup form for adding a new card.

📸 Features Implemented
Profile Section

- Display user avatar, name, and description
- Edit profile information through a popup form
- Update avatar via popup interaction

Cards Section

Render a list of cards dynamically
Each card displays:

- Image
- Title
- Like button
- Delete button

Image Popup:
Clicking on a card image opens a popup displaying the image in full size along with its caption.

Popup System:
A reusable popup system was implemented using React state management.

🧠 State Management

The popup logic is handled inside the Main component using React state.

Functions implemented:

- handleOpenPopup()
- handleClosePopup()

These functions control which popup is displayed.

📂 Project Structure
src
│
├── assets
│ └── images
│
├── components
│ ├── Header
│ ├── Main
│ ├── Footer
│ ├── Card
│ └── Popup
│
└── App.jsx

▶️ How to Run the Project

Clone the repository:

- git clone https://github.com/yourusername/around-react.git

Navigate to the project folder:

- cd around-react

Install dependencies:

- npm install

Run the development server:

- npm run dev

🎯 Learning Goals

This project focuses on learning:

- React component architecture
- Props and state management
- Dynamic rendering with map()
- Event handling in React
- Reusable UI components
- Popup/modal system implementation

📌 Future Improvements

- Possible future improvements include:
- Connecting the project to a backend API
- Implementing card like functionality
- Adding form validation
- Implementing card deletion
- Adding user authentication

# fleet-management

A Web Project for Software 2.

## Index

-   [Description](#description)
-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Installation](#installation)
-   [Usage](#usage)

# Fleet Management

This is the README file for the Fleet Management project. The project aims to provide a comprehensive solution for managing a fleet of vehicles.

## Description

The Fleet Management project consists of both the front end (client) and backend (server) components, which are included in the same repository. The front end is responsible for providing a user-friendly interface for managing the fleet, while the backend handles the business logic and data storage.

## Features

-   User authentication and authorization
-   Vehicle registration and management
-   Driver management
-   Trip tracking and reporting
-   Maintenance scheduling and tracking

## Technologies Used

-   Front End:

    -   HTML, CSS, JavaScript
    -   React.js

-   Backend:
    -   Node.js
    -   Express.js
    -   Mongo DB

## Installation

1. Clone the repository: `git clone https://github.com/your-username/fleet-management.git`
2. Install the dependencies for the front end and backend:
    - CLIENT SIDE (Front End):
    ```bash
    cd client
    ```
    ```bash
    npm install
    ```
    - SERVER SIDE (Back End):
    ```bash
    cd client
    ```
    ```bash
    npm install
    ```
3. Configure the database connection in the backend.

    - create a .env file an put

    ```bash
    DATABASE_URL = <YOUR_STRING__CONNECTION>
    ```

4. Start the development server:
    - Front End:
    ```bash
    npm run dev
    ```
    - Backend:
    ```bash
    npm run dev
    ```

## Usage

-   Access the front end by opening your browser and navigating to `http://localhost:3000`.
-   Use the provided user interface to manage the fleet, register vehicles, assign drivers, track trips, and schedule maintenance.

## Contributing

Contributions are welcome! If you'd like to contribute to the Fleet Management project, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.

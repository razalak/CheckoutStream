# CheckoutStream
CheckoutStream is a streamlined, efficient system designed to facilitate the seamless creation and management of customer orders through a conversational interface. Leveraging the power of Node.js and WooCommerce REST API.


# CheckoutStream

CheckoutStream is a Node.js application that integrates with WooCommerce to create orders from customer inputs via a chat interface. The chat interface collects customer details and sends them to the backend, where orders are processed and created using the WooCommerce REST API.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

CheckoutStream allows customers to place orders through a chat interface. The system extracts order details from the chat messages, processes them, and creates an order in WooCommerce with "Cash on Delivery" as the payment method.

## Features

- Extracts order details from chat messages
- Creates orders in WooCommerce
- Handles validation of order details
- Simple and intuitive chat interface

## Installation

### Prerequisites

- Node.js (>=12.x)
- WooCommerce store with REST API enabled

### Backend Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/checkoutstream.git
    cd checkoutstream
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your WooCommerce credentials:
    ```sh
    WOO_COMMERCE_URL=https://yourstore.com
    WOO_COMMERCE_CONSUMER_KEY=your_consumer_key
    WOO_COMMERCE_CONSUMER_SECRET=your_consumer_secret
    ```

4. Start the backend server:
    ```sh
    node server.js
    ```

### Frontend Setup

1. Navigate to the `src` directory:
    ```sh
    cd src
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the frontend application:
    ```sh
    npm start
    ```

## Usage

1. Ensure the backend server is running.
2. Open the frontend application in your browser.
3. Interact with the chat interface by entering order details in the specified format:
    ```
    Name: John Doe,
    Email: johndoe@example.com,
    Phone: 123-456-7890,
    Address: 123 Main St Springfield,
    Pincode: 12345
    ```
4. The backend will process the message and create an order in WooCommerce if the data is valid.

## API Endpoints

### POST /api/message

Handles incoming messages from the frontend chat interface and processes them to create orders.

- **URL**: `/api/message`
- **Method**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
- **Body Parameters**:
  - `message`: `string` (The message containing order details)

#### Request Example

```json
{
  "message": "Name: John Doe, Email: johndoe@example.com, Phone: 123-456-7890, Address: 123 Main St Springfield, Pincode: 12345"
}


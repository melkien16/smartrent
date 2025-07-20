
# RentSmart Application Overview

RentSmart is an intuitive platform that allows users to rent everyday tools, accessories, and other useful items. The app connects owners who have tools and items available for rent with users who need them for a specific period. It provides a seamless way for people to rent and list items while managing payments, subscriptions, reviews, and messaging.

## Table of Contents

1. **Overview**
2. **Features**
   - User Authentication
   - Item Management
   - Booking System
   - Wallet System
   - Collateral System
   - Subscription Plans
   - Reviews
   - Messaging
3. **User Flow**
   - Registration & Login
   - Browsing and Booking Items
   - Managing Wallets
   - Collateral Check
   - Subscription Management
4. **Admin Features**
   - Admin Dashboard
   - User & Item Management
   - Reports & Statistics
5. **How It Works**
   - Booking Workflow
   - Payment & Refund System
   - Subscription Logic
6. **Tech Stack & Architecture**
7. **Running The App Locally**
8. **Conclusion**

## 1. Overview

RentSmart is designed to streamline the process of renting everyday items. Whether you need a camera for a day, a power tool for a weekend project, or even a travel bag for a trip, RentSmart connects you with people who have those items available for rent. Users can sign up, browse available items, make bookings, and manage payments directly through the app.

## 2. Features

### User Authentication
Users can sign up, log in, and view their profile. Authentication is done using JWT tokens to secure API routes and manage user sessions.

### Item Management
- Users can browse a list of available items.
- Owners can list their items by adding descriptions, images, and rental prices.
- Items can be updated, deleted, or marked as unavailable.

### Booking System
- Users can book items based on availability.
- The system checks wallet balance before confirming the booking.
- Statuses: 'pending', 'confirmed', 'completed' for bookings.
- Cancel bookings if still pending.

### Wallet System
- Users can deposit funds into their wallet and use them to book items.
- Payments are deducted at the time of booking.
- Owners get paid after the booking is completed (after the service fee is deducted).

### Collateral System
- Users must upload a collateral as a profile verification to rent items.
- Collateral is checked to ensure it meets the minimum requirement for rentals.
- Users can update their collateral if needed.

### Subscription Plans
- Users can opt for a "premium" subscription that offers benefits like lower service fees.
- Admins can deactivate subscriptions if they expire or are manually canceled.

### Reviews
- Users can leave reviews for items and owners after a booking is completed.
- Reviews are publicly visible for other users to help in decision-making.

### Messaging
- Users can send messages to owners to inquire about items or details regarding the booking.

## 3. User Flow

### Registration & Login
1. **Register**: Users can sign up by providing basic information like name, email, password, and collateral.
2. **Login**: After registration, users log in using email/password or through third-party integrations.

### Browsing and Booking Items
1. **Browse Items**: Users can search for items based on category, location, and availability.
2. **Book Item**: When a user finds an item, they can make a booking by selecting the dates. The system verifies the wallet balance.
3. **Confirm Booking**: If the wallet has sufficient funds, the booking is confirmed.

### Managing Wallets
1. **Deposit Funds**: Users can add funds to their wallet via the deposit API.
2. **Wallet Balance**: The balance is updated every time a booking is confirmed or canceled.

### Collateral Check
1. **Upload Collateral**: Users must upload a collateral to verify their identity for rental activities.
2. **Check Collateral**: Before confirming a rental, the system ensures the collateral meets the minimum requirement.

### Subscription Management
1. **Premium Subscription**: Users can opt for a premium subscription that provides reduced service fees (5% vs. 10% for regular users).
2. **Subscription Expiry**: When a subscription expires, the user’s status automatically changes to ‘basic’ and the service fee increases.

## 4. Admin Features

### Admin Dashboard
Admins have a comprehensive dashboard to manage users, items, bookings, and reviews. They can access detailed reports and manage system-wide settings.

### User & Item Management
Admins can add, edit, and delete user profiles, as well as items listed for rent.

### Reports & Statistics
- Admins can generate reports showing system usage, user activity, and revenue.
- Overall stats are available in graphical formats.

## 5. How It Works

### Booking Workflow
1. **Create Booking**: A user books an item, providing the start and end dates.
2. **Wallet Check**: The system ensures the user has enough funds to cover the total cost.
3. **Confirm Booking**: Once the booking is confirmed, the amount is deducted from the user’s wallet.
4. **Owner Payment**: After completion, the owner receives the payment (minus service fees).

### Payment & Refund System
- **Payment**: Deducted immediately when a booking is confirmed.
- **Refund**: If a booking is canceled (and still pending), the refund process is initiated, and the status is updated to “refunded.”

### Subscription Logic
- **Basic**: Standard subscription with 10% service fee.
- **Premium**: Users who opt for a premium subscription get a reduced service fee of 5%.
- **Expiration**: Premium users are downgraded to basic once the subscription expires.

## 6. Tech Stack & Architecture

- **Node.js** and **Express**: Handle REST API routing and server-side logic.
- **MongoDB**: Stores data for users, items, bookings, etc.
- **JWT**: Secure authentication via tokens.
- **Multer**: Manages file uploads for images and collateral.
- **Cloudinary**: Media storage for item images (optional).
- **node-cron**: Used to schedule periodic tasks, such as subscription expiration checks.

## 7. Running The App Locally

1. Clone the repository:
    ```bash
    git clone https://github.com/melkien16/rentsmart-backend.git
    cd rentsmart-backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the root directory and add the following:
    ```
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/rentsmart
    JWT_SECRET=your_jwt_secret
    NODE_ENV=development
    ```

4. Run the app:
    ```bash
    npm run dev
    ```

5. Access the app at `http://localhost:5000`

## 8. Conclusion

RentSmart is an innovative platform for renting everyday tools, gadgets, and accessories. Its flexible and user-friendly design makes it easy for anyone to rent or list an item. With seamless payment integration, subscription options, and real-time messaging, RentSmart stands out as a reliable and efficient rental solution.

Thank you for exploring RentSmart!

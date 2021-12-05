[![makeitgogo logo](media/makeitgogo.svg 'click to visit')](https://makeitgogo.davidquintero.dev)

## Overview

MakeItGoGo is a crowdfunding full-stack application made with React.js and Express.js integrating the Firebase API for user authentication and the Stripe APIs for payment processing. As an unregistered user you are able to view campaigns and contribute (BACK IT) with a test credit card number. You are also able to show your appreciation and support for a particular campaign by giving it unlimited Faves.

As a registered user, you are able to create a campaign providing the required campaign title and story, upload an image for display in the campaign card and page, choose a category and stablish a US dollar goal amount.

Each campaign receives funds individually, for which reason a dedicated account is created on Stripe at the moment of submission. The browser receives a redirect URL through the headers leading to the Stripe Connect onboarding and verification flow. This is where a campaing owner would provide banking and ID verification to received funds collected by MakeItGoGo. Because this is a test environment, Stripe provides way to enter dummy information for such thing as routing and account numbers. Once the onboaring is completed, Stripe redirects the user to the newly created campaign URL on MakeItGoGo. The campaign is now able to accept credit card payments.

The campaign owner would see an EDIT link which would allow them to modify all campaign data originally provided upon creation, even the goal amount. All form fields are pre-filled with the existing data to faciliate in things like typo corrections, etc. On this same page, a campaign owner is able to DELETE the campaign.

## Installation

### Express server

This project consists of a React app and an Express server. We will start with the Express server. Navigate to the `backend` directory and create a `.env` file with the following variables:

```
PORT=
DB_URI=
STRIPE_SECRET_KEY=
REACT_APP_URL=
COMPANY_NAME=
```

Here you must provide the PORT number, a MongoDB URI string, the Stripe API Secret Key, the HTTP URL of the React app (and port number if in development environment), and the app name as COMPANY_NAME.

Now run the following command from your CLI:

`yarn install`

This will install all project dependencies. Then:

`yarn dev`

This will start the server on the `PORT` provided in the `.env` file.

### React App

Navigate to the `react-app` directory and create a `.env` file with the following variables:

```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_CLOUDINARY_UPLOAD_URL=
REACT_APP_CLOUDINARY_CLOUD_NAME=
REACT_APP_CLOUDINARY_UPLOAD_PRESET=
REACT_APP_STRIPE_PUBLISHABLE_KEY=
REACT_APP_API_URL=
```

These values will come from you Firebase API credentials, Cloudinary (for image upload storage), Stripe Publishable Key, and a reference to the Express server API endpoint (and port number if in development environment) eg: `http://localhost:5000/api`

Now run the following command from your CLI:

`npm install`

This will install all project dependencies. Then:

`npm run start`

This will start the app on `PORT 3000`.

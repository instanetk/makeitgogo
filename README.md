# MakeItGoGo

### Overview

MakeItGoGo is a crowdfunding full-stack application made with React.js and Express.js integrating the Firebase API for user authentication and the Stripe APIs for payment processing. As an unregistered user you are able to view campaigns and contribute (BACK IT) with a test credit card number. You are also able to show your appreciation and support for a particular campaign by giving it unlimited Faves.

As a registered user, you are able to create a campaign providing the required campaign title and story, upload an image for display in the campaign card and page, choose a category and stablish a US dollar goal amount.

Each campaign receives funds individually, for which reason a dedicated account is created on Stripe at the moment of submission. The browser receives a redirect URL through the headers leading to the Stripe Connect onboarding and verification flow. This is where a campaing owner would provide banking and ID verification to received funds collected by MakeItGoGo. Because this is a test environment, Stripe provides way to enter dummy information for such thing as routing and account numbers. Once the onboaring is completed, Stripe redirects the user to the newly created campaign URL on MakeItGoGo. The campaign is now able to accept credit card payments.

The campaign owner would see an EDIT link which would allow them to modify all campaign data originally provided upon creation, even the goal amount. All form fields are pre-filled with the existing data to faciliate in things like typo corrections, etc. On this same page, a campaign owner is able to DELETE the campaign.

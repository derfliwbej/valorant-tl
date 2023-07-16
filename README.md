# Valorant TL

A third party application to access VALORANT contents remotely on your browser.

## Features

* Storefront
  - Check the contents of your store anytime, anywhere, as long as you have a browser and an internet   connection.

* Penalty Checker
  - Check if there are existing queue penalties in your account.

* ... and more features to come, as long as I see the need for it

## Security

Account credentials is only sent on Riot's official servers, and the application does not have access to the account's username and password at any time. A user is sent to Riot's login page that returns an access token within the URL the login request redirects to. The application uses this access token to access the user's account, instead of the user inputting their username and password into my application. In addition, the access token expires 1 hour after its issuance, so expired access tokens cannot be used to make additional requests for the account it belongs to.

## Disclaimer

Valorant TL is not part of Riot Games nor it is endorsed by it. The developer is not liable for any damage to the user's account caused by the application.
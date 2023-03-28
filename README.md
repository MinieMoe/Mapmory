# Mapmory 
A map board that keeps track of the places you've been to with a collections of photos attached to it

To be migrated to React Native...

This is just a practice to make API call to google maps and google photos
- Google Authentication: main log in authentication - I'm not planning to make my own log in authentication
- Google Maps: used to add (custom) marks/pins to the map and attach photos there
- Google Photos: to connect to user google account and store their images there

# Task of the day
## Accomplishment
- Connected to google authentication service and able to retrieve user Google ID token (JWT) and verify it
- Decoded Google Id token, which can be used to extract user info (email, img, etc...)

## 03/24/23
- [x] setting up folders
- [x] redirect user to main page after login
- [ ] store user login info to check if they're logged in or not
- [ ] log out and remove user login


# Features

## Signup and Login [JSReference](https://developers.google.com/identity/gsi/web/reference/js-reference)

### Authentication with Google - retrieve JWT from google
Using google account:
- used this [package](https://www.npmjs.com/package/@react-oauth/google)
- alternative: use passport-google - [tutorial](https://medium.com/analytics-vidhya/adding-sign-in-with-google-to-your-website-b82755b79b31)

On successful login, Google will return an object of type [CredentialResponse](https://developers.google.com/identity/gsi/web/reference/js-reference#CredentialResponse)

- [VerifyIdTojen](https://developers.google.com/identity/gsi/web/guides/verify-google-id-token)

- [AuthenticationProcess-video](https://developers.google.com/identity/sign-in/web/backend-auth#send-the-id-token-to-your-server)

Verify credential (google Token ID ):
- [CodeBorrowed](https://stackoverflow.com/questions/68524360/how-can-i-decode-a-google-oauth-2-0-jwt-credential-token)

- [GoogleRef](https://developers.google.com/identity/sign-in/web/backend-auth#verify-the-integrity-of-the-id-token)

## Checked if the user is signed in
The deprecated version of google web sign in has a method that checks if the user is signed in [tutorial](https://medium.com/@18arjunh/how-to-use-google-apis-with-oauth2-0-in-your-web-app-6ec2e8421751)

But it's deprecated, and the new version doesn't a similar method. So have to store JWT in local storage

[possibleSolution?? - using cookie](https://stackoverflow.com/questions/74498809/how-to-check-if-a-user-is-already-logged-in-using-google-accounts-id)

It looks like the token Id expires in a hour since the user sign in, the cookie session should be less than an hour

NOTE: tested to see if cookies sent works in Postman, but received an error because Postman is not a google client, hence there no token generated to be verified

## Authorization - check if the user is the same user as the one they're logged in before give them access to certain things...?


## Search Bar and filter
- [ ] Search up places to add your picture using google maps api (add custom marker to map??)
- [ ] Filter your photos - what should be shown in the maps: by dates, locations

## Current location
- [ ] the default location upon opening the map

## Upload photos and attach them to a location
- [ ] upload photos from google photo api and attach them to a location in map
- [ ] let the user choose a default photo for their collection cover
- [ ] the collection should show up at a location marker

## Recommend places to visit similar to visited places


# Folder structure
src -> components
- Map
- List : list of places

# Connecting front end and back end
Use cors, http-proxy-middleware npm package

# Raindrop Passport Module

## Install

`$ npm install passport-raindrop`

## Usage

### Configure Strategy

The Raindrop strategy authenticates a user based on the user's Hydro ID and verifying the
user input a raindrop-generated message into the Hydro App.

The `verify` callback is required to verify a valid site user is being authenticated. Authentication
fails if no user is found.

```
/* Passport Setup */

// Initialize the raindrop
// Declared as a variable in order to access Raindrop SDK functions (primarily 'generateMessage') from within the app.
let raindrop = new RaindropStrategy({
    environment: "Sandbox",
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    applicationId: APPLICATION_ID
}, function (hydroId, done) {
    // This verifies the user and returns it to the authentication
    let user = userDB.find(usr => usr.hydroId === hydroId);
    return user ? done(null, user) : done(new Error('User not found.'), null);
});

// Pass the strategy into passport
passport.use(raindrop);
```

### Authenticate Requests

Use `passport.authenticate()` and specify the 'raindrop' strategy.

For example:

```
passport.authenticate('raindrop', {
    successRedirect: '/pass',
    failureRedirect: '/fail'
})(req, res, next);
```
# Raindrop Passport Module

The 'raindrop' strategy authenticates a user by confirming the user has input an API-generated message into the Hydro mobile app.

## Installation

`$ npm install passport-raindrop`


## Configuration

The `verify` callback is required to verify a valid site user is being authenticated. Authentication
fails if no user is found.

```
const passport = require('passport'),
      RaindropStrategy = require('passport-raindrop')      

// Initialize the raindrop. Declared as a variable in order to access Raindrop SDK functions later.   
let raindrop = new RaindropStrategy({
    environment: ENVIRONMENT,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    applicationId: APPLICATION_ID
}, function (authUser, done) {   
    // This verifies the user and returns it to the authentication
    let user = userDB.find(usr => usr.hydroId === authUser.hydroId);
    return user ? done(null, user) : done(new Error('User not found.'), null);
});

// Pass the strategy into passport
passport.use(raindrop);
```

## Usage

### Authenticate Requests

Use `passport.authenticate()` and specify the 'raindrop' strategy.

```
passport.authenticate('raindrop', {
    successRedirect: '/pass',
    failureRedirect: '/fail'
})(req, res, next);
```

### Generate Verification Message

`let message = HydrogenAPI.raindrop.generateMessage();`

In this example `HydrogenAPI` is the export from the above 'Configuration'. See the 'Complete Example' below for the full
in-context configuration.

## Complete Example

A [complete example](https://github.com/Red-Maximus/Raindrop-Passport-Authentication) of using this library.

## Documentation

[Hydrogen API](https://www.hydrogenplatform.com/docs/hydro/v1/?javascript#Client-side)

[Passport JS](http://www.passportjs.org/docs/)

## Author

[Red-Maximus](https://github.com/Red-Maximus)

## License

[Unlicensed](http://unlicense.org/)
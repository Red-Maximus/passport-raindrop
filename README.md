# Raindrop Passport Module

The Raindrop strategy authenticates a user based on the user's Hydro ID and verifying the
user input a raindrop-generated message into the Hydro App.

## Installation

`$ npm install passport-raindrop`


## Configuration

The `verify` callback is required to verify a valid site user is being authenticated. Authentication
fails if no user is found.

```
const passport = require('passport'),
      RaindropStrategy = require('passport-raindrop')

/* Initialize the raindrop
   Declared as a variable in order to access Raindrop SDK functions (primarily 'generateMessage') from within the app. */
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

```
router.post('/login', function(req, res, next) {
    /* 'HydrogenAPI', in this example, is the export of the 'Configuration' above.
       See 'Complete Example' below for a full in-context example */
    req.session.hydroMessage = HydrogenAPI.raindrop.generateMessage();
    res.redirect('/');
});
```

## Complete Example

A complete example of using this library TODO: Insert Here

## Documentation

TODO: Insert Hydro API documentation
TODO: Insert Passport documentation

## Author

TODO: Insert me here

## License

TODO: Insert license here
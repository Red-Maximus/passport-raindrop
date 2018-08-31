/**
 * Module dependencies.
 */
const util = require('util'),
    abstract = require('passport-strategy'),
    Raindrop = require('@hydrogenplatform/raindrop');

/**
 * `RaindropStrategy` constructor
 *
 * @constructor
 * @param {object} options
 * @param {function} verify
 * @access public
 */
function RaindropStrategy(options, verify) {
    let strat = this;

    options = options || {};
    options.verbose = true;

    if(options.clientId && options.clientSecret && options.applicationId && options.environment) {
        strat.generateMessage = Raindrop.client.generateMessage;
        strat.partner = new Raindrop.client.RaindropPartner(options);
    }

    abstract.Strategy.call(strat);
    strat._verify = verify;
    strat.name = 'raindrop';
}

/**
 * Inherit from `Strategy`.
 */
util.inherits(RaindropStrategy, abstract.Strategy);

/**
 * Authenticate request by verifying signature via Hydrogen API
 *
 * @param {http.IncomingMessage} req
 * @access protected
 */
RaindropStrategy.prototype.authenticate = async function(req) {
    let strat = this;

    await strat._verify(req.session.user, async (error, user) => {
        // If the user verification failed, return an error
        if (error) { return strat.error(error); }

        // Verifies, through the Hydro API, that the user entered the message into the Hydro App
        let hydroRes = await strat.partner.verifySignature(user.hydroId, req.session.hydroMessage).catch(err => strat.error(err));

        // Pass or fail the strategy based on the return object
        return hydroRes.verified ? strat.success(user) : strat.fail();
    }).catch(err => { return strat.error(err) });
};

module.exports = RaindropStrategy;
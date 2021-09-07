/* global WIKI */

// ------------------------------------
// Yandex Account
// ------------------------------------

const YandexStrategy = require('passport-yandex').Strategy
const _ = require('lodash')

module.exports = {
  init (passport, conf) {
    passport.use('yandex',
      new YandexStrategy({
        clientID: conf.yandexClientId,
        clientSecret: conf.yandexClientSecret,
        callbackURL: conf.callbackURL,
        response_type: 'code',
        passReqToCallback: true
      }, async (req, accessToken, refreshToken, profile, cb) => {
        try {
          const user = await WIKI.models.users.processProfile({
            providerKey: req.params.strategy,
            profile: {
              ...profile,
              picture: _.get(profile, '_json.profile', '')
            }
          })
          cb(null, user)
        } catch (err) {
          cb(err, null)
        }
      })
    )
  }
}

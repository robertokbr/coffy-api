export default {
  secret: process.env.SECRET_HASH || 'hash',
  expiration: '1h',
  expirationHours: 1,
}

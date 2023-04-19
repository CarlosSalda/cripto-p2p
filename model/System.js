class System {
  constructor () {
    this.VALUES_THRESHOLD_PERCENTAGE = 5
  }

  getPercentageDifferenceAgainstMarketValue (userValue) {
    return this.percentageDiff(this.getUpdatedValue(), userValue) < this.VALUES_THRESHOLD_PERCENTAGE
  }

  getUpdatedValue () {
    return 10000 // TODO: replace with real system fetch
  }

  percentageDiff (a, b) {
    return 100 * Math.abs((a - b) / ((a + b) / 2))
  }
}

module.exports = System

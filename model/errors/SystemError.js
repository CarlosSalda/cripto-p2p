class SystemValueDiffError extends Error {
  constructor (message) {
    super(message)
    this.name = 'System Value Diff Error'
  }
}

module.exports = SystemValueDiffError

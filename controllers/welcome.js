const getWelcomeMessage = async (req, res) => {
  try {
    res.send('Welcome to Cripto-P2P!')
  } catch (error) {
    res.status(500).send('Internal server error')
  }
}

module.exports = {
  getWelcomeMessage
}

const Report = require('../model/Report')
const Criptoactives = require('../model/enums/cryptoactive')

const { describe, expect, test } = require('@jest/globals')

describe('Reports tests', () => {
  describe(('Datetime'), () => {
    test('set datetime to 30 minutes before now', () => {
      const report = anyReport()

      const MS_PER_MINUTE = 60000
      const startDate = new Date((new Date()) - 31 * MS_PER_MINUTE)
      report.setDatetime(startDate)

      expect(report.getDatetime().getTime()).toBe(startDate.getTime())
    })
  })

  describe(('USD & ARS amount'), () => {
    test('set usd amount', () => {
      const report = anyReport()

      report.setUsdAmount(5555)

      expect(report.getUsdAmount()).toBe(5555)
    })

    test('Fail when try to set an USD negative amount', () => {
      const report = anyReport()

      const fn = () => report.setUsdAmount(-300)

      expect(fn).toThrowError()
    })

    test('set ars amount', () => {
      const report = anyReport()

      report.setArsAmount(333)

      expect(report.getArsAmount()).toBe(333)
    })

    test('Fail when try to set a ARS negative amount', () => {
      const report = anyReport()

      const fn = () => report.setUsdAmount(-300)

      expect(fn).toThrowError()
    })
  })

  describe(('Criptoactives'), () => {
    test('Should add an element and return a list with 1 element', () => {
      const report = anyReport()

      report.addCriptoactive(randomCriptoactive)

      expect(report.getCriptoactives().length).toBe(1)
    })

    test('Should set criptoactives list', () => {
      const report = anyReport()
      const list = [randomCriptoactive]

      report.setCriptoactivesList(list)

      expect(report.getCriptoactives()).toBe(list)
    })
  })
})

const anyReport = () => new Report(new Date(), 1525, 767000, [])
const randomCriptoactive = {
  criptoACtive: Criptoactives.USDC,
  nominalAmount: 25,
  cotization: 100,
  arsCotization: 37700
}

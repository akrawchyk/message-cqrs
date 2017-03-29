// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8081
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL
    console.log(devServer)

    browser
      .url(devServer)
      .waitForElementVisible('#App', 5000)
      .assert.elementPresent('.Index')
      .assert.containsText('h1', 'Index.vue')
      .assert.elementCount('img', 1)
      .end()
  },
  'get comment': function (browser) {
    browser
      .url(browser.globals.devServerURL)
      .waitForElementVisible('#App', 5000)
      .assert.elementPresent('.CommentList')
      .waitForElementVisible('.Comment', 2000)
      .end()
  },
  'post comment': function (browser) {
    browser
      .url(browser.globals.devServerURL)
      .waitForElementVisible('#App', 5000)
      .assert.elementPresent('.CommentForm')
      .setValue('textarea.CommentForm-text', 'test')
      .click('.CommentForm button[type="submit"]')
      .end()
  }
}

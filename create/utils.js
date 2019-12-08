const glob = require("glob")
const path = require("path")

module.exports.getAllLayouts = () => {
  let allLayoutsString = ''

  const fileArray = glob.sync("./src/layouts/**/*.data.js")

  fileArray.forEach(function(file) {
    let queryString = require(path.resolve(file))
    allLayoutsString = allLayoutsString + " \n " + queryString()
  })

  return allLayoutsString
}

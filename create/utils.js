const path = require("path")

module.exports.getAllLayoutsData = () => {
  const glob = require("glob")

  let allLayoutsString = ""

  const fileArray = glob.sync("./src/layouts/**/*.data.js")

  fileArray.forEach(function(file) {
    let queryString = require(path.resolve(file))
    allLayoutsString = allLayoutsString + " \n " + queryString()
  })

  return allLayoutsString
}

module.exports.createTemplate = ({ templateCacheFolderPath, templatePath, templateName, imports }) => {
  return new Promise((resolve) => {
    const fs = require("fs")

    const template = require(templatePath)
    const contents = template(imports)

    fs.mkdir(templateCacheFolderPath, { recursive: true }, (err) => {
      if (err) throw "Error creating template-cache folder: " + err

      const filePath = templateCacheFolderPath + "/" + templateName + ".js"

      fs.writeFile(filePath, contents, "utf8", err => {
        if (err) throw "Error writing " + templateName + " template: " + err

        console.log("Successfully created " + templateName + " template.")
        resolve()
      })
    })
  })
}

module.exports.createPageWithTemplate = ({createTemplate, templateCacheFolder, pageTemplate, page, pagePath, mappedLayouts, createPage, reporter}) => {

  createTemplate(
    {
      templateCacheFolderPath: templateCacheFolder,
      templatePath: pageTemplate,
      templateName: "tmp-" + page.uri,
      imports: mappedLayouts,
    }).then(() => {

    createPage({
      path: pagePath,
      component: path.resolve(templateCacheFolder + "/" + "tmp-" + page.uri + ".js"),
      context: {
        page: page,
      },
    })
    reporter.info(`page created: ${pagePath}`)
  })
}

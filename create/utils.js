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

/**
 * Creates files based on a template string.
 *
 * @param {string} templateCacheFolderPath - Path where the temporary files should be saved.
 * @param {string} templatePath - Path to the file holding the template string.
 * @param {string} templateName - Name of the temporary created file.
 * @param {object[]} imports - An array of objects, that define the layoutType, componentName and filePath.
 * @returns {Promise<>}
 */
module.exports.createTemplate = ({ templateCacheFolderPath, templatePath, templateName, imports }) => {
  return new Promise((resolve) => {
    const fs = require("fs")

    const template = require(templatePath)
    const contents = template(imports)

    fs.mkdir(templateCacheFolderPath, { recursive: true }, (err) => {
      if (err) throw "Error creating template-cache folder: " + err


      const filePath = templateCacheFolderPath + "/" + ((templateName === "/" || templateName === "") ? "home" : templateName) + ".js"


      fs.writeFile(filePath, contents, "utf8", err => {
        if (err) throw "Error writing " + templateName + " template: " + err

        console.log("Successfully created " + templateName + " template.")
        resolve()
      })
    })
  })
}

/**
 * Creates pages out of the temporary created templates.
 */
module.exports.createPageWithTemplate = ({ createTemplate, templateCacheFolder, pageTemplate, page, pagePath, mappedLayouts, createPage, reporter }) => {
  /**
   * First we create a new template file for each page.
   */
  createTemplate(
    {
      templateCacheFolderPath: templateCacheFolder,
      templatePath: pageTemplate,
      templateName: "tmp-" + page.slug,
      imports: mappedLayouts,
    }).then(() => {

    /**
     * Then, we create a gatsby page with the just created template file.
     */
    createPage({
      path: pagePath,
      component: path.resolve(templateCacheFolder + "/" + "tmp-" + page.slug + ".js"),
      context: {
        page: page,
      },
    })

    reporter.info(`page created: ${pagePath}`)
  })
}

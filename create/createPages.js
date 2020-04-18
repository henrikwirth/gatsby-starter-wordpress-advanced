const { FluidImageFragment } = require("../src/templates/fragments")
const { PageTemplateFragment } = require("../src/templates/page/data")

const _uniqBy = require("lodash.uniqby")
const _isEmpty = require("lodash.isempty")

const { getAllLayoutsData, createTemplate, createPageWithTemplate } = require("./utils")

const filePathToComponents = "../src/layouts/"
const templateCacheFolder = ".template-cache"
const layoutMapping = require("./layouts")
const pageTemplate = require.resolve("../src/templates/page/template.js")

const GET_PAGES = (layouts) => `
    ${FluidImageFragment}
    ${PageTemplateFragment(layouts)}

    query GET_PAGES($first:Int $after:String) {
        wpgraphql {
            pages(
                first: $first
                after: $after
                # This will make sure to only get the parent nodes and no children
                where: {
                    parent: null
                }
            ) {
                pageInfo {
                    hasNextPage
                    endCursor
                }
                nodes {
                  ...PageTemplateFragment
                }
            }
        }
    }
`

const allPages = []
let pageNumber = 0
const itemsPerPage = 10

/**
 * This is the export which Gatbsy will use to process.
 *
 * @param { actions, graphql }
 * @returns {Promise<void>}
 */
module.exports = async ({ actions, graphql, reporter }, options) => {

  /**
   * Get all layouts data as a concatenated string
   */
  const layoutsData = getAllLayoutsData()

  /**
   * This is the method from Gatsby that we're going
   * to use to create pages in our static site.
   */
  const { createPage } = actions
  /**
   * Fetch pages method. This accepts variables to alter
   * the query. The variable `first` controls how many items to
   * request per fetch and the `after` controls where to start in
   * the dataset.
   *
   * @param variables
   * @returns {Promise<*>}
   */
  const fetchPages = async (variables) =>
    /**
     * Fetch pages using the GET_PAGES query and the variables passed in.
     */
    await graphql(GET_PAGES(layoutsData), variables).then(({ data }) => {
      /**
       * Extract the data from the GraphQL query results
       */
      const {
        wpgraphql: {
          pages: {
            nodes,
            pageInfo: { hasNextPage, endCursor },
          },
        },
      } = data

      /**
       * Map over the pages for later creation
       */
      nodes
      && nodes.map((pages) => {
        allPages.push(pages)
      })

      /**
       * If there's another page, fetch more
       * so we can have all the data we need.
       */
      if (hasNextPage) {
        pageNumber++
        reporter.info(`fetch page ${pageNumber} of pages...`)
        return fetchPages({ first: itemsPerPage, after: endCursor })
      }

      /**
       * Once we're done, return all the pages
       * so we can create the necessary pages with
       * all the data on hand.
       */
      return allPages
    })

  /**
   * Kick off our `fetchPages` method which will get us all
   * the pages we need to create individual pages.
   */
  await fetchPages({ first: itemsPerPage, after: null }).then((wpPages) => {

    wpPages && wpPages.map((page) => {
      let pagePath = `${page.uri}`

      /**
       * If the page is the front page, the page path should not be the uri,
       * but the root path '/'.
       */
      if (page.isFrontPage) {
        pagePath = "/"
      }

      /**
       * Filter out empty objects. This can happen, if for some reason you
       * don't query for a specific layout (UnionType), that is potentially
       * there.
       */
      const layouts = page.pageBuilder.layouts.filter(el => {
        return !_isEmpty(el)
      })

      let mappedLayouts = []

      if (layouts && layouts.length > 0) {
        /**
         * Removes all duplicates, as we only need to import each layout once
         */
        const UniqueLayouts = _uniqBy(layouts, "fieldGroupName")

        /**
         * Maps data and prepares object for our template generation.
         */
        mappedLayouts = UniqueLayouts.map((layout) => {
          return {
            layoutType: layout.fieldGroupName,
            componentName: layoutMapping[layout.fieldGroupName],
            filePath: filePathToComponents + layoutMapping[layout.fieldGroupName],
          }
        })
      }

      createPageWithTemplate({
        createTemplate: createTemplate,
        templateCacheFolder: templateCacheFolder,
        pageTemplate: pageTemplate,
        page: page,
        pagePath: pagePath,
        mappedLayouts: mappedLayouts,
        createPage: createPage,
        reporter: reporter,
      })
    })

    reporter.info(`# -----> PAGES TOTAL: ${wpPages.length}`)
  })
}

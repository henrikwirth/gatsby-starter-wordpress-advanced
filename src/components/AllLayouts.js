import React from "react"
import Hero from "../layouts/Hero"
import TextBlock from "../layouts/TextBlock"

const AllLayouts = ({ layoutData }) => {

  const layoutType = layoutData.fieldGroupName

  /**
   * Default component
   */
  const Default = () => <div>In AllLayouts the mapping of this component is missing: {layoutType}</div>

  /**
   * Mapping the fieldGroupName(s) to our components
   */
  const layouts = {
    page_Pagebuilder_Layouts_Hero: Hero,
    page_Pagebuilder_Layouts_TextBlock: TextBlock,
    page_default: Default
  }

  /**
   * If layout type is not existing in our mapping, it shows our Default instead.
   */
  const ComponentTag = layouts[layoutType] ? layouts[layoutType] : layouts['page_default']

  return (
    <ComponentTag {...layoutData} />
  )
}

export default AllLayouts

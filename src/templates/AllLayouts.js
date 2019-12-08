import React from "react"
import Hero from "../layouts/Hero"
import TextBlock from "../layouts/TextBlock"

const AllLayouts = ({ componentData, componentType }) => {

  const Default = () => <div>In AllLayouts the mapping of this component is missing: {componentType}</div>

  const components = {
    page_Pagebuilder_Layouts_Hero: Hero,
    page_Pagebuilder_Layouts_TextBlock: TextBlock,
    page_default: Default
  }

  const mappedData = (componentType, componentData) => {
    switch (componentType) {
      default:
        return componentData
    }
  }

  const ComponentName = components[componentType] ? components[componentType] : components['page_default']

  return (
    <ComponentName {...mappedData(componentType, componentData)} />
  )
}

export default AllLayouts

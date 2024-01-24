import React from "react";
import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
  useParams
} from "react-router-dom";

export const CreateFeature = () => {
    return <div>create feature</div>
}

export  const EditFeature = () => {
    let { featureId } = useParams()
    console.log('Edit: ', featureId)
    return <div>Edit feature</div>
}

const ViewFeature = () => {
    let { featureId } = useParams()
    console.log('view: ', featureId)
    return <div>View feature</div>
}

export default ViewFeature
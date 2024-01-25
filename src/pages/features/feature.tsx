import React, { useState, useEffect } from "react";
import FeatureService from './featureService'
import { IFeature } from "../../types/feature";
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
    const [feature, setFeature] = useState<IFeature | undefined>()
    
    useEffect(() => {
        const init = async () => {
            console.log('Edit: ', featureId)

            if (featureId) {
                try {
                    const featureResp = await FeatureService.getFeature(featureId)
                    setFeature(featureResp.data)
                } catch (err) {
                    //  do nothing for now
                }
            }
        }

        init()
    }, [])

    return (
        <div>
            <h2>Edit feature</h2>
            <p>name: { feature?.name }</p>
            <p>description: { feature?.description }</p>
            <p>type: { feature?.type }</p>
            <p>value: { feature?.value }</p>
            <p>tags: { feature?.tags?.join(', ') }</p>
        </div>
    )
}

const ViewFeature = () => {
    let { featureId } = useParams()
    const [feature, setFeature] = useState<IFeature | undefined>()
    
    useEffect(() => {
        const init = async () => {
            console.log('Edit: ', featureId)

            if (featureId) {
                try {
                    const featureResp = await FeatureService.getFeature(featureId)
                    setFeature(featureResp.data)
                } catch (err) {
                    //  do nothing for now
                }
            }
        }

        init()
    }, [])

    return (
        <div>
            <h2>View feature</h2>
            <p>name: { feature?.name }</p>
            <p>description: { feature?.description }</p>
            <p>type: { feature?.type }</p>
            <p>value: { feature?.value }</p>
            <p>tags: { feature?.tags?.join(', ') }</p>
        </div>
    )
}

export default ViewFeature
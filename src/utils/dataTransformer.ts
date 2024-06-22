import { IFeature } from "../types/feature"

class DataTransformer {
    public static generateDictionary<T>(items:T[]|undefined, field:string):{[key:string]:T} {
        if (!items) return {}

        return items.reduce<{[key:string]:T}>((acc, item) => {
            acc[field] = item
            return acc
        }, {}) || {}
    }

    public static generateFeaturesDictionary<T>(items:IFeature[]|undefined):{[key:string]:IFeature} {
        if (!items) return {}
        
        let featuresMap:{[key:string]:IFeature} = {}
        featuresMap = items?.reduce<{[key:string]:IFeature}>((acc, item) => {
            let value = item.value.split(' - ')
            let key:string = value.length > 1? value[1]: value[0]
            acc[key] = item
            return acc
        }, {}) || {}

        return featuresMap
    }
}

export default DataTransformer
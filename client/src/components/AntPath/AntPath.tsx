import {
    createContainerComponent,
    createElementHook,
    createPathHook
} from '@react-leaflet/core'
// @ts-ignore
import { antPath } from 'leaflet-ant-path'

const createAntPath = (props: any, context: any) => {
    const instance = antPath(props.positions, props.options)
    return { instance, context: { ...context, overlayContainer: instance } }
}

const useAntPathElement = createElementHook(createAntPath, () => {})
const useAntPath = createPathHook(useAntPathElement)
const AntPath = createContainerComponent(useAntPath)

export default AntPath

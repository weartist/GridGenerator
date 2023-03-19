import { Bounds } from '../css/layout/bounds';
import { OBJECT_FIT } from '../css/property-descriptors/object-fit';
import { ObjectPosition } from '../css/property-descriptors/object-position';
export declare const calculateObjectFitBounds: (objectFit: OBJECT_FIT, objectPosition: ObjectPosition, naturalWidth: number, naturalHeight: number, clientWidth: number, clientHeight: number) => {
    src: Bounds;
    dest: Bounds;
};

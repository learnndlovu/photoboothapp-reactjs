import { SET_CANVAS_FRAME } from './actionTypes';

export const setCanvasFrame = (imageUrl) => {
    return {
        type: SET_CANVAS_FRAME,
        payload: imageUrl
    }
}

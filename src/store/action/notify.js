import { PUT_NOTIFY } from "./actiontypes";

export const putNotify = (request) => {
    return {
        type: PUT_NOTIFY,
        payload:request
    }
}
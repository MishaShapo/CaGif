import { NativeModules } from 'react-native';

const {
    FitnessData
} = NativeModules;
let auth;
// function to request authorization rights
function requestAuth() {
    return new Promise((resolve, reject) => {
        FitnessData.askForPermissionToReadTypes([FitnessData.Type.StepCount], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
}
// function to request data
function requestData() {
    /* as native module requests are rendered asynchronously, add and return a promise */
    //before.getTime(), date,
    return new Promise((resolve, reject) => {
        FitnessData.getStepStats(Date.now());
        resolve(true);
    });
}
export default () => {
    if (auth) {
        return requestData();
    } else {
        return requestAuth().then(() => {
            auth = true;
            return requestData();
        });
    }
}

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
    let date = new Date().getTime();
    let before = new Date();
    before.setDate(before.getDate() - 5);
    /* as native module requests are rendered asynchronously, add and return a promise */
    //before.getTime(), date, 
    return new Promise((resolve, reject) => {
        FitnessData.getStepStats((err, data) => {
            if (err) {
                reject(err);
            } else {
                let result = {};
/* Rended the data to display it as we need */
                for (let val in data) {
                    const date = new Date(data[val].start_date);
                    const day = date.getDate();
                    if (!result[day]) {
                        result[day] = {};
                    }
                    result[day]['steps'] = (result[day] && result[day]['steps'] > 0) ?
                        result[day]['steps'] + data[val].value :
                        data[val].value;
                    result[day]['date'] = date;
                }
                resolve(Object.values(result));
            }
        });
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

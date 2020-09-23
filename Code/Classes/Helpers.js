
import { Keyboard, Dimensions, AsyncStorage
} from 'react-native';

class HelperFunctions {

    constructor() {
    }

    hideKeyboard() {
        Keyboard.dismiss();
    }

    setNetStatus(isConnected) {
        if (isConnected) {
            AsyncStorage.setItem('NET_ACCESS', 'true');
        } else {
            AsyncStorage.setItem('NET_ACCESS', 'false');
        }
    }

    async getNetworkStatus() {
        let status = await AsyncStorage.getItem('NET_ACCESS');
        if(status === 'none' || status === 'unknown') {
            return false;
        }

        return true;
    }

    onPickerValueCahnge(ref, key, value) {
        ref.setData(key, value);
        let stateData = {};
        stateData[key] = value;
        ref.setState(stateData);
    }

    selectDropDownOptions(data, defaultValue, lableValue ) {
        let options = [];

        if(lableValue) {
            options[0] = {
                name: lableValue,
                value: null
            };

        }
        
        for (var key in data) {
            let typeObj = {};
            typeObj['name'] = data[key];
            typeObj['value'] = key;

            if (typeObj['value'] == defaultValue) {
                typeObj['selected'] = true;
            }
            
            options[options.length] = typeObj;
        }

        return options;
    }

    validateForm(data, required, emails) {
        
        let validate = [];
        validate['error'] = false;
        validate['message'] = 'Valid Form';

        if(!required) {
            required = [];
        }

        if(!emails) {
            emails = [];
        }

        for (var key in required) {
            if (!data[required[key]]) {
                validate['error'] = true;
                validate['message'] = `${this.convertToProperCase(required[key])} is required`;
                return validate;
            }
        }

        let emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        for (var key in emails) {

            let value = data[emails[key]];
            if (value && !emailPattern.test(value)) {
                validate['error'] = true;
                validate['message'] = `${this.convertToProperCase(emails[key])} is invalid`;
                return validate;
            }
        }

        return validate;

    }

    convertToProperCase (str) {
        str = str.replace('_', ' ');
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };

    removeListeners(context) {
        if (!context._listeners) {
            return false;
        }
        context._listeners.forEach((removeListener) => removeListener());
    }


    checkFormDataObject(value) {
        let varType = typeof value;
        if (!value) {
            return {
                error:true,
                value:''
            }
        }

        if(varType.includes('string')) {
            return {
                error:false
            }
        }

        if(varType.includes('number')) {
            return {
                error:false
            }
        }

        if(varType.includes('object')) {

            let uri = value['uri'];
            if(!uri || uri.includes('http')) {
                return {
                 error:true,
                 value:''
                }
            }

            if(uri) {
                return {
                    error:false
                }
            }

            return {
                error:true,
                value:''
            }
        }
    }

}

let helpers = new HelperFunctions();
export default helpers

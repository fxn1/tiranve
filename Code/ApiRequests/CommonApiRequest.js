'use strict';
import React, {Component} from 'react';
import { NetInfo } from 'react-native';

import Helpers from 'Code/Classes/Helpers';

const ApiUrl = 'http://iit-yearbook.coloredcow.com/api';
//const ApiUrl = 'http://21261a3b.ngrok.io/api';

var isConnected = true;

class ApiRequest {
    constructor() {
        this.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
    }

    login(data) {
        let url = ApiUrl + '/login';
        return new Promise( async (next, error) => {
            let networkStatus = await Helpers.getNetworkStatus();
            if(!networkStatus) {
                error('You are offline Please connect to network');
            }
            
            try {

                let response = await fetch(url, {
                    method: 'POST',
                    headers: this.headers,
                    body: JSON.stringify(data)
                });

                let responseJson = await response.json();

                if (response.status >= 200 && response.status < 300) {
                    next(responseJson);
                }

                error(responseJson.error);

            } catch (err) {
                error('Something went wrong');
            }
        });
    }

    logout(accessToken) {

        let url = ApiUrl + '/logout';

        let headers = this.headers;

        headers['Authorization'] = 'Bearer ' + accessToken;

        return new Promise((next, error) => {

            try {
                let responseData = null;
                fetch(url, {
                        method: 'GET',
                        headers: this.headers
                    })
                    .then((response) => {
                        if (response.status >= 200 && response.status < 300) {
                            next(response);
                        } else {
                            error(response);
                        }
                    })
                    .catch((error) => {
                        error(error);
                    });

            } catch (err) {
                error(err);
            }
        });
    }

    saveProfileImage(imageData, accessToken) {
    let url = ApiUrl + '/saveProfileImage';
        let file = {
            uri: imageData,
            name: 'user_profile_img',
            type: 'image/png'
        };

        let data = new FormData();

        let headers = {};
        headers['Accept'] = 'application/json';
        headers['Authorization'] = 'Bearer ' + accessToken;
        headers['Content-Type'] = 'multipart/form-data';

        return new Promise((next, error) => {

            try {
                let responseData = null;
                fetch(url, {
                        method: 'POST',
                        headers: this.headers,
                        body: data
                    })
                    .then((response) => {
                        if (response.status >= 200 && response.status < 300) {
                            next(true);
                        } else {
                            error(response);
                        }
                    })
                    .catch((err) => {
                        error(err);
                    });

            } catch (err) {
                error(err);
            }
        });
    }

    getProfileImage(accessToken) {

        let url = ApiUrl + '/getprofileimage';

        let headers = this.headers;

        headers['Authorization'] = 'Bearer ' + accessToken;

        return new Promise((next, error) => {

            try {

                if (accessToken) {
                    let responseData = null;
                    fetch(url, {
                            method: 'GET',
                            headers: this.headers
                        })
                        .then((response) => {
                            responseData = response;
                            return response.json().catch((err) => error(err));
                        })
                        .then((responseJson) => {
                            if (responseData.status >= 200 && responseData.status < 300) {
                                next(responseJson);
                            } else {
                                error(responseJson.error);
                            }
                        })
                        .catch((err) => {
                            error(err);
                        });

                } else {
                    error(false);
                }

            } catch (err) {
                error(err);
            }

        });
    }

    sendContact(accessToken, data) {
        let url = ApiUrl + '/send/contact';
        this.headers['Authorization'] = 'Bearer ' + accessToken;
        return new Promise((next, error) => {

            if(!isConnected) {
             alert('You are offline');
             error(false);
            }

            try {
                if (accessToken) {
                    let responseData = null;
                    fetch(url, {
                            method: 'POST',
                            headers: this.headers,
                            body: JSON.stringify(data)
                        })
                        .then((response) => {
                            responseData = response;
                            return response.text().catch((err) => error(err));
                        })
                        .then((responseJson) => {
                            if (responseData.status >= 200 && responseData.status < 300) {
                                next(responseJson);
                            } else {
                                error('error in edit baselining');
                            }
                        })
                        .catch((error) => {
                            error(error);
                        });

                } else {
                    error(false);
                }

            } catch (err) {
                error(err);
            }

        });
    }

    activeEula(accessToken) {

        let url = ApiUrl + '/active/mobile';

        let headers = this.headers;

        headers['Authorization'] = 'Bearer ' + accessToken;

        return new Promise((next, error) => {

            try {
                if (accessToken) {
                    let responseData = null;
                    fetch(url, {
                            method: 'GET',
                            headers: this.headers
                        })
                        .then((response) => {
                            responseData = response;
                        })
                    .catch((error) => {
                        error(error);
                    });

                } else {
                    error(false);
                }

            } catch (err) {
                error(err);
            }

        });
    }

    reportContent(accessToken, data) {
         let url = ApiUrl + '/report/content';
         this.headers['Authorization'] = 'Bearer ' + accessToken;
         return new Promise((next, error) => {

            try {
                if (accessToken) {
                    let responseData = null;
                    fetch(url, {
                            method: 'POST',
                            headers: this.headers,
                            body: JSON.stringify(data)
                        })
                        .then((response) => {
                            responseData = response;
                            return response.text().catch((err) => error(err));
                        })
                        .then((responseJson) => {
                            if (responseData.status >= 200 && responseData.status < 300) {
                                next(responseJson);
                            } else {
                                error('error in edit baselining');
                            }
                        })
                        .catch((error) => {
                            error(error);
                        });

                } else {
                    error(false);
                }

            } catch (err) {
                error(err);
            }

         });
    }

    getMemberList(accessToken) {
        let url = ApiUrl + '/getallmembers';
        return new Promise(async(next, error) => {
            let networkStatus = await Helpers.getNetworkStatus();
            let headers = this.headers;
            headers['Authorization'] = 'Bearer ' + accessToken;

            try {

                let response = await fetch(url, {
                    method: 'GET',
                    headers: this.headers
                });

                let responseJson = await response.json();
                if (response.status >= 200 && response.status < 300) {
                    next(responseJson);
                }

                error(responseJson.error);

            } catch (err) {
                error('Something went wrong');
            }
        });
    }

    getMemberDetails(accessToken, memberid) {
        let url = ApiUrl + '/getmemberdetails/'+ memberid;
        return new Promise(async(next, error) => {
            let networkStatus = await Helpers.getNetworkStatus();
            let headers = this.headers;
            headers['Authorization'] = 'Bearer ' + accessToken;

            try {

                let response = await fetch(url, {
                    method: 'GET',
                    headers: this.headers
                });

                let responseJson = await response.json();
                if (response.status >= 200 && response.status < 300) {
                    next(responseJson);
                }

                error(responseJson.error);

            } catch (err) {
                error('Something went wrong');
            }
        });
    }

    getFilteredData(accessToken, searchString) {
        let url = ApiUrl + '/getfiltereddata/' + searchString;
        return new Promise(async(next, error) => {
            let networkStatus = await Helpers.getNetworkStatus();
            let headers = this.headers;
            headers['Authorization'] = 'Bearer ' + accessToken;

            try {

                let response = await fetch(url, {
                    method: 'GET',
                    headers: this.headers
                });

                let responseJson = await response.json();
                if (response.status >= 200 && response.status < 300) {
                    next(responseJson);
                }

                error(responseJson.error);

            } catch (err) {
                error('Something went wrong');
            }
        });
    }

    updateProfile(accessToken, data) {
        let url = ApiUrl + '/updateprofile';
        return new Promise(async(next, error) => {
            let headers = {};
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'multipart/form-data';
            headers['Authorization'] = 'Bearer ' + accessToken;

            try {
                let response = await fetch(url, {
                    method: 'POST',
                    headers: this.headers,
                    body: data
                });

                let responseJson = await response.text();

                if (response.status >= 200 && response.status < 300) {
                    next(responseJson);
                }
                error(responseJson);
            } catch (err) {
                error(err);
            }
        });
    }

    changePassword(accessToken, newPassword) {
        let url = ApiUrl + '/changepassword/' + newPassword;
        return new Promise(async(next, error) => {
            let networkStatus = await Helpers.getNetworkStatus();
            let headers = this.headers;
            headers['Authorization'] = 'Bearer ' + accessToken;

            try {
                let response = await fetch(url, {
                    method: 'GET',
                    headers: this.headers
                });

                let responseJson = await response.json();
                if (response.status >= 200 && response.status < 300) {
                    next(responseJson);
                }

                error(responseJson.error);

            } catch (err) {
                error('Something went wrong');
            }
        });
    }

    forgotPassword(email) {
        let url = ApiUrl + '/forgotpassword/' + email;
        return new Promise(async(next, error) => {
            let networkStatus = await Helpers.getNetworkStatus();
            let headers = this.headers;
            try {
                let response = await fetch(url, {
                    method: 'GET',
                    headers: this.headers
                });

                let responseJson = await response.json();

                console.log("forgotpassword", responseJson);
                if (response.status >= 200 && response.status < 300) {
                    next(responseJson);
                }

                error(responseJson.error);

            } catch (err) {
                error('Something went wrong');
            }
        });
    }

    getNextPofile(accessToken, memberID) {
        let url = ApiUrl + '/getnextprofile/' + memberID;
        return new Promise(async(next, error) => {
            let networkStatus = await Helpers.getNetworkStatus();
            let headers = this.headers;
            headers['Authorization'] = 'Bearer ' + accessToken;
            
            try {
                let response = await fetch(url, {
                    method: 'GET',
                    headers: this.headers
                });

                let responseJson = await response.json();
                if (response.status >= 200 && response.status < 300) {
                    next(responseJson);
                }

                error(responseJson.error);

            } catch (err) {
                error('Something went wrong');
            }
        });
    }


    activeMobile(accessToken) {
        let url = ApiUrl + '/activatemobile';
        return new Promise(async(next, error) => {
            let networkStatus = await Helpers.getNetworkStatus();
            let headers = this.headers;
            headers['Authorization'] = 'Bearer ' + accessToken;
            
            try {
                let response = await fetch(url, {
                    method: 'GET',
                    headers: this.headers
                });

                let responseJson = await response.json();
                if (response.status >= 200 && response.status < 300) {
                    next(responseJson);
                }

                error(responseJson.error);

            } catch (err) {
                error('Something went wrong');
            }
        });
    }

    
}

export default new ApiRequest();
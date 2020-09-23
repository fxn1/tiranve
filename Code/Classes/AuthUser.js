'use strict';

import React from 'react';

import {
    AsyncStorage
} from 'react-native';

var currentUser = null;

class AuthUser {

    get() {
        if(global.authUser) {
            return global.authUser;
        }
        return this.getUser();
    }

    async getUser() {

        try {
            this._authUser = await AsyncStorage.getItem('AUTH_USER');
            
            if (typeof this._authUser == 'string') {
                this._authUser = JSON.parse(this._authUser);
            }
            if (this._authUser.id) {
                currentUser = this._authUser;
                global.authUser = currentUser;
                return this._authUser;
            }
            return null;

        } catch (err) {
            return null;
        }
    }

    set(user) {
        global.authUser = user;
        this._authUser = JSON.stringify(user);
        currentUser = this._authUser;
        return new Promise((next, error) => {
            try {
                AsyncStorage.setItem('AUTH_USER', JSON.stringify(user));
                next(true);
            } catch (err) {
                error(err);
            }
        });
    }

    clear() {
        global['authUser'] = null;
        delete global['authUser'];
        this._authUser = null;
        AsyncStorage.removeItem('AUTH_USER');
    }

    can(permission) {
        if(global.authUser) {
            let userPermissions = global.authUser.permissions;
            return userPermissions && userPermissions.includes(permission);
        } 
    }
}

export default new AuthUser()
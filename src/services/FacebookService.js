import React from 'react';
import FBSDK from 'react-native-fbsdk';
import { Alert } from 'react-native';
const { LoginButton, GraphRequest, GraphRequestManager, LoginManager } = FBSDK;

class FacebookService {
  constructor() {
    this.requestManager = new GraphRequestManager();
  }

  async fetchProfile(callback) {
    return new Promise((resolve, reject) => {
      const request = new GraphRequest(
        '/me',
        {
          httpMethod: 'GET',
          version: 'v2.5',
          parameters: {
            fields: {
              string: 'email,name,first_name,last_name',
            },
          },
        },
        (error, result) => {
          if (result) {
            console.log(result);
            const profile = result;
            profile.avatar = `https://graph.facebook.com/${result.id}/picture`;
            resolve(profile);
          } else {
            console.log(error);
            reject(error);
          }
        },
      );

      this.requestManager.addRequest(request).start();
    });
  }

  async fetchToken(callback) {
    return new Promise((resolve, reject) => {
      const request = new GraphRequest('/me', null, (error, result) => {
        if (result) {
          const profile = result;
          profile.avatar = `https://graph.facebook.com/${result.id}/picture`;
          resolve(profile);
        } else {
          reject(error);
        }
      });

      this.requestManager.addRequest(request).start();
    });
  }
}

export const facebookService = new FacebookService();

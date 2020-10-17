import React from 'react';
import FBSDK from 'react-native-fbsdk';

const { GraphRequest, GraphRequestManager } = FBSDK;

class FacebookService {
  fetchProfile(callback) {
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
      callback,
    );

    new GraphRequestManager().addRequest(request).start();
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

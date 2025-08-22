import 'dotenv/config';


export default {
  "expo": {
    "name": "Command Pulse",
    "slug": "commandpulse",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "commandpulse",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.techfigures.commandpulse",
      "infoPlist": {
        "ITSAppUsesNonExemptEncryption": false
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/icon.png",
        "backgroundColor": "#ffffff"
      },
      "edgeToEdgeEnabled": true
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/icon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/loading-screen.png",
          "resizeMode": "cover",
          "backgroundColor": "#ffffff"
        }
      ],
      "expo-font"
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "router": {},
      "apiUrl": process.env.API_URL,
      "eas": {
        "projectId": "d13f7c9d-fb7a-4571-9ddf-c2b605fa840c"
      }
    },
    "owner": "milesevan"
  }
}

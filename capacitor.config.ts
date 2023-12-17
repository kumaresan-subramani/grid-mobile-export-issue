import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'test',
  webDir: 'dist/test',
  server: {
    androidScheme: 'https'
  }
};

export default config;

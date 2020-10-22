import Vue from 'vue';
import Vuetify from 'vuetify/lib';

export default new Vuetify({
  rtl: false,
  theme: {
    dark: false,
    themes: {
      dark: {
        primary: '#E57373',
        accent: '#FF4081',
        secondary: '#ffe18d',
        success: '#4CAF50',
        info: '#2196F3',
        warning: '#FB8C00',
        error: '#FF5252'
      },
      light: {
        primary: '#E8E8E0',
		// primary: '#C62828',
		// accent: '#F0F0F0',
		accent: '#C62828',
		secondary: '#30b1dc',
		// secondary: '#C62828',
        success: '#4CAF50',
        info: '#2196F3',
        warning: '#FB8C00',
        error: '#FF5252'
      }
    }
  }
});
Vue.use(Vuetify);



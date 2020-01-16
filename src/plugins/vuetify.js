import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import th from 'vuetify/es5/locale/th';
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
      locales: { th },
      current: 'th',
    },
  icons: {
    iconfont: 'mdi',
  },
});

import Vue from 'vue';
import Vuex from 'vuex';

import objects from './objects';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        objects,
    },
});
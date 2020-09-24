<template>
  <div id="app">
    <div class="main_button" @click="addObject">+</div>
    <card :objects="objects"></card>
  </div>
</template>

<script>

import Card from "@/components/Card";
export default {
  name: 'App',
  components: {
    Card
  },
  computed: {
    objects() {
      return this.$store.getters['objects/getObjects']
    }
  },
  methods: {
    addObject() {
      this.$store.commit('objects/ADD_NEW_OBJECT')
    },
  }
}
</script>

<style src="./assets/styles/app.scss" lang="scss" />

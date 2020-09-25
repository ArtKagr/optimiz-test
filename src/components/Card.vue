<template>
  <div>
    <div class="card_field" v-for="(object, key) in objects" :key="key">
      <div class="card">
        <div class="card-sector">
          <div v-if="object.selected && !object.indeterminate" @click="setStatus(false, object)" class="card-sector-access"></div>
          <div v-else-if="!object.selected && !object.indeterminate"  @click="setStatus(true, object)" class="card-sector-empty"></div>
          <div v-else-if="object.indeterminate" @click="setStatus(null, object)" class="card-sector-indeterminate"></div>
          <div>{{ object.title }}</div>
        </div>
        <div class="card-plus" @click="addChildObject(object)">+</div>
      </div>
      <card :objects="object.child" :child="true"></card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    objects: {
      type: Array,
      default: null
    },
    child: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    addChildObject(object) {
      this.$store.commit('objects/ADD_NEW_CHILD_OBJECT', object )
    },
    setStatus(status, object) {
      this.$store.commit('objects/SET_CHILD_STATUS', { status, object } )
    },
  },
}
</script>
<style src="../assets/styles/app.scss" lang="scss" />
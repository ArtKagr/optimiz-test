<template>
  <div>
    <div class="card_field" v-for="(object, key) in objects" :key="key">
      <div class="card">
        <div class="card-sector">
          <b-form-checkbox
              :indeterminate="object.indeterminate"
              @change="toggleAll($event, object)"
          >
          </b-form-checkbox>
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
    }
  },
  methods: {
    toggleAll(checked, object) {
      console.warn(checked)
      console.warn(object)
    },
    addChildObject(object) {
      this.$store.commit('objects/ADD_NEW_CHILD_OBJECT', object )
    }
  },
}
</script>
<style src="../assets/styles/app.scss" lang="scss" />
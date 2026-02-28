<template>
  <div class="container">
    <div class="side"></div>
    <div class="content d-flex flex-column">
      <v-select
        v-model="prefix"
        density="default"
        :items="['', 'my-favorites', 'old-programs']"
        hide-details
        label="prefix"
        persistent-placeholder
      />
      <v-sheet v-if="prefix">
        <v-list>
          <v-list-item
            v-for="(item, i) in urls"
            :key="i"
            :title="item.title"
            :href="item.href"
            target="_blank"
          />
        </v-list>
      </v-sheet>
    </div>
    <div class="side"></div>
  </div>
</template>

<script setup lang="ts">
const { prefix, urls } = storeToRefs(useContentsStore());
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: minmax(4px, 1fr) minmax(660px, 1200px) minmax(4px, 1fr);
  justify-content: center;
  width: 100%;
  overflow: auto;
}
</style>

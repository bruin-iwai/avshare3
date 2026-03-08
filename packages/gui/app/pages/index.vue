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
        <v-list class="d-flex flex-column">
          <v-lite-item v-for="item in contents" :key="item.key" :value="item.key">
            <div class="px-2 py-1">
              <span
                class="text-blue-600 underline cursor-pointer"
                @click="() => onClick(item.key)"
                >{{ item.title }}</span
              >
            </div>
          </v-lite-item>
        </v-list>
      </v-sheet>
    </div>
    <div class="side"></div>
  </div>
</template>

<script setup lang="ts">
const contentsStore = useContentsStore();
const { prefix, contents } = storeToRefs(contentsStore);
const { onClick } = contentsStore;
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

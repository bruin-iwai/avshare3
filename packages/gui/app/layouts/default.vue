<template>
  <div>
    <v-app>
      <v-app-bar>
        <v-app-bar-title>My favorite videos</v-app-bar-title>
        <template #append>
          <v-checkbox v-model="isDark" :label="themeLabel" />
        </template>
      </v-app-bar>
      <v-main>
        <slot />
        <LoadingIndicator />
      </v-main>
    </v-app>
  </div>
</template>

<script setup lang="ts">
const themeStore = useThemeStore();
const { isDark, themeLabel } = storeToRefs(themeStore);
</script>

<template>
  <v-app>
    <v-app-bar title="My favorite videos">
      <template #append>
        <v-checkbox v-model="isDark" :label="`${currentTheme} mode`" hide-details />
      </template>
    </v-app-bar>
    <v-main>
      <NuxtPage />
      <LoadingIndicator />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const { currentTheme, isDark } = storeToRefs(useThemeStore());
</script>

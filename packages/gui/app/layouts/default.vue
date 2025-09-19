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
        <LoadingIndicator>
          <v-progress-circular :size="70" :width="7" color="darkgray" indeterminate />
        </LoadingIndicator>
        <slot />
      </v-main>
    </v-app>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useThemeStore } from '~/stores/theme';
import { useTheme } from 'vuetify';

const themeStore = useThemeStore();
const { isDark, themeLabel } = storeToRefs(themeStore);

const theme = useTheme();
watch(
  isDark,
  (newValue) => {
    theme.global.name.value = newValue ? 'dark' : 'light';
  },
  { immediate: true },
);
</script>

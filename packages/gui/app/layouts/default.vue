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
        <Suspense>
          <slot />
          <template #fallback>
            <LoadingIndicator>
              <v-progress-circular :size="70" :width="7" color="darkgray" indeterminate />
            </LoadingIndicator>
          </template>
        </Suspense>
      </v-main>
    </v-app>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify';

const theme = useTheme();

const isDark = computed({
  get() {
    return theme.global.name.value === 'dark';
  },
  set(newValue) {
    theme.global.name.value = newValue ? 'dark' : 'light';
  },
});
const themeLabel = computed(() => (isDark.value ? 'dark mode' : 'light mode'));
</script>

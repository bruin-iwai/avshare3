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

const isDark = ref(true);
const themeLabel = computed(() => (isDark.value ? 'dark mode' : 'light mode'));
const theme = useTheme();

watchEffect(() => {
  theme.global.name.value = isDark.value ? 'dark' : 'light';
});
</script>

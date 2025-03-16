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
        <LoadingIndicator :show="showLoading">
          <v-progress-circular :size="70" :width="7" color="darkgray" indeterminate />
        </LoadingIndicator>
        <slot />
      </v-main>
    </v-app>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify';

const showLoading = useShowLoading();

const theme = useTheme();
const isDark = useDarkTheme();
const themeLabel = computed(() => (isDark.value ? 'dark mode' : 'light mode'));

watchEffect(() => {
  theme.global.name.value = isDark.value ? 'dark' : 'light';
});
</script>

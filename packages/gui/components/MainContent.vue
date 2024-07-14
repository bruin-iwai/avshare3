<template>
  <div>
    <LoadingIndicator :show="showLoading">
      <v-progress-circular :size="70" :width="7" color="darkgray" indeterminate />
    </LoadingIndicator>
    <v-container fluid>
      <v-row no-gutters>
        <v-col align-self="center">
          <v-select v-model="prefix" :items="['', 'my-favorites', 'old-programs']" label="prefix" />
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col align-self="center">
          <v-card v-if="prefix">
            <v-card-text>
              <v-list>
                <v-list-item v-for="(item, i) in urls" :key="i">
                  <v-list-item-title>
                    <a :href="item.url" target="_blank">{{ item.title }}</a>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
/* global ref, watchEffect, useFetch, useRuntimeConfig */
import type { UrlInfo } from '@avshare3/api/src/api/indexSchema';

// get config
const config = useRuntimeConfig();

// states
const prefix = ref('');
const urls = ref<UrlInfo[]>([]);
const showLoading = ref(false);

// watch effects
watchEffect(async () => {
  // guard condition
  if (!prefix.value) {
    return;
  }

  showLoading.value = true;
  try {
    const { data: result } = await useFetch<UrlInfo[]>('/contentsList', {
      baseURL: config.public.apiBase,
      query: {
        prefix: prefix.value,
      },
    });
    urls.value = result.value!;
  } finally {
    showLoading.value = false;
  }
});
</script>

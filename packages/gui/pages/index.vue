<template>
  <div>
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
import type { UrlInfoListType } from '@avshare3/api/src/types';

// get config
const config = useRuntimeConfig();

// states
const prefix = usePrefix();
const urls = useUrls();
const showLoading = useShowLoading();

// watch effects
watchEffect(async () => {
  // guard condition
  if (!prefix.value) {
    return;
  }

  showLoading.value = true;
  try {
    const { data: result } = await useFetch<UrlInfoListType>('/contentsList', {
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

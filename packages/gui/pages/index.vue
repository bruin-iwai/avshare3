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
import { useRootStore } from '~/stores';
import { storeToRefs } from 'pinia';

const rootStore = useRootStore();
const { prefix, urls } = storeToRefs(rootStore);
</script>

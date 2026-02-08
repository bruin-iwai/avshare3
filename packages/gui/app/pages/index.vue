<template>
  <div>
    <v-container fluid>
      <v-row no-gutters>
        <v-col align-self="center">
          <v-select v-model="prefix" :items="selectOptions" label="prefix" />
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
const contentsStore = useContentsStore();
const { prefix, urls, selectOptions } = storeToRefs(contentsStore);
</script>

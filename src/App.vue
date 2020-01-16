<template>
  <v-app>
    <navbar/>

    <v-content>
      <router-view/>
    </v-content>
    
  </v-app>
</template>

<script>
import navbar from "@/components/navbar";
export default {
  name: 'App',
  data: () => ({
    //
  }),
  components: {
    navbar
  }
};
</script>

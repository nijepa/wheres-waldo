<template>
  <div class="about">
    <h1>S C O R E S</h1>
    <Scores />
  </div>
</template>
<script>
  import Scores from '@/components/Scores.vue';

  export default {
    
    name: 'About',

    components: {
      Scores
    }
  }
</script>

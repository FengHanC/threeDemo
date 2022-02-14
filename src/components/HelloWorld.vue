<template>
    <div id="myScene"></div>
</template>

<script setup>
import Base3d from '../utils/Base3d.js';
import {reactive, onMounted} from 'vue';

const data = reactive({
  base3d: {},
});

onMounted(()=>{
  data.base3d = new Base3d('#myScene');
})


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

<template>
  <header>
    <h1>{{ title }}</h1>
  </header>
</template>

<script setup>
const { data } = await useFetch("/api/title");
const title = data.value.choices[0].message.content.replace(/"/g, "");
</script>

<style scoped>
header {
  margin-top: 100px;
}
h1 {
  text-align: center;
  max-width: 600px;
  margin: auto;
}
</style>

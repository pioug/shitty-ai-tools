<template>
  {{ choices }}
</template>

<script setup>
const { data } = await useFetch("/api/hello");
const choices = data.value.choices[0].message.content;
</script>

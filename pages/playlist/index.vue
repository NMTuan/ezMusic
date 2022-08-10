<template>
    <div>
        <PlayListItem v-for="item in player.list" :item="item" />
    </div>
</template>
<script setup>
const player = usePlayer()

</script>

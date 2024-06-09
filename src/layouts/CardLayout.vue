<template>
    <div>
        <span>Tarjeta</span>
        <div class="container">
            <UserCard v-for="(item, index) in props.content" :key="index" :content="item"/>
        </div>
    </div>
</template>

<script setup>
    import UserCard from '@/components/UserCard.vue';
    import { defineProps } from 'vue';

    const props = defineProps(["content"])

</script>

<style scoped>
.container {
    width: 100vw;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-wrap: wrap;
}
</style>
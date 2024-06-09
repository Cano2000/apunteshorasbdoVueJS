<template>
    <div>
        <div class="container">
            <!-- <UserList v-for="(item, index) in props.content" :key="index" :content="item"/> -->
            
        </div>
        <div class="container ">
        <div
            class="table-responsive"
        >
            <table
                class="table table-dark table-hover"
            >
                <thead>
                    <tr>
                        <th scope="">Nombre</th>
                        <th scope="">Número de horas</th>
                        <th scope="">Drop</th>
                        <th scope="">Fecha de cración</th>
                    </tr>
                </thead>
                <tbody>
                    <ZoneHours v-for="zone in props.content" :key="zone.id_zone" :content="zone"/>
                </tbody>
            </table>
        </div>
        
    </div>
        
    </div>
</template>

<script setup>
    import ZoneHours from '@/components/ZoneHours.vue';
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
    margin-top: 30px;
}
</style>
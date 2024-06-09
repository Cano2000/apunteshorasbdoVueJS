<template>
    <div class="searchFilter">
        <input type="text" placeholder="Filtrar" @keyup="handleFilter" v-model="search" class="form-control searchFilterInput">
    </div>
    <div v-if="search != ''" class="totalHours">
        <h3>Total de horas: {{ totalHours }}</h3>
    </div>
    <div>
        <component :is="layout" :content="filteredHours" @edit="loadAfterEdit"></component>
    </div>
</template>

<script setup>

    import { ref, defineAsyncComponent, onMounted } from 'vue';
    import { useAuth } from '@/store/auth'
    import { useRoute } from "vue-router"
    

    const TableLayout = defineAsyncComponent(() => import("@/layouts/TableLayout.vue"))
    let filteredHours = ref([])
    const layout = ref(TableLayout)
    const search = ref("")
    let totalHours = ref(0)

    const handleFilter = () => {
        filteredHours.value = hoursList.value.filter(item => item.user_name.toLowerCase().includes(search.value.toLowerCase()))
        calculateTotalHours()
    }
    
    let hoursList = ref([])
    let numberZone = ref(0)

    const store = useAuth()
    const route = useRoute()


    const loadAfterEdit = () => {
        hoursList.value = []
        filteredHours.value = []
        loadData()
    }
    
    const loadData = async () => {
        numberZone.value = route.params.id

        const responseHours = await store.getZone(numberZone.value)

        responseHours.data.forEach(async element => {
            await hoursList.value.push(element)
        });
        filteredHours.value = hoursList.value
    }

    onMounted(async () => {
        loadData()
    })

    const calculateTotalHours = () => {
        totalHours.value = 0
        filteredHours.value.forEach(element => {
            totalHours.value += element.num_hours
        });
    }

    

    
</script>

<style scoped>
.searchFilter {
    display: flex;
    justify-content: center;
}

.searchFilterInput {
    width: 30em;
}

.totalHours {
    margin-top: 10px;
    color: white;
}

</style>
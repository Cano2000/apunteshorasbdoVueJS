<template>
    <div class="container ">
        <div
            class="table-responsive"
        >
            <table
                class="table table-primary"
            >
                <thead>
                    <tr>
                        <th scope="col">Column 1</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="zone in zones" :key="zone.id_zone">
                        <td scope="">
                            <img class="zoneImg" src="../assets/DALL·E 2024-05-16 21.28.51 - Enhance the image of the forest creatures to include enormous, fearsome scythes. The creatures should still appear ghostly and shrouded in dark, tatte.webp" alt="">
                            <router-link :to="{name: 'zoneview', params:{id: zone.id_zone}}">
                                <span>
                                    {{ zone.name_zone }}
                                </span>
                            </router-link>
                            </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        
    </div>
</template>

<script setup>
    import { ref, onMounted } from "vue"
    import { useAuth } from '@/store/auth'
    
    let zones = ref([])

    const store = useAuth()

    onMounted(async () => {
        const response = await store.getZones()

        response.data.forEach(async element => {
            await zones.value.push(element)
        });
    })

</script>

<style scoped>

</style>
<template>
    <div class="containerZones">
        <div v-for="zone in zones" :key="zone.id_zone">
            <div class="zoneInfo">
                <router-link :to="{name: 'zoneview', params:{id: zone.id_zone}}" class="zoneLink">
                <img class="zoneImg" :src="zone.img_url" alt="">
                    <span>
                        {{ zone.name_zone }}
                    </span>
                </router-link>
            </div>
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
img.zoneImg {
    width: 320px;
    border-radius: 21em;
    border: 2px solid white;
    transition: width 0.3s ease; 
}

img.zoneImg:hover {
    width: 360px;
    
}

.containerZones {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 40px;
    margin-top: 40px;
}

a.zoneLink {
    text-decoration: none;
    color: white;
    font-size: 22px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
}

a.zoneLink:hover {

}
</style>
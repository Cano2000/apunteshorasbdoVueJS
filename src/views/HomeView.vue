<template>

  <div class="home">
    <div class="container containerButtons">
        <button type="button" class="btn btn-primary" @click="openModalNewZone">+ Añadir Zona</button>
        <button type="button" class="btn btn-primary" @click="openModalDrop">+ Añadir Drop</button>
        <button type="button" class="btn btn-primary" @click="openModalHour">+ Añadir hora</button>
    </div>
    <div class="hoursToken">
        <h3>
            Horas sin token: 
            <button type="button" class="btn btn-primary subHourToken" @click="useTokenStorage.decrement(1)">-</button>
            {{ useTokenStorage.hours }}
            <button type="button" class="btn btn-primary addHourToken" @click="useTokenStorage.increment(1)">+</button>
            <button type="button" class="btn btn-primary addHourToken" @click="useTokenStorage.reboot(0)">Reiniciar</button>
        </h3>
    </div>
    <ModalAdd ref="modalNewZone" @save="handleSaveNewZone" :title="'Añadir Zona'">
        <form ref="form" @submit.prevent="handleSubmitDrop">
            <label for="drop_name">Nombre</label>
            <input class="form-control" type="text" id="drop_name" v-model="zone_name" name="drop_name">
            <br>
            <label for="img_url">Url de la imagen</label>
            <input class="form-control" type="text" id="img_url" v-model="img_url_zone" name="img_url">
            <br>
            
        </form>
    </ModalAdd>
    <ModalAdd ref="modalDrop" @save="handleSaveDrop" :title="'Añadir Drop'">
        <form ref="form" @submit.prevent="handleSubmitDrop">
            <label for="zone">Zona de grindeo</label>
            <select class="form-select" aria-label="Default select example" id="zone" v-model="selectedZoneDrop" name="id_zone">
                <option v-for="zone in zones" :key="zone.id_zone" :value="zone.id_zone">{{ zone.name_zone }}</option>
            </select>
            <br>
            <label for="drop_name">Nombre</label>
            <input class="form-control" type="text" id="drop_name" v-model="drop_name" name="drop_name">
            <br>
            <label for="img_url">Url de la imagen</label>
            <input class="form-control" type="text" id="img_url" v-model="img_url" name="img_url">
            <br>
            
        </form>
    </ModalAdd>
    <ModalAdd ref="modalHour" @save="handleSave" :title="'Añadir Hora'">
        <form ref="form" @submit.prevent="handleSubmit">
            <label for="user">Usuario</label>
            <select class="form-select" aria-label="Default select example" id="user" name="id_user">
                <option v-for="user in users" :key="user.id_user" :value="user.id_user">{{ user.user_name }}</option>
            </select>
            <br>
            <label for="zone">Zona de grindeo</label>
            <select class="form-select" aria-label="Default select example" id="zone" v-model="selectedZone" @change="changeDropsByZone()" name="id_zone">
                <option v-for="zone in zones" :key="zone.id_zone" :value="zone.id_zone">{{ zone.name_zone }}</option>
            </select>
            <br>
            <label for="num_hours">Horas</label>
            <input class="form-control" type="number" id="hours" v-model="hours" name="num_hours">
            <br>
            <label for="">Drops de la zona</label>
            <div>
                <span v-for="drop in drops" :key="drop.id_drop" class="dropInfo">
                    <label for=""><img :src="drop.img_url" alt="">{{ drop.drop_name }}: </label>
                    <input class="form-control numberDrop" type="number" :name="'drop@' + drop.id_drop" value="0">
                </span>
            </div>
        </form>
    </ModalAdd>
    <ZonesList/>
</div>

</template>

<script setup>
// @ is an alias to /src
    import ZonesList from '@/components/ZonesList.vue';
    import { ref } from 'vue'
    import { useAuth } from '@/store/auth'
    import ModalAdd from '@/components/ModalAdd.vue';
    import { useToken } from '@/store/token';

    const useTokenStorage = useToken()

    const modalHour = ref(null);
    const modalDrop = ref(null);
    const modalNewZone = ref(null);
    let users = ref([])
    let zones = ref([])
    let drops = ref([])
    let hours = ref(1)
    const selectedZone = ref(1)
    const selectedZoneDrop = ref(1)
    const drop_name = ref("")
    const img_url = ref("")
    const zone_name = ref("")
    const img_url_zone = ref("")

    const store = useAuth()
    
    const openModalHour = async () => {
        users.value = []
        zones.value = []
        drops.value = []
        selectedZone.value = 1

        const responseUsers = await store.getUsers()
        responseUsers.data.forEach(async element => {
            
            await users.value.push(element)
        });


        const responseZones = await store.getZones()
        responseZones.data.forEach(async element => {
            await zones.value.push(element)
        });

        const responseDropsByZone = await store.getDropsByZone(selectedZone.value)
        responseDropsByZone.data.forEach(async element => {
            await drops.value.push(element)
        });

        modalHour.value.showModal();
    };

    const openModalDrop = async () => {
        zones.value = []
        drop_name.value = ""
        img_url.value = ""

        const responseZones = await store.getZones()
        responseZones.data.forEach(async element => {
            await zones.value.push(element)
        });

        modalDrop.value.showModal();
    };

    const openModalNewZone = async () => {
        zones.value = []
        drop_name.value = ""
        img_url.value = ""

        const responseZones = await store.getZones()
        responseZones.data.forEach(async element => {
            await zones.value.push(element)
        });

        modalNewZone.value.showModal();
    };
    const changeDropsByZone = async () => {
        drops.value = []
        const responseDropsByZone = await store.getDropsByZone(selectedZone.value)
        responseDropsByZone.data.forEach(async element => {
            await drops.value.push(element)
        });
    }
    const form = ref(null);
    const handleSave = async () => {
        if (form.value) {
            let data = Object.fromEntries(new FormData(form.value));
            console.log(data)

            const responseHours = await store.createHour(selectedZone.value, hours.value)
            
            if(responseHours.success) {
                const responseDropHours = await store.createDropHour(transformDrops(data, responseHours.data.id_hours))

                useTokenStorage.increment(parseInt(data.num_hours))
                console.log(responseDropHours)
            }

        }
    }

    function transformDrops(data, responseHours) {
        // Array para almacenar los objetos transformados
        const transformedArray = [];

        // Recorrer las propiedades del objeto JSON
        for (const key in data) {
            if (Object.hasOwn(data, key) && key.startsWith('drop@')) {
            // Extraer el id_drop de la key
            const id_drop = key.split('@')[1];
            // Extraer el drop_quantity del valor de la key
            const drop_quantity = data[key];

            // Crear un objeto con el formato especificado y añadirlo al array
            transformedArray.push({
                id_drop: parseInt(id_drop, 10),
                id_hours: responseHours,
                drop_quantity: parseInt(drop_quantity, 10)
            });
            }
        }

        return transformedArray;
    }

    const handleSaveDrop = async () => {
        const response = await store.createDrop(selectedZoneDrop.value, drop_name.value, img_url.value)

        if(response.success) {
            console.log(response.success)
        }
    }

    const handleSaveNewZone = async () => {
        const response = await store.createNewZone(zone_name.value, img_url_zone.value)

        if(response.success) {
            console.log(response.success)
        }
    }

    const handleSubmit = () => {
        handleSave()
    }
    const handleSubmitDrop = () => {
        handleSaveDrop()
    }
</script>

<style scoped>
span.dropInfo{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
}

input.numberDrop{
    width: 60px;
}

.containerButtons {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: center;
    gap: 40px;
}

.hoursToken {
    color: white;
    margin: 20px;
}

.addHourToken {
    background-color: green;
    border-color: green;
}

.subHourToken {
    background-color: red;
    border-color: red;
}

</style>

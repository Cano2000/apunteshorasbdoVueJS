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
                        <th scope="">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <ZoneHours v-for="zone in props.content" :key="zone.id_zone" :content="zone" @edit="handleEdit" @delete="handleDelete"/>
                </tbody>
            </table>
        </div>
        
    </div>
    <ModalAdd ref="modalHour" @save="handleEditHour" :title="'Añadir Hora'">
        <form ref="form" @submit.prevent="handleSubmit">
            <label for="user">Usuario</label>
            <select class="form-select" aria-label="Default select example" id="user" name="id_user" v-model="user">
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
                    <input class="form-control numberDrop" type="number" :name="'drop@' + drop.id_drop" :value="drop.drop_quantity">
                </span>
            </div>
        </form>
    </ModalAdd>
    <ModalAdd ref="modalDeleteDropHour" @save="handleDeleteDropHour" :title="'¿Estas seguro?'">
        
    </ModalAdd>
        
    </div>
</template>

<script setup>
    import ZoneHours from '@/components/ZoneHours.vue';
    import { defineProps, ref, defineEmits } from 'vue';
    import ModalAdd from '@/components/ModalAdd.vue';
    import { useAuth } from '@/store/auth'

    const emits = defineEmits(['edit'])

    const editHour = () => {
        emits('edit', props.content.id_hours, props.content.id_zone, props.content.num_hours, props.content.id_user)
    }

    const modalHour = ref(null);
    const modalDeleteDropHour = ref(null);
    let users = ref([])
    let zones = ref([])
    let drops = ref([])
    let user = ref(0)
    let selectedZone = ref([])
    let hours = ref(1)
    let idHour = ref(0)

    

    const props = defineProps(["content"])

    const store = useAuth()

    const openModalHour = async (id_hour,id_zone, num_hours, id_user) => {
        users.value = []
        zones.value = []
        drops.value = []
        console.log(id_hour,id_zone, num_hours, id_user)
        user.value = id_user
        idHour.value = id_hour
        selectedZone.value = id_zone
        hours.value = num_hours
        

        const responseUsers = await store.getUsers()
        responseUsers.data.forEach(async element => {
            
            await users.value.push(element)
        });


        const responseZones = await store.getZones()
        responseZones.data.forEach(async element => {
            await zones.value.push(element)
        });

        const responseDropsByZone = await store.getDropsByZone(selectedZone.value)
        const responseDropsHour = await store.getDropsHour(idHour.value)
        responseDropsByZone.data.forEach(async element => {
            let elementDrop = {}
            responseDropsHour.data.forEach(async element2 => {
                if(element.id_drop == element2.id_drop) {
                    elementDrop = {...element, drop_quantity: element2.drop_quantity}
                }
                
            })
            await drops.value.push(elementDrop)
        });


        

        modalHour.value.showModal();
    };

    const handleEdit = (id_hours, id_zone, num_hours, id_user) => {
        
        openModalHour(id_hours, id_zone, num_hours, id_user)
        
    }
    

    const changeDropsByZone = async () => {
        drops.value = []
        const responseDropsByZone = await store.getDropsByZone(selectedZone.value)
        responseDropsByZone.data.forEach(async element => {
            await drops.value.push(element)
        });
    }

    const form = ref(null);
    const handleEditHour = async () => {
        if (form.value) {
            let data = Object.fromEntries(new FormData(form.value));
            console.log(data)

            const responseHours = await store.editHour(idHour.value, selectedZone.value,user.value, hours.value)
            
            if(responseHours.success) {
                transformDrops(data, idHour.value).forEach(async element => {
                    console.log(element)
                    const responseDropHours = await store.editDropHour(element.id_drop, element.id_hours, element.drop_quantity)
                    console.log(responseDropHours)
                    editHour()
                });

                console.log("editado")
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

    const handleDelete = (id_hours) => {
        openModalDeleteDropHour(id_hours)
    }

    const openModalDeleteDropHour = async (id_hours) => {
        idHour.value = id_hours
        modalDeleteDropHour.value.showModal();
    };

    const handleDeleteDropHour = async () => {
        const responseDropHours = await store.deleteHour(idHour.value)
        console.log(responseDropHours)
        editHour()
    }

    

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
</style>
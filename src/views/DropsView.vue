<template>
    <div>
        <div class="container ">
            <div class="table-responsive">
                <table class="table table-dark table-hover">
                    <thead>
                        <tr>
                            <th scope="">Zona</th>
                            <th scope="">Drop</th>
                            <th scope="">Creado</th>
                            <th scope="">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <DropList v-for="drop in dropsList" :key="drop.id_drop" :content="drop" @edit="handleEdit" @delete="handleDelete"/>
                    </tbody>
                </table>
            </div>
        </div>
        <ModalAdd ref="modalEditForm" @save="handleSaveEditDrop" :title="'Editar drop'">
            <form ref="form" @submit.prevent="handleSubmitEditDrop">
                <label for="zone">Zona de grindeo</label>
                <select class="form-select" aria-label="Default select example" id="zone" v-model="selectedZoneDrop" name="id_zone">
                    <option v-for="zone in zones" :key="zone.id_zone" :value="zone.id_zone">{{ zone.name_zone }}</option>
                </select>
                <br>
                <label for="drop_name">Nombre</label>
                <input class="form-control" type="text" id="drop_name" v-model="dropName" name="drop_name">
                <br>
                <label for="img_url">Url de la imagen</label>
                <input class="form-control" type="text" id="img_url" v-model="imgUrl" name="img_url">
                <br>
            
            </form>
        </ModalAdd>
        <ModalAdd ref="modalDeleteForm" @save="handleDeleteDrop" :title="'¿Seguro que quieres eliminar el drop?'">
            <form ref="form" @submit.prevent="handleSubmitDeleteDrop">           
            </form>
        </ModalAdd>
    </div>
</template>

<script setup>
    import DropList from '@/components/DropList.vue';
    import ModalAdd from '@/components/ModalAdd.vue';

    import { ref, onMounted } from 'vue';
    import { useAuth } from '@/store/auth'
    
    let dropsList = ref([])
    const modalEditForm = ref(null);
    const modalDeleteForm = ref(null);
    let zones = ref([])
    let selectedZoneDrop = ref(1)
    let dropName = ref("")
    let imgUrl = ref("")
    let idDrop = ref(0)

    const store = useAuth()

    onMounted(async () => loadData())

    const loadData = async () => {
        dropsList.value = []
        const responseDrops = await store.getDrops()

        responseDrops.data.forEach(async element => {
            await dropsList.value.push(element)
        });
    }

    const openModalDrop = async (id_drop, id_zone, name_drop, img_url) => {

        zones.value = []
        idDrop.value = id_drop
        selectedZoneDrop.value = id_zone
        dropName.value = name_drop
        imgUrl.value = img_url

        const responseZones = await store.getZones()
        responseZones.data.forEach(async element => {
            await zones.value.push(element)
        });
        
        modalEditForm.value.showModal();
    };
    const openModalDeleteDrop = async (id_drop) => {
        idDrop.value = id_drop
        modalDeleteForm.value.showModal();
    };

    const handleEdit = (id_drop, id_zone, name_drop, img_url) => {
        openModalDrop(id_drop, id_zone, name_drop, img_url)
    }

    const handleDelete = (id_drop) => {
        openModalDeleteDrop(id_drop)
    }

    const handleSaveEditDrop = async () => {
        const response = await store.editDrop(idDrop.value, selectedZoneDrop.value, dropName.value, imgUrl.value)

        if(response.success) {
            loadData()
        }
    }

    const handleDeleteDrop = async () => {
        const response = await store.deletedrop(idDrop.value)

        if(response.success) {
            loadData()
        }
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

.searchFilter {
    display: flex;
    justify-content: center;
}

.searchFilterInput {
    width: 30em;
}
</style>
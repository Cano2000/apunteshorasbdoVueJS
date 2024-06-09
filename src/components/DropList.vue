<template>
    <tr>
        <td scope="">
            {{ props.content.Zone.name_zone }}
        </td>
        <td scope="">
            <img :src="props.content.img_url" alt=""/>{{ props.content.drop_name }}
        </td>
        <td scope="">
            {{ formatearFecha(props.content.createdAt) }}
        </td>
        <td>
            <div class="actionIcons">
                <img src="icons8-editar-50.png" alt="Editar" class="actionIcon" @click="editDrop">
                <img src="icons8-trash-can-50.png" alt="Eliminar" class="actionIcon" @click="deleteDrop">
            </div>
        </td>
    </tr>
</template>

<script setup>
    // import ZoneHours from '@/components/ZoneHours.vue';
    import { defineProps, defineEmits  } from 'vue';

    const props = defineProps(["content"])

    const emits = defineEmits(['edit', 'delete'])

    function formatearFecha(fechaOriginal) {

        // Convertir la fecha a un objeto Date de JavaScript
        const fecha = new Date(fechaOriginal);
        // Obtener los componentes de la fecha
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Mes es 0-indexado, por lo que se le suma 1
        const año = fecha.getFullYear();
        const hora = fecha.getHours().toString().padStart(2, '0');
        const minutos = fecha.getMinutes().toString().padStart(2, '0');

        // Construir el string de fecha en el formato deseado
        return `${dia}/${mes}/${año} ${hora}:${minutos}`;
    }

    const editDrop = () => {
        emits('edit', props.content.id_drop, props.content.id_zone, props.content.drop_name, props.content.img_url)
    }

    const deleteDrop = () => {
        emits('delete', props.content.id_drop)
    }

</script>

<style scoped>
th, td {
    text-align: center; /* Centrado horizontal */
    vertical-align: middle; /* Centrado vertical */
    padding: 10px; /* Espacio dentro de las celdas */
}
img.actionIcon {
    width: 40px;
}

img.actionIcon:hover {
    cursor: pointer;
}

.actionIcons {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-content: center;
    justify-content: center;
    gap: 20px;
    margin: 10px;
}
</style>
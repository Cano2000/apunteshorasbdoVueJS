<template>
    <div ref="modal" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
            <button type="button" class="btn-close" @click="hideModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="hideModal">Cerrar</button>
            <button type="button" class="btn btn-primary" @click="saveModal">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { Modal } from 'bootstrap';
  
  export default {
    name: 'ModalAdd',
    emits: ['save'],
    props: {
        title: {
            type: String,
            required: true
        }
    },
    setup(_, { emit }) {
      const modal = ref(null);
      let bootstrapModal = null;
  
      const showModal = () => {
        if (bootstrapModal) {
          bootstrapModal.show();
        }
      };
  
      const hideModal = () => {
        if (bootstrapModal) {
          bootstrapModal.hide();
        }
      };

      const saveModal = () => {
        emit('save');
        hideModal();
      }
  
      onMounted(() => {
        if (modal.value) {
          bootstrapModal = new Modal(modal.value);
        }
      });
  
      onUnmounted(() => {
        if (bootstrapModal) {
          bootstrapModal.dispose();
        }
      });
  
      return {
        modal,
        showModal,
        hideModal,
        saveModal
      };
    }
  };
  </script>
  
  <style scoped>
  /* Puedes agregar estilos personalizados aquí */
  </style>
  
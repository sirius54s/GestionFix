import { defineStore } from 'pinia';
import type { Component } from 'vue';

export const useModalStore = defineStore('modal', {
  state: () => ({
    modalVisible: false, // Estado para mostrar/ocultar el modal
    activeModalComponent: null as Component | null, // Componente activo que se renderizará
  }),
  actions: {
    openModal(modalComponent: Component) {
      this.activeModalComponent = modalComponent;
      this.modalVisible = true;
    },
    closeModal() {
      this.modalVisible = false;
      this.activeModalComponent = null;
    },
  },
});

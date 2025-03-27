<script setup lang="ts">
import { ref } from 'vue';
import type { Component } from 'vue';
import { useModalStore } from 'src/stores/modalStore';

// Importa tus componentes modales específicos
import AgregarReparacionModal from 'src/components/addRepair.vue';
import AdditionalFunctionsModal from 'src/components/AdditionalFunctionsModal.vue';

// Array de funciones iniciales
const funcionesIniciales = [
  'Agregar reparación',
  'Actualizar estado de reparación',
  'Consultar historial de reparaciones',
  'Agregar producto al inventario',
  'Ver más...',
];

// Instancia del store de modales
const modalStore = useModalStore();

// Lista reactiva local para las funciones de servicio técnico (iniciales)
const funcionesServicioTecnico = ref<string[]>([...funcionesIniciales]);

// Mapeo de función a su componente modal (para las funciones individuales)
const modalMap: Record<string, Component> = {
  'Agregar reparación': AgregarReparacionModal,
};

function handleFuncionClick(funcion: string) {
  if (funcion === 'Ver más...') {
    // Abre el modal de funciones adicionales sin pasar props.
    modalStore.openModal(AdditionalFunctionsModal);
  } else if (modalMap[funcion]) {
    modalStore.openModal(modalMap[funcion]);
  } else {
    console.log(`Acción ejecutada q: ${funcion}`);
  }
}
</script>

<template>
  <div>
    <!-- Cuadrícula de funciones iniciales -->
    <div class="q-pa-md row justify-center items-center">
      <div
        v-for="(funcion, index) in funcionesServicioTecnico"
        :key="index"
        class="bg-white q-ma-sm text-dark rounded-borders shadow-2 cursor-pointer text-center flex flex-center q-gutter-sm box"
        @click="handleFuncionClick(funcion)"
      >
        {{ funcion }}
      </div>
    </div>

    <!-- Modal dinámico controlado por Pinia -->
    <q-dialog v-model="modalStore.modalVisible">
      <component :is="modalStore.activeModalComponent" @close="modalStore.closeModal" />
    </q-dialog>
  </div>
</template>

<style lang="sass" scoped>
/* Estilos para la cuadrícula de funciones */
.box
  width: 150px
  height: 90px
  user-select: none
  transition: transform 0.2s ease-in-out
  &:hover
    transform: scale(1.05)
</style>

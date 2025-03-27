<script setup lang="ts">
import { ref } from 'vue';

const funcionesAdicionales = ref([
  'Eliminar reparación',
  'Asignar técnico',
  'Generar reporte',
  'Imprimir reparación',
  'Historial de cambios',
  'Reprogramar visita',
  'Enviar notificación',
  'Exportar datos',
]);
</script>

<template>
  <q-card class="q--md">
    <q-bar class="q-pa-none q-ma-none">
      <q-icon name="arrow_forward" />
      <div>Funciones Adicionales:</div>
      <q-space />
      <q-btn class="q-mr-md" dense flat icon="close" v-close-popup @click="$emit('close')">
        <q-tooltip>Close</q-tooltip>
      </q-btn>
    </q-bar>

    <!-- Sección de contenido adicional -->
    <q-card-section class="content-section">
      <p class="text-center text-body2">Seleccione la función deseada para continuar.</p>
    </q-card-section>

    <!-- Sección de contenido con la cuadrícula de funciones -->
    <q-card-section class="q-pt-none">
      <div class="row q-col-gutter-md q-pb-xl">
        <div v-for="(funcion, idx) in funcionesAdicionales" :key="idx" class="col-12">
          <q-btn flat class="full-width" :label="funcion" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style lang="sass" scoped></style>

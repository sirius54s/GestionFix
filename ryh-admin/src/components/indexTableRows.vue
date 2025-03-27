<script setup lang="ts">
import { ref } from 'vue';

interface Repair {
  id: number;
  modelo: string;
  estado: string;
  fecha: string;
  descripcion: string;
  nombreCliente: string;
  telefono: string;
  notaDetalles: string;
  tecnicoAsignado: string;
  tipoServicio: string;
  costoEstimado: number;
  fechaEntrega?: string;
}

const repairRows = ref<Repair[]>([
  {
    id: 8,
    modelo: 'Motorola G7',
    estado: 'Pendiente',
    fecha: '2023-10-03',
    descripcion: 'Diagnóstico en proceso para falla de cámara.',
    nombreCliente: 'Joel Martínez',
    telefono: '+56 9 1234 5678',
    notaDetalles: 'Cliente solicita revisión urgente antes del viernes.',
    tecnicoAsignado: 'Carlos López',
    tipoServicio: 'Reparación de hardware',
    costoEstimado: 35000,
    fechaEntrega: '2023-10-06',
  },
  {
    id: 8,
    modelo: 'Motorola G7',
    estado: 'Pendiente',
    fecha: '2023-10-03',
    descripcion: 'Diagnóstico en proceso para falla de cámara.',
    nombreCliente: 'Joel Martínez',
    telefono: '+56 9 1234 5678',
    notaDetalles: 'Cliente solicita revisión urgente antes del viernes.',
    tecnicoAsignado: 'Carlos López',
    tipoServicio: 'Reparación de hardware',
    costoEstimado: 35000,
    fechaEntrega: '2023-10-06',
  },
  {
    id: 8,
    modelo: 'Motorola G7',
    estado: 'Pendiente',
    fecha: '2023-10-03',
    descripcion: 'Diagnóstico en proceso para falla de cámara.',
    nombreCliente: 'Joel Martínez',
    telefono: '+56 9 1234 5678',
    notaDetalles: 'Cliente solicita revisión urgente antes del viernes.',
    tecnicoAsignado: 'Carlos López',
    tipoServicio: 'Reparación de hardware',
    costoEstimado: 35000,
    fechaEntrega: '2023-10-06',
  },
  {
    id: 8,
    modelo: 'Motorola G7',
    estado: 'Pendiente',
    fecha: '2023-10-03',
    descripcion: 'Diagnóstico en proceso para falla de cámara.',
    nombreCliente: 'Joel Martínez',
    telefono: '+56 9 1234 5678',
    notaDetalles: 'Cliente solicita revisión urgente antes del viernes.',
    tecnicoAsignado: 'Carlos López',
    tipoServicio: 'Reparación de hardware',
    costoEstimado: 35000,
    fechaEntrega: '2023-10-06',
  },
  {
    id: 8,
    modelo: 'Motorola G7',
    estado: 'Pendiente',
    fecha: '2023-10-03',
    descripcion: 'Diagnóstico en proceso para falla de cámara.',
    nombreCliente: 'Joel Martínez',
    telefono: '+56 9 1234 5678',
    notaDetalles: 'Cliente solicita revisión urgente antes del viernes.',
    tecnicoAsignado: 'Carlos López',
    tipoServicio: 'Reparación de hardware',
    costoEstimado: 35000,
    fechaEntrega: '2023-10-06',
  },
  {
    id: 8,
    modelo: 'Motorola G7',
    estado: 'Pendiente',
    fecha: '2023-10-03',
    descripcion: 'Diagnóstico en proceso para falla de cámara.',
    nombreCliente: 'Joel Martínez',
    telefono: '+56 9 1234 5678',
    notaDetalles: 'Cliente solicita revisión urgente antes del viernes.',
    tecnicoAsignado: 'Carlos López',
    tipoServicio: 'Reparación de hardware',
    costoEstimado: 35000,
    fechaEntrega: '2023-10-06',
  },
  {
    id: 8,
    modelo: 'Motorola G7',
    estado: 'Pendiente',
    fecha: '2023-10-03',
    descripcion: 'Diagnóstico en proceso para falla de cámara.',
    nombreCliente: 'Joel Martínez',
    telefono: '+56 9 1234 5678',
    notaDetalles: 'Cliente solicita revisión urgente antes del viernes.',
    tecnicoAsignado: 'Carlos López',
    tipoServicio: 'Reparación de hardware',
    costoEstimado: 35000,
    fechaEntrega: '2023-10-06',
  },
]);

interface Column {
  name: string;
  label: string;
  align: 'left' | 'center' | 'right';
  field: string;
  sortable?: boolean;
}

const repairColumns: Column[] = [
  { name: 'id', label: 'ID', align: 'left', field: 'id', sortable: true },
  { name: 'modelo', label: 'Modelo', align: 'left', field: 'modelo', sortable: true },
  { name: 'estado', label: 'Estado', align: 'center', field: 'estado', sortable: true },
  { name: 'fecha', label: 'Fecha', align: 'center', field: 'fecha', sortable: true },
  { name: 'descripcion', label: 'Descripción', align: 'left', field: 'descripcion' },
  {
    name: 'acciones',
    label: 'Acciones',
    align: 'center',
    field: '',
    sortable: false,
  },
];

const initialPagination = ref({
  page: 1,
  rowsPerPage: 6,
});

function marcarComoListo(id: number) {
  console.log(`La reparación con ID ${id} ha sido marcada como lista.`);
  // Implementa la lógica para actualizar el estado de la reparación.
}

function mostrarOpciones(row: Repair) {
  console.log('Opciones para:', row);
  // Implementa aquí el despliegue de más acciones, por ejemplo, mediante otro modal.
}
</script>

<template>
  <div class="q-pa-md fixed-table-container">
    <q-table
      class="my-sticky-header-last-column-table"
      flat
      virtual-scroll
      :virtual-scroll-sticky-size-start="10"
      bordered
      title="Reparaciones: 12 de octubre"
      :rows="repairRows"
      :columns="repairColumns"
      row-key="id"
      :pagination="initialPagination"
    >
      <!-- Slot para la columna "Acciones" -->
      <template v-slot:body-cell-acciones="props">
        <q-btn label="Listo" color="green" size="sm" @click="marcarComoListo(props.row.id)" />
        <q-btn
          round
          dense
          flat
          icon="more_vert"
          color="secondary"
          @click="mostrarOpciones(props.row)"
        />
      </template>
    </q-table>
  </div>
</template>

<style lang="sass" scoped></style>

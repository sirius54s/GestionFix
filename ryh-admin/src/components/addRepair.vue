<script setup lang="ts">
import { reactive, computed } from 'vue';

// Opciones para el técnico asignado
const tecnicos = [
  { label: 'Yoel', value: 'Yoel' },
  { label: 'Miguel', value: 'Miguel' },
  { label: 'No especificar', value: 'No especificar' },
];

// Opciones para el Estado
const estadoOptions = [
  { label: 'Listo', value: 'Listo' },
  { label: 'Cancelado', value: 'Cancelado' },
  { label: 'Pendiente', value: 'Pendiente' },
];

// El formulario inicia con campos vacíos y el ID se genera automáticamente.
// Se agrega un único campo booleano 'imprimirBoleta', preseleccionado por defecto.
const formData = reactive({
  id: Math.floor(Date.now() * Math.random()).toString(),
  modelo: '',
  estado: 'Pendiente', // Se usará para el estado
  marca: '', // Nuevo campo para la marca
  fecha: '',
  // Usamos este campo para "Tipo de reparación"
  tipoServicio: '',
  costoEstimado: '',
  fechaEntrega: '',
  tecnicoAsignado: '',
  nombreCliente: '',
  telefono: '',
  notaDetalles: '',
  imprimirBoleta: true,
});

// Propiedad computada para formatear el costo con separador de miles (punto)
const formattedCosto = computed({
  get() {
    if (!formData.costoEstimado) return '';
    const num = Number(formData.costoEstimado);
    return new Intl.NumberFormat('es-CL').format(num);
  },
  set(value: string) {
    const cleaned = value.toString().replace(/\D/g, '');
    formData.costoEstimado = cleaned;
  },
});

const submitForm = () => {
  console.log('Datos enviados:', formData);
  // Aquí puedes agregar la lógica para enviar el formulario al backend.
};
</script>

<template>
  <q-card class="q--md">
    <!-- Encabezado -->
    <q-bar class="q-pa-xs">
      <q-icon name="arrow_forward" />
      <div>Agregar un nuevo registro:</div>
      <q-space />
      <q-btn dense flat round icon="close" v-close-popup @click="$emit('close')">
        <q-tooltip>Close</q-tooltip>
      </q-btn>
    </q-bar>

    <q-separator />

    <!-- Formulario en dos columnas horizontales -->
    <q-card-section class="q-pa-md">
      <q-form @submit.prevent="submitForm">
        <div class="row q-col-gutter-md">
          <!-- Columna Izquierda: Datos del Servicio -->
          <div class="col-12 col-md-6">
            <div class="section-header">Servicio</div>
            <!-- Row: ID y Modelo -->
            <div class="row q-col-gutter-sm">
              <div class="col-6">
                <q-input filled dense v-model="formData.id" label="ID" disable class="q-mb-sm" />
              </div>
              <div class="col-6">
                <q-input filled dense v-model="formData.modelo" label="Modelo" class="q-mb-sm" />
              </div>
            </div>
            <!-- Row: Marca y Estado -->
            <div class="row q-col-gutter-sm">
              <div class="col-6">
                <q-input filled dense v-model="formData.marca" label="Marca" class="q-mb-sm" />
              </div>
              <div class="col-6">
                <q-select
                  filled
                  dense
                  v-model="formData.estado"
                  label="Estado"
                  :options="estadoOptions"
                  class="q-mb-sm"
                />
              </div>
            </div>
            <!-- Row: Fecha y Tipo de reparación -->
            <div class="row q-col-gutter-sm">
              <div class="col-6">
                <q-input
                  filled
                  dense
                  v-model="formData.fecha"
                  label="Fecha"
                  type="date"
                  class="q-mb-sm"
                />
              </div>
              <div class="col-6">
                <q-input
                  filled
                  dense
                  v-model="formData.tipoServicio"
                  label="Tipo de reparación"
                  class="q-mb-sm"
                />
              </div>
            </div>
            <!-- Row: Costo y Entrega -->
            <div class="row q-col-gutter-sm">
              <div class="col-6">
                <q-input
                  filled
                  dense
                  v-model="formattedCosto"
                  label="Costo (CLP)"
                  type="text"
                  prefix="$"
                  class="q-mb-sm"
                />
              </div>
              <div class="col-6">
                <q-input
                  filled
                  dense
                  v-model="formData.fechaEntrega"
                  label="Entrega"
                  type="date"
                  class="q-mb-sm"
                />
              </div>
            </div>
            <!-- Row: Técnico (ocupa toda la fila) -->
            <div class="row q-col-gutter-sm">
              <div class="col-12">
                <q-select
                  filled
                  dense
                  v-model="formData.tecnicoAsignado"
                  label="Técnico"
                  :options="tecnicos"
                  class="q-mb-sm"
                />
              </div>
            </div>
          </div>

          <!-- Columna Derecha: Datos del Cliente -->
          <div class="col-12 col-md-6">
            <div class="section-header">Cliente</div>
            <q-input filled dense v-model="formData.nombreCliente" label="Nombre" class="q-mb-sm" />
            <q-input
              filled
              dense
              v-model="formData.telefono"
              label="Teléfono"
              type="tel"
              prefix="+56"
              class="q-mb-sm"
            />
            <q-input
              filled
              dense
              v-model="formData.notaDetalles"
              label="Notas"
              type="textarea"
              autogrow
              class="q-mb-sm"
            />
            <q-checkbox
              filled
              dense
              v-model="formData.imprimirBoleta"
              label="Imprimir boleta"
              class="q-mb-sm"
            />
          </div>
        </div>

        <!-- Botón de Envío -->
        <div class="row q-mt-md">
          <div class="col-12">
            <q-btn label="Enviar" type="submit" color="primary" class="full-width" />
          </div>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<style scoped lang="sass">
.full-width
  width: 100%

.section-header
  font-weight: bold
  font-size: 1.1rem
  margin-bottom: 8px
  color: var(--q-color-primary)
</style>

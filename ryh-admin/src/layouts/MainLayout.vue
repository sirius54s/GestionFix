<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-white text-black">
        <q-toolbar-title> GestionFix v{{ $q.version }} </q-toolbar-title>
        <q-btn flat dense round icon="settings" aria-label="Menu" />
        <q-btn flat dense round icon="search" aria-label="Search" />
        <q-btn flat dense round icon="more_vert" aria-label="More" />
      </q-toolbar>
    </q-header>
    <q-page-container class="bg-white">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts"></script>

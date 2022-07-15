<script setup>
import NavBar from './components/partials/NavBar.vue';
import FooterBar from './components/partials/FooterBar.vue';
</script>

<template>
    <div>
        <NavBar />
        <router-view />
        <FooterBar />
    </div>
</template>

<style>
html,
body {
    background: #d9d5d5;
}

.bg-light {
    background-color: gray !important;
}
</style>

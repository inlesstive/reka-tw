<script lang="ts" setup>
import Banner from "../components/Banner.vue";
import Catalog from "../components/Catalog.vue";
import Modal from "../components/Form/Modal.vue";
import { useAuthStore } from "../store/auth";
import { login } from "../auth/login";
import { check } from "../auth/check";
import { ref } from "vue";

const store = useAuthStore()

check()

// check()
</script>

<template>
    <div class="wrapper">
        <Banner />
        <Catalog />
        <Modal v-if="!store.isLogging" />
    </div>
</template>

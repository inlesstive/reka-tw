<script lang="ts" setup>
import { ref, watch } from "vue";
import Swal from "sweetalert2";
import { login } from "../../auth/login";

const telephone = ref();
const password = ref();
const handleSubmit = async () => {
    const requestData = {
        phone: telephone.value,
        password: password.value,
    };

    try {
        const success = await login(requestData);

        if (success) {
            Swal.fire({
                title: "Success!",
                text: "Login successful",
                icon: "success",
                confirmButtonText: "OK",
            });
        } else {
            Swal.fire({
                title: "Error!",
                text: "Login failed. Do you want to continue?",
                icon: "error",
                confirmButtonText: "Cool",
            });
        }
    } catch (error) {
        // Handle errors from the login function if needed
        console.error("Login error:", error);
        Swal.fire({
            title: "Error!",
            text: "An error occurred during login.",
            icon: "error",
            confirmButtonText: "OK",
        });
    }
};
</script>

<template>
    <div class="wrapper">
        <form class="form__block">
            <input
                type="tel"
                v-model="telephone"
                placeholder="+7 (123) 123-123-2332"
            />
            <input type="password" v-model="password" placeholder="Пароль" />
            <button @click.prevent="handleSubmit">Submit</button>
        </form>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(102, 112, 128, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.form {
    &__block {
        position: absolute;
        justify-content: center;
        padding: 35px;
        border-radius: 10px;
        background: #fff;
        box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.1);
        z-index: 5;
        gap: 10px;
        display: flex;
        flex-direction: column;

        & input {
            display: flex;
            width: 350px;
            padding: 12px 16px;
            flex-direction: column;
            align-items: flex-start;
            border-radius: 10px;
            border: 2px solid var(--Secondary, #eef1f4);
            background: rgba(238, 241, 244, 0.5);
            outline: none;
        }
        & button {
            border-radius: 10px;
            border: 1px solid rgba(238, 241, 244, 0.5);
            background: rgba(238, 241, 244, 0.5);
            display: flex;
            padding: 12px 16px;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10px;
            cursor: pointer;
        }
    }
}
</style>

<script lang="ts" setup></script>

<template>
    <div class="banner">
        <div class="banner__block">
            <h1>Все категории</h1>
            <p>
                Рыбатекст используется дизайнерами, проектировщиками и
                фронтендерами, когда нужно быстро заполнить макеты или прототипы
                содержимым.
            </p>
        </div>
        <div class="banner__block">
            <img src="../assets/img/placeholder.svg" alt="" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.banner {
    margin-top: 20px;
    width: 100%;
    background: #f1f5f8;
    padding: 80px 0;
    display: flex;
    justify-content: center;
    gap: 300px;
    align-items: center;
    &__block {
        display: flex;
        flex-direction: column;
        gap: 20px;
        & h1 {
            color: var(--secondary-80);
            font-size: 30px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            letter-spacing: -0.6px;
        }
        & p {
            color: var(--gray-70);
            font-family: Inter;
            font-size: 15px;
            font-style: normal;
            font-weight: 400;
            line-height: 22px; /* 146.667% */
            max-width: 440px;
        }
    }
}
</style>

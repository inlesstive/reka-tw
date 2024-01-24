<script lang="ts" setup>
import cardPlaceholder from "./icons/cardPlaceholder.vue";

import { useCartStore } from "../store/cart";

const store = useCartStore()

console.log(store.cart);


const props = defineProps({
    item: Object,
});


</script>

<template>
    <div class="card">
        <div class="card__img">
            <div class="card__img-tags">
                <div class="card__img-tags-item" v-for="tags in item.tags">{{ tags }}</div>
            </div>

            <div class="card__img-placeholder">
                <cardPlaceholder />
            </div>
        </div>
        <div class="card__bottom">
            <div class="card__price">
                <p class="card__price-now">{{ item.price }} ₽</p>
                <del class="card__price-old">{{ item.price_old }} </del>
            </div>
            <p class="card__title">{{item.title}}</p>
            <button @click="store.addCart(item)" class="card__button">Добавить в корзину</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card {
    width: 315px;
    &__bottom {
        padding: 15px 20px 20px 20px;
        display: flex;
        flex-direction: column;
    }

    &__button {
        display: inline-flex;
        padding: 10px 0;
        justify-content: center;
        align-items: center;
        text-align: center;
        width: -webkit-fill-available;
        border-radius: 7px;
        color: #fff;
        outline: none;
        border: none;
        cursor: pointer;
        background: rgba(102, 112, 128, 0.85);
        margin-top: 20px;
    }

    &__title {
        color: var(--min-gray);
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 142.857% */
        margin-top: 5px;
    }

    &__price-now {
        color: var(--min-gray);
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px; /* 125% */
    }

    &__img {
        position: relative;

        &-tags {
            position: absolute;
            right: 0;
            padding: 10px;
            display: flex;
            gap: 2px;

            &-item {
                display: inline-flex;
                padding: 0px 3px;
                justify-content: center;
                align-items: center;
                gap: 10px;
                border-radius: 4px;
                background: #fff;
                color: var(--gray-70);
            }
        }
        &-placeholder {
            width: 315px;
            height: 315px;
            flex-shrink: 0;

            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 10px;
            background: #f1f5f8;
        }
    }
}
</style>

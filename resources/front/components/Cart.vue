<script lang="ts" setup>
import backIcon from "../components/icons/backIcon.vue";
import cardPlaceholder from "./icons/cardPlaceholder.vue";
import plusIcon from "./icons/plusIcon.vue";
import minusIcon from "./icons/minusIcon.vue";
import exitIcon from "./icons/exitIcon.vue";
import { useCartStore } from "../store/cart";
import { ref } from "vue";
import Swal from "sweetalert2";

const store = useCartStore();

const selectedItem = ref([]);

const decreaseCartItem = (item) => {
    if (item.count > 1) {
        item.count--;
    }
};

const alertSub = () => {
    Swal.fire({
        title: "Success!",
        text: "Login successful",
        icon: "success",
        confirmButtonText: "OK",
    });
};

const del = () => {
    selectedItem.value.forEach((cartId) => {
        store.removeCartItem(cartId);
    });
};

const incrementCartItem = (item) => {
    item.count++;
};
</script>

<template>
    <div class="cart">
        <div class="cart__back-shop">
            <backIcon />
            <span class="cart__back-shop-text"> Вернуться к покупкам </span>
        </div>
        <div class="cart__item-block">
            <div class="cart__item-block-title">
                <p>Корзина</p>
                <span class="cart__item-block-title-count">{{
                    store.cart.length
                }}</span>
            </div>
            <div class="cart__block">
                <div class="cart__item-block-items">
                    <div class="">
                        <div class="cart__item-block-items-top">
                            <span class="cart__item-block-items-top-leftside">
                                <input id="chec" type="checkbox" />
                                <label for="chec">ВЫБРАТЬ ВСЁ</label>
                            </span>
                            <button
                                class="cart__item-block-items-top-delete-checked"
                                @click="del"
                            >
                                Удалить выбраные
                            </button>
                        </div>
                        <div class="hl"></div>
                    </div>
                    <div class="cart__item-block-item">
                        <div class="cart__itemm" v-for="item in store.cart">
                            <div class="cart__item-block-item-bl">
                                <input
                                    class="cart__item-block-item-checkbox"
                                    type="checkbox"
                                    v-model="selectedItem"
                                    :value="item.cart.id"
                                />
                                <div class="cart__item-block-item-img">
                                    <cardPlaceholder />
                                </div>
                                <div class="cart__item-block-item-title">
                                    {{ item.cart.title }}
                                </div>
                                <div class="cart__item-block-item-counter">
                                    <button @click="incrementCartItem(item)">
                                        <plusIcon />
                                    </button>
                                    <span> {{ item.count }}</span>
                                    <button @click="decreaseCartItem(item)">
                                        <minusIcon />
                                    </button>
                                </div>
                                <div class="cart__item-block-item-price">
                                    <span
                                        class="cart__item-block-item-price-now"
                                    >
                                        {{ item.cart.price }} ₽
                                    </span>
                                    <del
                                        class="cart__item-block-item-price-old"
                                    >
                                        {{
                                            item.cart.price_old
                                                ? `${item.cart.price_old}` +
                                                  " ₽"
                                                : ""
                                        }}
                                    </del>
                                </div>
                                <button
                                    @click="store.removeCartItem(item.cart.id)"
                                    class="cart__item-block-item-delete"
                                >
                                    <exitIcon />
                                </button>
                            </div>
                            <div class="hl"></div>
                        </div>
                    </div>
                </div>
                <div class="card__checkout">
                    <div class="card__checkout-title">
                        <p>К оплате</p>
                        <span>{{ store.totalAmount }} ₽ </span>
                    </div>
                    <ul class="card__checkout-ul">
                        <li class="card__checkout-item">
                            <p>{{ store.cart.length }} товар на сумму</p>
                            <span>{{ store.totalAmount }} ₽</span>
                        </li>
                        <li class="card__checkout-item">
                            <p>скидка</p>
                            <span>0 ₽</span>
                        </li>
                    </ul>
                    <input
                        class="card__checkout-input"
                        type="text"
                        placeholder="Введите промокод"
                    />
                    <button class="card__checkout-button" @click="alertSub()">
                        Оформить заказ
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
button {
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.card__checkout {
    width: 372px;
    flex-shrink: 0;
    padding: 30px;
    border-radius: 10px;
    background: rgba(241, 245, 248, 0.5);
    height: max-content;

    &-button {
        margin-top: 15px;
        border-radius: 10px;
        background: #667080;
        display: inline-flex;
        padding: 8px 0;
        width: -webkit-fill-available;
        justify-content: center;
        align-items: center;
        color: #fff;
        text-align: center;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 27px; /* 192.857% */
    }

    &-input {
        margin-top: 12px;
        color: rgba(102, 112, 128, 0.3);
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 27px; /* 192.857% */
        width: -webkit-fill-available;
        padding: 7px 15px;
        stroke-width: 1px;
        border-radius: 10px;
        border: 1px solid rgba(102, 112, 128, 0.4);
    }
    &-ul {
        margin-top: 27px;
    }
    &-item {
        color: rgba(102, 112, 128, 0.8);
        font-family: Inter;
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 17px; /* 141.667% */
        letter-spacing: 1px;
        text-transform: uppercase;
        display: flex;
        justify-content: space-between;
        margin-top: 11px;
        & span {
            color: rgba(102, 112, 128, 0.8);
            font-family: Inter;
            font-size: 12px;
            font-style: normal;
            font-weight: 500;
            line-height: 17px; /* 141.667% */
            letter-spacing: 1px;
            text-transform: uppercase;
        }
    }

    &-title {
        color: #31363f;
        text-align: center;
        font-family: Inter;
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        line-height: 27px; /* 135% */
        display: flex;
        justify-content: space-between;
    }
}
.cart__block {
    display: flex;
    justify-content: space-between;
    gap: 60px;
}
.cart__item-block-items {
    width: 100%;
}
.hl {
    margin-top: 15px;
    width: 100%;
    height: 1.5px;
    background-color: #eef1f4;
}
.cart {
    &__itemm {
        margin: 10px 0;
    }
    margin-top: 50px;
    &__back-shop {
        display: flex;
        align-items: center;
        gap: 10px;
        &-text {
            color: rgba(102, 112, 128, 0.5);
            font-family: Inter;
            font-size: 13px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            letter-spacing: -0.26px;
            text-decoration-line: underline;

            &-count {
                color: rgba(49, 54, 63, 0.4);
                font-family: Inter;
                font-size: 26px;
                font-style: normal;
                font-weight: 400;
                line-height: 50px; /* 192.308% */
            }
        }
    }

    &__item {
        &-block {
            &-item-img {
                width: 100px;
                height: 100px;
                flex-shrink: 0;
                background: #f1f5f8;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 12px;
                & svg {
                    width: 42px;
                }
            }
            &-item-bl {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 60px;
            }

            &-item {
                padding: 20px 0;

                &-title {
                    color: #667080;
                    font-family: Inter;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: 20px;
                    width: 180px;
                }
                &-counter {
                    display: flex;
                    gap: 10px;
                }
                &-price {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    &-now {
                        color: #31363f;
                        font-family: Inter;
                        font-size: 18px;
                        font-style: normal;
                        font-weight: 500;
                        line-height: 20px; /* 111.111% */
                    }
                    &-old {
                        color: rgba(49, 54, 63, 0.3);
                        font-family: Inter;
                        font-size: 18px;
                        font-style: normal;
                        font-weight: 400;
                        line-height: 20px; /* 111.111% */
                        text-decoration-line: strikethrough;
                    }
                }
            }

            &-items-top {
                display: flex;
                justify-content: space-between;
                &-leftside {
                    display: flex;
                    gap: 15px;
                    align-items: center;

                    & label {
                        color: rgba(49, 54, 63, 0.6);
                        font-family: Inter;
                        font-size: 10px;
                        font-style: normal;
                        font-weight: 500;
                        line-height: 17.4px; /* 174% */
                        letter-spacing: 1.2px;
                        text-transform: uppercase;
                    }
                }
            }
        }

        &-block-title {
            display: flex;
            align-items: center;
            gap: 15px;
            &-count {
                color: rgba(49, 54, 63, 0.4);
                font-family: Inter;
                font-size: 26px;
                font-style: normal;
                font-weight: 400;
                line-height: 50px; /* 192.308% */
            }

            & p {
                color: var(--min-gray);
                font-family: Inter;
                font-size: 28px;
                font-style: normal;
                font-weight: 600;
                line-height: 50px; /* 178.571% */
            }
        }
    }
}
</style>

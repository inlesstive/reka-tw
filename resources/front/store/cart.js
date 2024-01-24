import axios from "axios";
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
    state: () => ({
        cart: [],
    }),
    getters: {
        totalAmount(state) {
            return state.cart.reduce(
                (total, item) => total + item.cart.price * item.count,
                0
            );
        },
        totalDiscount(state) {
            return state.cart
                .filter((item) => item.cart.discount !== null) // Фильтруем только те элементы, у которых есть discount
                .reduce(
                    (total, item) =>
                        total +
                        (item.cart.price_old - item.cart.price) * item.count,
                    0
                );
        },
    },
    actions: {
        addCart(cart) {
            const cartItem = this.cart.find((item) => item.cart.id === cart.id);

            if (cartItem) {
                // Если товар уже есть в корзине, увеличиваем количество
                cartItem.count++;
            } else {
                // Если товара нет в корзине, добавляем с количеством 1
                this.cart.push({ cart, count: 1 });
            }
        },
        increment(cart) {
            const cartItem = this.cart.find((item) => item.cart.id === cart.id);
            if (cartItem) {
                console.log("Incrementing cart item:", cartItem);
                // Увеличиваем количество
                cartItem.count++;
            }
        },
        decrement(cart) {
            const cartItem = this.cart.find((item) => item.cart.id === cart.id);
            if (cartItem && cartItem.count > 1) {
                console.log("Decrementing cart item:", cartItem);
                // Уменьшаем количество, если оно больше 1
                cartItem.count--;
            }
        },
        removeCartItem(cartIdToRemove) {
            console.log(123);
            const cartItemIndex = this.cart.findIndex(
                (item) => item.cart.id === cartIdToRemove
            );
            if (cartItemIndex !== -1) {
                console.log("Removing cart item:", this.cart[cartItemIndex]);
                // Удаляем элемент из массива
                this.cart.splice(cartItemIndex, 1);
            }
        },
    },
});

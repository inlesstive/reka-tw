<script lang="ts" setup>
import locationIcon from "./icons/locationIcon.vue";
import searchIcon from "./icons/searchIcon.vue";
import heartIcon from "./icons/heartIcon.vue";
import cartIcon from "./icons/cartIcon.vue";
import userIcon from "./icons/userIcon.vue";

const headerLinks = {
    topLinks: [
        {
            href: "/",
            t: "Оплата и доставка",
        },
        {
            href: "/",
            t: "Возврат и обмен",
        },
        {
            href: "/cart",
            t: "Подарочный сертификат",
        },
    ],
    middleLinks: [
        {
            href: "/",
            t: "Магазины",
        },
        {
            href: "/",
            t: "Акции",
        },
        {
            href: "/",
            t: "Розыгрыш",
        },
    ],
    bottomLinks: [
        {
            href: "/",
            t: "ВСЕ АКЦИИ",
        },
        {
            href: "/",
            t: "БРИЛЛИАНТЫ",
        },
        {
            href: "/cart",
            t: "SALE",
        },
        {
            href: "/",
            t: "ПОМОЛВОЧНЫЕ КОЛЬЦА",
        },
        {
            href: "/",
            t: "КОЛЬЦА С ФИАНИТОМ",
        },
        {
            href: "/cart",
            t: "ОБРУЧАЛЬНЫЕ КОЛЬЦА",
        },
        {
            href: "/",
            t: "БЕЛОЕ ЗОЛОТО",
        },
        {
            href: "/",
            t: "ПОДАРКИ К 8 МАРТА",
        },
        {
            href: "/cart",
            t: "КОЛЬЦА С ФИАНИТОМ",
        },
    ],
};
</script>

<template>
    <div class="container">
        <header class="header">
            <nav class="header__nav">
                <div class="header__nav-top">
                    <div class="header__nav-top-left-side">
                        <div class="header__nav-top-location">
                            <locationIcon />
                            Москва
                        </div>
                        <div class="header__nav-top-telephone">
                            <a href="tel:88005117730"> 8 (800) 511 77 30 </a>
                        </div>
                    </div>
                    <div class="header__nav-top-right-side">
                        <ul class="header__nav-top-right-side__list">
                            <li
                                class="header__nav-top-right-side__list-link"
                                v-for="(link, i) in headerLinks.topLinks"
                                :key="i"
                            >
                                <router-link :to="link.href">
                                    {{ link.t }}
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="header__nav-middle">
                    <div class="header__nav-middle-logo">
                        <router-link to="/"> Логотип </router-link>
                    </div>
                    <div class="header__nav-middle-hl"></div>
                    <ul class="header__nav-middle-list">
                        <li class="header__nav-middle-link">
                            <router-link
                                class="header__nav-middle-link-catalog"
                                to="/"
                            >
                                Каталог
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="11"
                                    height="7"
                                    viewBox="0 0 11 7"
                                    fill="none"
                                >
                                    <path
                                        d="M5.53172 5.02732L1.62517 0.984836C1.44892 0.80245 1.1592 0.80245 0.982943 0.984836C0.896061 1.07474 0.851953 1.19356 0.851953 1.30975C0.851953 1.42665 0.893543 1.54398 0.982943 1.63649L5.21061 6.01126C5.38686 6.19364 5.67658 6.19364 5.85283 6.01126L5.85285 6.01123L10.0219 1.69533C10.1953 1.51583 10.1953 1.22502 10.0219 1.04552C9.8456 0.863134 9.55588 0.863135 9.37963 1.04552L9.48749 1.14976L9.37962 1.04552L5.53172 5.02732Z"
                                        fill="#31363F"
                                        stroke="currentColor"
                                        stroke-width="0.3"
                                    />
                                </svg>
                            </router-link>
                        </li>
                        <li
                            class="header__nav-middle-link"
                            v-for="(link, i) in headerLinks.middleLinks"
                            :key="i"
                        >
                            <router-link :to="link.href">{{
                                link.t
                            }}</router-link>
                        </li>
                    </ul>
                    <div class="header__nav-middle-input">
                        <input type="text" placeholder="Поиск по каталогу " />
                        <searchIcon />
                    </div>
                    <div class="header__nav-middle-hl"></div>
                    <div class="header__nav-middle-group-icon">
                        <router-link to="/">
                            <heartIcon />
                        </router-link>
                        <router-link to="/cart">
                            <cartIcon />
                        </router-link>
                        <router-link to="/">
                            <userIcon />
                        </router-link>
                    </div>
                </div>

                <div class="header__nav-bottom">
                    <ul class="header__nav-bottom-list">
                        <li
                            class="header__nav-bottom-link"
                            v-for="(item, i) in headerLinks.bottomLinks"
                            :key="i"
                        >
                            <router-link :to="item.href">
                                {{ item.t }}
                            </router-link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    </div>
</template>

<style lang="scss" scoped>
.header {
    margin-top: 15px;
    &__nav {
        display: flex;
        flex-direction: column;
        gap: 15px;
        &-top {
            display: flex;
            justify-content: space-between;

            &-location {
                display: flex;
                align-items: center;
                gap: 5px;
                color: var(--gray-70);
                font-size: var(--fs-normal);
                font-weight: 400;
            }

            &-telephone a {
                font-size: 13px;
                font-weight: 400;
                color: var(--gray-70);
            }

            &-left-side {
                display: flex;
                gap: 40px;
            }
            &-right-side {
                &__list {
                    display: flex;
                    gap: 50px;

                    &-link a {
                        font-size: 13px;
                        font-weight: 400;
                        color: var(--gray-60);
                    }
                }
            }
        }
        &-middle {
            display: flex;
            gap: 20px;
            align-items: center;
            &-link {
                & a {
                    color: var(--secondary);
                    font-weight: 500;
                }
                &-catalog {
                    display: flex;
                    gap: 5px;
                    align-items: center;
                }
            }
            &-group-icon {
                display: flex;
                align-items: center;
                gap: 25px;
                margin-left: auto;
            }

            &-logo a {
                color: var(--secondary);
                font-family: Inter;
                font-size: 33px;
                font-style: normal;
                font-weight: 700;
                line-height: normal;
                letter-spacing: -0.66px;
            }
            &-list {
                display: flex;
                gap: 30px;
            }
            &-input {
                display: flex;
                align-items: center;
                position: relative;
                width: 100%;
                & input {
                    padding: 12px 16px;
                    flex-shrink: 0;
                    outline: none;
                    border-radius: 5px;
                    border: 1px solid #eef1f4;
                    background: rgba(238, 241, 244, 0.3);
                    width: -webkit-fill-available;
                    width: fill-available;
                }

                & svg {
                    position: absolute;
                    right: 16px;
                }
            }

            &-hl {
                width: 1px;
                height: 36px;
                background: var(--hr);
            }
        }

        &-bottom {
            &-list {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 25px;
                & a {
                    color: rgba(102, 112, 128, 0.8);
                    font-family: Inter;
                    font-size: 11px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: 20px; /* 181.818% */
                }
            }
        }
    }
}
</style>

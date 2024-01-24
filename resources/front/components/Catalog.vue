<script lang="ts" setup>
import { ref, onMounted, watch, watchEffect } from "vue";
import hideFilterIcon from "../components/icons/hideFilterIcon.vue";
import CatalogCard from "./CatalogCard.vue";
import DropdownIcon from "./icons/dropdownIcon.vue";
import "nouislider/distribute/nouislider.min.css";
import Slider from "./Form/Slider.vue";
import "../store/products";
import { useProductsStore } from "../store/products";
import debounce from "lodash.debounce";

const store = useProductsStore();

store.getProduct();

const CategoryControllerOpen = ref(true);
const PriceControllerOpen = ref(true);
const MaterialControllerOpen = ref(true);
const tags = ref([]);
const materials = ref([]);
const category_select = ref(0);

const minPrice = ref(0);

const maxPrice = ref(50000);

watch(
    [tags, minPrice, maxPrice, materials, category_select],
    debounce(() => {
        store.getProduct(
            category_select.value,
            [minPrice.value, maxPrice.value],
            materials.value,
            tags.value,
            "price",
            "desc"
        );
    }, 800)
);

const adjustHeight = (event: any) => {
    const collapseElement = event.target;
    if (collapseElement.classList.contains("open")) {
        collapseElement.style.height = "auto";
    } else {
        collapseElement.style.height = "0";
    }
};
const openCategories = ref([]);

const toggleCollapse = (categoryId) => {
    // функция для переключения состояния открытия/закрытия категории
    if (isCategoryOpen(categoryId)) {
        openCategories.value = openCategories.value.filter(
            (id) => id !== categoryId
        );
    } else {
        openCategories.value.push(categoryId);
    }
};

const isCategoryOpen = (categoryId) => {
    // функция для проверки, открыта ли категория
    return openCategories.value.includes(categoryId);
};
</script>

<template>
    <div class="container catalog__content">
        <div class="catalog__top">
            <h2 class="catalog__top-title">Все изделия</h2>
            <span class="catalog__top-count-products"> 3385 товаров </span>
        </div>

        <div class="filterd" v-if="store.products">
            <div class="catalog__filter">
                <div class="catalog__filter-hide">
                    <hideFilterIcon />
                    <span class="catalog__filter-hide-text"
                        >Спрятать фильтры</span
                    >
                </div>
                <div class="catalog__filter-items">
                    <h3
                        class="catalog__filter-items-title"
                        @click="
                            CategoryControllerOpen = !CategoryControllerOpen
                        "
                    >
                        Тип изделия
                        <DropdownIcon />
                    </h3>
                    <div
                        class="catalog__filter-items-content collapse"
                        :class="{
                            collapse: !CategoryControllerOpen,
                            open: CategoryControllerOpen,
                        }"
                        @transitionend="adjustHeight"
                    >
                        <div
                            class="catalog__filter-item"
                            :class="{ 'active-item': category_select === 0 }"
                            @click="category_select = 0"
                        >
                            Все категории
                        </div>

                        <div
                            class="catalog__filter-item"
                            v-for="(category, categoryId) in Object.values(
                                store.products.categories
                            )"
                            :class="{
                                'active-item':
                                    category_select === categoryId + 1,
                            }"
                            @click="category_select = categoryId + 1"
                            :key="categoryId"
                            :id="categoryId + 1"
                        >
                            {{ category }}
                        </div>
                    </div>
                </div>

                <div class="catalog__filter-items">
                    <h3
                        class="catalog__filter-items-title"
                        @click="PriceControllerOpen = !PriceControllerOpen"
                    >
                        Цена
                        <DropdownIcon />
                    </h3>
                    <div
                        class="catalog__filter-items-content catalog__filter-items-content-input-price"
                        :class="{
                            collapse: !PriceControllerOpen,
                            open: PriceControllerOpen,
                        }"
                        @transitionend="adjustHeight"
                    >
                        <input type="text" :placeholder="'от ' + minPrice" />
                        <input type="text" :placeholder="'от ' + maxPrice" />
                        <div class="range-slider">
                            <div class="slider"></div>
                            <div class="range-input">
                                <input
                                    v-model="minPrice"
                                    type="range"
                                    class="range-min"
                                    style="border: none"
                                    :min="store.products.base_filters.prices[0]"
                                    :max="store.products.base_filters.prices[1]"
                                    :step="100"
                                />
                                <input
                                    v-model="maxPrice"
                                    type="range"
                                    class="range-max"
                                    style="border: none"
                                    :min="store.products.base_filters.prices[0]"
                                    :max="store.products.base_filters.prices[1]"
                                    :step="100"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="catalog__filter-items">
                    <h3
                        class="catalog__filter-items-title"
                        @click="
                            MaterialControllerOpen = !MaterialControllerOpen
                        "
                    >
                        Материал
                        <DropdownIcon />
                    </h3>
                    <div
                        v-for="category in store.products.base_filters
                            .materials"
                        :key="category.id"
                        :class="{
                            collapse: !MaterialControllerOpen,
                            open: MaterialControllerOpen,
                        }"
                    >
                        <div class="catalog__filter-materials">
                            <input
                                v-model="materials"
                                :value="category.id"
                                :id="category.id"
                                type="checkbox"
                            />
                            <label
                                :for="category.id"
                                @click="toggleCollapse(category.id)"
                            >
                                {{ category.title }}
                            </label>
                            <DropdownIcon />
                        </div>
                        <div v-if="isCategoryOpen(category.id)">
                            <ul>
                                <li
                                    v-for="material in category.materials"
                                    :key="material.id"
                                    class="catalog__filter-subcategory"
                                >
                                    <input
                                        v-model="materials"
                                        :value="material.id"
                                        :id="material.id"
                                        type="checkbox"
                                    />
                                    <label :for="material.id">{{
                                        material.title
                                    }}</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="catalog__filter-tags">
                    <ul class="catalog__filter-tags-items">
                        <li
                            class="catalog__filter-tags-item"
                            v-for="(item, i) in Object.values(
                                store.products.base_filters.tags
                            )"
                        >
                            <label :for="item"> {{ item }} </label>
                            <input
                                :value="i + 1"
                                v-model="tags"
                                :id="item"
                                type="checkbox"
                                class="switch_1"
                            />
                        </li>
                    </ul>
                </div>
                <div class="catalog__filter-clear">
                    <p>Очистить фильтр</p>
                </div>
            </div>
            <div class="catalog__item">
                <div class="catalog__card">
                    <CatalogCard
                        v-for="item in store.products.data"
                        :item="item"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.price-input {
    width: 100%;
    display: flex;
    margin: 30px 0 35px;
}
.price-input .field {
    display: flex;
    width: 100%;
    height: 45px;
    align-items: center;
}
.field input {
    width: 100%;
    height: 100%;
    outline: none;
    font-size: 19px;
    margin-left: 12px;
    border-radius: 5px;
    text-align: center;
    border: 1px solid #999;
    -moz-appearance: textfield;
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
.price-input .separator {
    width: 130px;
    display: flex;
    font-size: 19px;
    align-items: center;
    justify-content: center;
}
.slider {
    height: 5px;
    position: relative;
    background: #ddd;
    border-radius: 5px;
}

.range-min,
.range-min {
    border: none;
}
.slider .progress {
    height: 100%;
    left: 25%;
    right: 25%;
    position: absolute;
    border-radius: 5px;
}
.range-input {
    position: relative;
}
.range-input input {
    position: absolute;
    width: 100%;
    height: 5px;
    top: -15px;
    background: none;
    pointer-events: none;
    -webkit-appearance: none;
    -moz-appearance: none;
}
input[type="range"]::-webkit-slider-thumb {
    height: 17px;
    width: 17px;
    border-radius: 50%;
    background: #b4b4b4;
    pointer-events: auto;
    -webkit-appearance: none;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
}
input[type="range"]::-moz-range-thumb {
    height: 17px;
    width: 17px;
    border: none;
    border-radius: 50%;
    background: #b4b4b4;
    pointer-events: auto;
    -moz-appearance: none;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
}
input {
    accent-color: var(--gray-70);
}
.collapse {
    height: 0;
    overflow: hidden;
    transition: height 0.3s ease;
}

.open {
    height: auto !important; /* Override the height set during the transition */
}

.range-slider {
    width: 250px;
    margin-top: 10px;
    margin-bottom: 20px;
}

.filterd {
    display: flex;
    justify-content: space-between;
}
.active-item {
    border-radius: 10px;
    background: #eef1f4;
}

.catalog {
    &__card {
        display: grid !important;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
    }
    &__content {
        padding: 20px 0;
    }
    &__top {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 30px;
        &-title {
            color: var(--min-gray);
            font-family: Inter;
            font-size: 28px;
            font-style: normal;
            font-weight: 600;
        }

        &-count-products {
            color: var(--gray-60);
            font-family: Inter;
            font-size: 11px;
            font-style: normal;
            font-weight: 400;
        }
    }
    &__filter {
        &-clear {
            margin-top: 30px;
            color: var(--gray-60);
            font-family: Inter;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 24px; /* 171.429% */
            text-decoration-line: underline;
            cursor: pointer;
        }
        &-tags {
            margin-top: 20px;
            &-items {
                display: flex;
                flex-direction: column;
                gap: 5px;
            }

            &-item {
                display: flex;
                align-items: center;
                justify-content: space-between;

                & label {
                    color: var(--gray-70);
                    font-family: Inter;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 20px; /* 142.857% */
                }
            }
        }
        &-item {
            widows: max-content;
            padding: 8px 15px;
            color: rgba(102, 112, 128, 0.8);
            font-family: Inter;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 22px;
        }
        &-materials {
            display: flex;
            margin-top: 15px;
            gap: 5px;
            align-items: center;
            color: var(--gray-70);
            margin-bottom: 10px;
            & label {
                color: var(--gray-70);
                font-family: Inter;
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: 22px; /* 157.143% */
            }
            & input {
                width: 18px;
                height: 18px;
            }
        }

        &-subcategory {
            display: flex;
            gap: 5px;
            align-items: center;
            margin-left: 15px;
            color: var(--gray-70);
            & label {
                color: var(--gray-70);
                font-family: Inter;
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: 22px; /* 157.143% */
            }
            & input {
                width: 18px;
                height: 18px;
            }
        }

        &-items {
            &-content {
                margin-top: 15px;

                &-input-price {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                    & input {
                        border-radius: 10px;
                        border: 1px solid rgba(102, 112, 128, 0.3);
                        outline: none;
                        padding: 10px;
                    }
                }
            }
        }

        &-items-title {
            display: flex;
            gap: 5px;
            align-items: center;
            color: var(--min-gray);
            cursor: pointer;
            user-select: none;
            padding-top: 15px;
        }
        &-hide {
            display: flex;
            gap: 12px;
            align-items: center;
            color: var(--gray-60);
            cursor: pointer;
            margin-top: 12px;

            &-text {
                color: var(--gray-60);
                font-family: Inter;
                font-size: 12px;
                font-style: normal;
                font-weight: 400;
                line-height: 24px; /* 200% */
                letter-spacing: 0.18px;
                text-decoration-line: underline;
            }
        }
    }
}
</style>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

defineProps({
  min: Number,
  max: Number
})

const minPrice = ref(0);
const maxPrice = ref(17500);
const rangeMax = 10000;
const priceGap = 1000;

const priceInputHandler = (e) => {
    let newMinPrice = parseInt(minPrice.value);
    let newMaxPrice = parseInt(maxPrice.value);

    if (newMaxPrice - newMinPrice >= priceGap && newMaxPrice <= max) {
        if (e.target.className === "input-min") {
            minPrice.value = newMinPrice;
        } else {
            maxPrice.value = newMaxPrice;
        }
    }
};

onMounted(() => {
    const priceInputs = document.querySelectorAll(".price-input input");
    priceInputs.forEach((input) => {
        input.addEventListener("input", priceInputHandler);
    });
});
</script>

<template>
    <div class="slider">
        <div
            class="progress"
            :style="{
                left: `${(minPrice / max) * 100}%`,
                right: `${100 - (maxPrice / max) * 100}%`,
            }"
        ></div>
    </div>
    <div class="range-input">
        <input
            v-model="minPrice"
            type="range"
            class="range-min"
            :min="min"
            :max="max"
            :step="100"
        />
        <input
            v-model="maxPrice"
            type="range"
            class="range-max"
            :min="min"
            :max="max"
            :step="100"
        />
    </div>
</template>

<style scoped>
::selection {
    color: #fff;
    background: #ddd;
}
.wrapper {
    width: 400px;
    background: #fff;
    border-radius: 10px;
    padding: 20px 25px 40px;
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.1);
}
header h2 {
    font-size: 24px;
    font-weight: 600;
}
header p {
    margin-top: 5px;
    font-size: 16px;
}
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
.slider .progress {
    height: 100%;
    left: 25%;
    right: 25%;
    position: absolute;
    border-radius: 5px;
    background: #838383;
}
.range-input {
    position: relative;
}
.range-input input {
    position: absolute;
    width: 100%;
    height: 5px;
    top: -5px;
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
</style>

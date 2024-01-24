import axios from "axios";
import { defineStore } from "pinia";

export const useProductsStore = defineStore("produtct", {
    state: () => ({
        products: null,
        url: "http://127.0.0.1:8000/api/products",
    }),
    actions: {
        async getProduct(category, prices, materials, tags, sortBy, orderBy) {
            try {
                // Building request parameters
                const params = {
                    category,
                    prices,
                    materials,
                    tags,
                    sortBy,
                    orderBy,
                };

                // Filtering out parameters with null, undefined, or 0 values
                const filteredParams = Object.fromEntries(
                    Object.entries(params).filter(
                        ([key, value]) =>
                            value !== null && value !== undefined && value !== 0
                    )
                );

                // Building the URL with filtered parameters
                const queryString = Object.keys(filteredParams)
                    .map((key) => {
                        if (Array.isArray(filteredParams[key])) {
                            return filteredParams[key]
                                .map((value) => `${key}[]=${value}`)
                                .join("&");
                        } else {
                            return `${key}=${filteredParams[key]}`;
                        }
                    })
                    .join("&");

                const fullUrl = `${this.url}?${queryString}`;

                // Performing a GET request using Axios
                console.log(fullUrl);
                const response = await axios.get(fullUrl);

                // Returning data from a successful response
                this.products = response.data;
            } catch (error) {
                // Handling errors
                console.error("Error:", error);
                throw error; // Propagating the error for further handling in the calling code
            }
        },
    },
});

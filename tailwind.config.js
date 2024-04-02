import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
const time = "0.3s";
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            colors: {
                ...defaultTheme.colors,
                text: "var(--text)",
                background: "var(--background)",
                primary: "var(--primary)",
                secondary: "var(--secondary)",
                accent: "var(--accent)",
            },
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            keyframes: {
                expand: {
                    "0%": { transform: "scale(0)" },
                    "100%": { transform: "scale(1)" },
                },
                appear: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                shrink: {
                    "0%": { transform: "scale(1)" },
                    "100%": { transform: "scale(0)" },
                },
                disappear: {
                    "0%": { opacity: "1" },
                    "100%": { opacity: "0" },
                },
            },
            animation: {
                expand: `expand ${time} ease-out forwards`,
                shrink: `shrink ${time} ease-out forwards`,
                appear: `appear ${time} ease-in forwards`,
                disappear: `disappear ${time} ease-in forwards`,
            },
        },
    },

    plugins: [forms],
};

import { CalendarCheck, ListCheck, SquarePlus } from "lucide-react";
import brand_logo from "./images/brand_logo.png";
import add_address_image from "./images/add_address_image.jpg";
import contact_img from './images/contact_img.jpg'
import about_img from './images/about_img.jpg'
import hero_img from './images/hero_img.jpg'
import upload_area from "./images/upload_area.png";
import box_icon from "./images/box_icon.svg";

// category images imports
import organic_vegitable_image from "./images/organic_vegitable_image.png";
import fresh_fruits_image from "./images/fresh_fruits_image.png";
import bottles_image from "./images/bottles_image.png";
import instant_image from "./images/instant_image.png";
import dairy_product_image from "./images/dairy_product_image.png";
import bakery_image from "./images/bakery_image.png";
import grain_image from "./images/grain_image.png";

export const assets = {
    brand_logo,
    add_address_image,
    contact_img,
    about_img,
    hero_img,
    upload_area,
    box_icon
}

export const categories = [
    {
        text: "Organic veggies",
        path: "Vegetables",
        image: organic_vegitable_image,
        bgColor: "#FEF6DA",
    },
    {
        text: "Fresh Fruits",
        path: "Fruits",
        image: fresh_fruits_image,
        bgColor: "#FEE0E0",
    },
    {
        text: "Cold Drinks",
        path: "Drinks",
        image: bottles_image,
        bgColor: "#F0F5DE",
    },
    {
        text: "Instant Food",
        path: "Instant",
        image: instant_image,
        bgColor: "#E1F5EC",
    },
    {
        text: "Dairy Products",
        path: "Dairy",
        image: dairy_product_image,
        bgColor: "#FEE6CD",
    },
    {
        text: "Bakery & Breads",
        path: "Bakery",
        image: bakery_image,
        bgColor: "#E0F6FE",
    },
    {
        text: "Grains & Cereals",
        path: "Grains",
        image: grain_image,
        bgColor: "#F1E3F9",
    },
];

export const sidebarLinksSeller = [
    { label: "Add Product", to: "/seller", Icon: SquarePlus },
    { label: "Product List", to: "/seller/product-list", Icon: ListCheck },
    { label: "Orders", to: "/seller/orders", Icon: CalendarCheck },
];

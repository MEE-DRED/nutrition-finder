// Render all available meals in the new section
function renderAllMeals() {
    const container = document.getElementById('allMealsContainer');
    if (!container) return;
    container.innerHTML = '';
    demoNutritionData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'all-meal-card';
        let imageUrl = '';
        if (item.image) {
            imageUrl = item.image;
        } else {
            imageUrl = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80';
        }
        card.innerHTML = `
            <div class="all-meal-image-container">
                <img class="all-meal-image" src="${imageUrl}" alt="${item.food}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80';">
            </div>
            <div class="all-meal-name">${item.food}</div>
        `;
        container.appendChild(card);
    });
}
let allResults = [];
const NUTRITIONIX_APP_ID = '341bedd2';
const NUTRITIONIX_APP_KEY = '5e7798c261fa11d8546c7cfb1b612831';
// Demo data for when API is not available
const demoNutritionData = [
    { food: "Akara", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 180, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 7, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 15, unit: "g" }, FAT: { label: "Fat", quantity: 10, unit: "g" }, FIBTG: { label: "Fiber", quantity: 3, unit: "g" }, SUGAR: { label: "Sugar", quantity: 1, unit: "g" } }, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwui_-V3eLUwITNvwLfKl9CTTwV7EEOF_iXw&s" },
    { food: "Apple", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 52, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 0.3, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 14, unit: "g" }, FAT: { label: "Fat", quantity: 0.2, unit: "g" }, FIBTG: { label: "Fiber", quantity: 2.4, unit: "g" }, SUGAR: { label: "Sugar", quantity: 10, unit: "g" } }, image: "https://hips.hearstapps.com/hmg-prod/images/apples-at-farmers-market-royalty-free-image-1627321463.jpg?crop=1xw:0.94466xh;center,top&resize=1200:*" },
    { food: "Jollof Rice", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 180, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 3.5, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 32, unit: "g" }, FAT: { label: "Fat", quantity: 4, unit: "g" }, FIBTG: { label: "Fiber", quantity: 2, unit: "g" }, SUGAR: { label: "Sugar", quantity: 2, unit: "g" } }, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7GcBsSPk2GYi0OSeIxXg7sJ6it1IOvTS3CA&s" },
    { food: "Fried Rice", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 210, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 4, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 35, unit: "g" }, FAT: { label: "Fat", quantity: 6, unit: "g" }, FIBTG: { label: "Fiber", quantity: 2.5, unit: "g" }, SUGAR: { label: "Sugar", quantity: 2, unit: "g" } }, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFtwK_ynw-Z0CEGvjpM7zsob6CVMt7r1I_xw&s" },
    { food: "Egusi Soup", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 250, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 10, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 8, unit: "g" }, FAT: { label: "Fat", quantity: 20, unit: "g" }, FIBTG: { label: "Fiber", quantity: 3, unit: "g" }, SUGAR: { label: "Sugar", quantity: 1, unit: "g" } }, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvQqCWq0cnEQC2OFMRNw46I1dgJBB3wCPmZw&s" },
    { food: "Efo Riro", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 120, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 4, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 7, unit: "g" }, FAT: { label: "Fat", quantity: 8, unit: "g" }, FIBTG: { label: "Fiber", quantity: 2, unit: "g" }, SUGAR: { label: "Sugar", quantity: 2, unit: "g" } }, image: "https://lowcarbafrica.com/wp-content/uploads/2019/08/Efo-Riro-IG-1.jpg" },
    { food: "Moi Moi", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 190, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 8, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 24, unit: "g" }, FAT: { label: "Fat", quantity: 7, unit: "g" }, FIBTG: { label: "Fiber", quantity: 3, unit: "g" }, SUGAR: { label: "Sugar", quantity: 1, unit: "g" } }, image: "data:image/jpeg;base64,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" },
    { food: "Suya", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 330, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 25, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 2, unit: "g" }, FAT: { label: "Fat", quantity: 25, unit: "g" }, FIBTG: { label: "Fiber", quantity: 1, unit: "g" }, SUGAR: { label: "Sugar", quantity: 0, unit: "g" } }, image: "https://eatwellabi.com/wp-content/uploads/2020/12/air-fryer-suya-2.jpg" },
    { food: "Pounded Yam", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 220, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 3, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 50, unit: "g" }, FAT: { label: "Fat", quantity: 0.5, unit: "g" }, FIBTG: { label: "Fiber", quantity: 2, unit: "g" }, SUGAR: { label: "Sugar", quantity: 1, unit: "g" } }, image: "https://www.chefspencil.com/wp-content/uploads/Pounded-Yam-4-1.jpg" },
    { food: "Ofada Rice", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 210, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 4, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 45, unit: "g" }, FAT: { label: "Fat", quantity: 1.5, unit: "g" }, FIBTG: { label: "Fiber", quantity: 2, unit: "g" }, SUGAR: { label: "Sugar", quantity: 0, unit: "g" } }, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3tH9SlRVdVZmcwBT_TMUipRkuplLkdOumJA&s" },
    { food: "Chicken Breast", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 165, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 31, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 0, unit: "g" }, FAT: { label: "Fat", quantity: 3.6, unit: "g" }, FIBTG: { label: "Fiber", quantity: 0, unit: "g" }, SUGAR: { label: "Sugar", quantity: 0, unit: "g" } }, image: "https://www.tasteofhome.com/wp-content/uploads/2025/01/Air-Fryer-Chicken-Breasts_EXPS_FT25_278779_EC_0114_4.jpg" },
    { food: "Quinoa", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 368, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 14.1, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 64.2, unit: "g" }, FAT: { label: "Fat", quantity: 6.1, unit: "g" }, FIBTG: { label: "Fiber", quantity: 7, unit: "g" }, SUGAR: { label: "Sugar", quantity: 0, unit: "g" } }, image: "https://cdn.loveandlemons.com/wp-content/uploads/2020/08/quinoa-salad.jpg" },
    { food: "Salmon", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 208, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 22, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 0, unit: "g" }, FAT: { label: "Fat", quantity: 12.4, unit: "g" }, FIBTG: { label: "Fiber", quantity: 0, unit: "g" }, SUGAR: { label: "Sugar", quantity: 0, unit: "g" } }, image: "https://healthyrecipesblogs.com/wp-content/uploads/2024/06/pan-fried-salmon-featured-new.jpg" },
    { food: "Broccoli", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 34, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 2.8, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 6.6, unit: "g" }, FAT: { label: "Fat", quantity: 0.4, unit: "g" }, FIBTG: { label: "Fiber", quantity: 2.6, unit: "g" }, SUGAR: { label: "Sugar", quantity: 1.5, unit: "g" } }, image: "https://www.simplyrecipes.com/thmb/kTh0yVR2KrJFnGQPNGe1UYIG1t8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Ground-Beef-Broccoli-LEAD-6-faafd703b949408ba35b3199cd5a22e9.jpg" },
    ,
    { food: "Avocado", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 160, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 2, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 8.5, unit: "g" }, FAT: { label: "Fat", quantity: 14.7, unit: "g" }, FIBTG: { label: "Fiber", quantity: 6.7, unit: "g" }, SUGAR: { label: "Sugar", quantity: 0.7, unit: "g" } }, image: "https://cdn.loveandlemons.com/wp-content/uploads/2020/01/how-to-make-avocado-toast.jpg" },
    { food: "Afang Soup", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 180, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 8, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 10, unit: "g" }, FAT: { label: "Fat", quantity: 12, unit: "g" }, FIBTG: { label: "Fiber", quantity: 3, unit: "g" }, SUGAR: { label: "Sugar", quantity: 2, unit: "g" } }, image: "https://deychop.com/wp-content/uploads/2023/12/Afang-Soup.jpeg" },
    { food: "Edikang Ikong", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 160, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 7, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 9, unit: "g" }, FAT: { label: "Fat", quantity: 10, unit: "g" }, FIBTG: { label: "Fiber", quantity: 4, unit: "g" }, SUGAR: { label: "Sugar", quantity: 2, unit: "g" } }, image: "https://dooneyskitchen.com/wp-content/uploads/2021/05/119130040_2748820958696194_7608147611009904518_n-1.jpg" },
    { food: "Banga Soup", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 220, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 6, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 8, unit: "g" }, FAT: { label: "Fat", quantity: 18, unit: "g" }, FIBTG: { label: "Fiber", quantity: 2, unit: "g" }, SUGAR: { label: "Sugar", quantity: 1, unit: "g" } }, image: "https://foodpluswords.com/wp-content/uploads/2022/07/banga-soup-and-starch-735x980.jpeg" },
    { food: "Oha Soup", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 170, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 7, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 11, unit: "g" }, FAT: { label: "Fat", quantity: 9, unit: "g" }, FIBTG: { label: "Fiber", quantity: 3, unit: "g" }, SUGAR: { label: "Sugar", quantity: 1, unit: "g" } }, image: "https://worldlytreat.com/wp-content/uploads/2024/07/oha-soup-2.jpg" },
    { food: "Bitterleaf Soup (Ofe Onugbu)", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 160, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 6, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 10, unit: "g" }, FAT: { label: "Fat", quantity: 8, unit: "g" }, FIBTG: { label: "Fiber", quantity: 4, unit: "g" }, SUGAR: { label: "Sugar", quantity: 1, unit: "g" } }, image: "https://foodieng.com/wp-content/uploads/2022/11/Olugbo-Soup.jpeg" },
    { food: "Nsala Soup (White Soup)", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 140, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 5, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 8, unit: "g" }, FAT: { label: "Fat", quantity: 7, unit: "g" }, FIBTG: { label: "Fiber", quantity: 2, unit: "g" }, SUGAR: { label: "Sugar", quantity: 1, unit: "g" } }, image: "https://www.tastingtable.com/img/gallery/what-makes-nsala-different-from-other-nigerian-soups/l-intro-1706913558.jpg" },
    { food: "Ofada Rice and Ayamase", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 320, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 7, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 60, unit: "g" }, FAT: { label: "Fat", quantity: 8, unit: "g" }, FIBTG: { label: "Fiber", quantity: 3, unit: "g" }, SUGAR: { label: "Sugar", quantity: 2, unit: "g" } }, image: "https://i0.wp.com/www.1qfoodplatter.com/wp-content/uploads/2015/11/ayamase-stew-1024x680.jpg?ssl=1" },
    { food: "Yam Porridge (Asaro)", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 210, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 3, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 45, unit: "g" }, FAT: { label: "Fat", quantity: 4, unit: "g" }, FIBTG: { label: "Fiber", quantity: 2, unit: "g" }, SUGAR: { label: "Sugar", quantity: 2, unit: "g" } }, image: "https://www.foodnify.com/wp-content/uploads/2024/09/yam-porridge.jpg" },
    { food: "Beans (Ewa Riro)", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 180, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 8, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 30, unit: "g" }, FAT: { label: "Fat", quantity: 5, unit: "g" }, FIBTG: { label: "Fiber", quantity: 6, unit: "g" }, SUGAR: { label: "Sugar", quantity: 1, unit: "g" } }, image: "https://www.myactivekitchen.com/wp-content/uploads/2015/02/stewed-bean-ewa-riro-recipe-img.jpg" },
    { food: "Eba (Garri)", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 180, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 1, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 40, unit: "g" }, FAT: { label: "Fat", quantity: 0.5, unit: "g" }, FIBTG: { label: "Fiber", quantity: 2, unit: "g" }, SUGAR: { label: "Sugar", quantity: 0, unit: "g" } }, image: "https://www.myactivekitchen.com/wp-content/uploads/2015/03/how-to-make-eba-food-nigerian-eba-img2-1.jpg" },
    { food: "Amala", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 170, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 2, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 38, unit: "g" }, FAT: { label: "Fat", quantity: 0.3, unit: "g" }, FIBTG: { label: "Fiber", quantity: 2, unit: "g" }, SUGAR: { label: "Sugar", quantity: 0, unit: "g" } }, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfZz7JhdqvaB5Oe5BkLKqEEpnQ9__7pb5wZA&s" },
    { food: "Fufu (Cassava)", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 150, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 1, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 36, unit: "g" }, FAT: { label: "Fat", quantity: 0.2, unit: "g" }, FIBTG: { label: "Fiber", quantity: 1, unit: "g" }, SUGAR: { label: "Sugar", quantity: 0, unit: "g" } }, image: "https://cheflolaskitchen.com/wp-content/uploads/2021/02/DSC0353-Fufu-01292021-west-african-fufu.jpg" },
    { food: "Semovita", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 160, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 2, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 35, unit: "g" }, FAT: { label: "Fat", quantity: 0.2, unit: "g" }, FIBTG: { label: "Fiber", quantity: 1, unit: "g" }, SUGAR: { label: "Sugar", quantity: 0, unit: "g" } }, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTijs3T3KiXl42pe6elk_Ak1IJTIkz8CQgIsA&s" },
    { food: "Tuwo Shinkafa", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 180, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 3, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 40, unit: "g" }, FAT: { label: "Fat", quantity: 0.5, unit: "g" }, FIBTG: { label: "Fiber", quantity: 1, unit: "g" }, SUGAR: { label: "Sugar", quantity: 0, unit: "g" } }, image: "https://eatwellabi.com/wp-content/uploads/2022/10/Jamaican-chicken-soup-and-tuwo-15.jpg" },
    { food: "Wheat Swallow", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 170, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 5, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 32, unit: "g" }, FAT: { label: "Fat", quantity: 0.5, unit: "g" }, FIBTG: { label: "Fiber", quantity: 2, unit: "g" }, SUGAR: { label: "Sugar", quantity: 0, unit: "g" } }, image: "https://i0.wp.com/skippersfastfood.com/wp-content/uploads/2024/09/amala-2.jpg?resize=500%2C500&ssl=1" },
    { food: "Kilishi", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 350, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 30, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 5, unit: "g" }, FAT: { label: "Fat", quantity: 25, unit: "g" }, FIBTG: { label: "Fiber", quantity: 1, unit: "g" }, SUGAR: { label: "Sugar", quantity: 0, unit: "g" } }, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl3wy30xPzo36v8L3cePE-uPFfc62DYzEaxg&s" },
    { food: "Asun", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 320, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 28, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 4, unit: "g" }, FAT: { label: "Fat", quantity: 22, unit: "g" }, FIBTG: { label: "Fiber", quantity: 1, unit: "g" }, SUGAR: { label: "Sugar", quantity: 0, unit: "g" } }, image: "https://cookingwithclaudy.com/wp-content/uploads/2023/09/20230807_112650-scaled-1.jpg" },
    { food: "Pepper Soup", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 120, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 10, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 3, unit: "g" }, FAT: { label: "Fat", quantity: 6, unit: "g" }, FIBTG: { label: "Fiber", quantity: 1, unit: "g" }, SUGAR: { label: "Sugar", quantity: 0, unit: "g" } }, image: "https://sisijemimah.com/wp-content/uploads/2016/11/Assorted-Meat-Pepper-Soup-1.jpg" },
    { food: "Nkwobi", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 250, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 18, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 2, unit: "g" }, FAT: { label: "Fat", quantity: 20, unit: "g" }, FIBTG: { label: "Fiber", quantity: 0, unit: "g" }, SUGAR: { label: "Sugar", quantity: 0, unit: "g" } }, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-32KexqJuS6128P87Nz-tbMQasXfvaeKUmg&s" },
    { food: "Isi Ewu", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 280, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 20, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 3, unit: "g" }, FAT: { label: "Fat", quantity: 22, unit: "g" }, FIBTG: { label: "Fiber", quantity: 0, unit: "g" }, SUGAR: { label: "Sugar", quantity: 0, unit: "g" } }, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQWCINc3c2rTptgKlxzZZB8701WDph6yo6nA&s" },
    { food: "Gizdodo", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 220, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 8, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 30, unit: "g" }, FAT: { label: "Fat", quantity: 10, unit: "g" }, FIBTG: { label: "Fiber", quantity: 2, unit: "g" }, SUGAR: { label: "Sugar", quantity: 8, unit: "g" } }, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJs0HIVJd-RW7gcazKxJhmhUO1tgsstJKtKA&s" },
    { food: "Puff Puff", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 80, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 1, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 12, unit: "g" }, FAT: { label: "Fat", quantity: 3, unit: "g" }, FIBTG: { label: "Fiber", quantity: 0.5, unit: "g" }, SUGAR: { label: "Sugar", quantity: 4, unit: "g" } }, image: "https://yummieliciouz.com/wp-content/uploads/2022/08/easy-puff-puff.png" },
    { food: "Buns", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 120, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 2, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 18, unit: "g" }, FAT: { label: "Fat", quantity: 5, unit: "g" }, FIBTG: { label: "Fiber", quantity: 1, unit: "g" }, SUGAR: { label: "Sugar", quantity: 6, unit: "g" } }, image: "https://kikifoodies.com/wp-content/uploads/2025/01/89FFF6E5-4AA0-4563-A84F-1E977AAA21BA.jpeg" },
    { food: "Chin Chin", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 100, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 2, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 15, unit: "g" }, FAT: { label: "Fat", quantity: 4, unit: "g" }, FIBTG: { label: "Fiber", quantity: 0.5, unit: "g" }, SUGAR: { label: "Sugar", quantity: 5, unit: "g" } }, image: "https://cdn.shopify.com/s/files/1/0521/2415/6104/articles/Chin_Chin.jpg?v=1639595235" },
    { food: "Meat Pie", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 250, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 8, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 30, unit: "g" }, FAT: { label: "Fat", quantity: 12, unit: "g" }, FIBTG: { label: "Fiber", quantity: 2, unit: "g" }, SUGAR: { label: "Sugar", quantity: 2, unit: "g" } }, image: "https://kikifoodies.com/wp-content/uploads/2024/12/3A8364CE-2F40-4ABD-BD01-72AF8BF5CDEC.jpeg" },
    { food: "Fish Roll", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 180, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 6, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 22, unit: "g" }, FAT: { label: "Fat", quantity: 7, unit: "g" }, FIBTG: { label: "Fiber", quantity: 1, unit: "g" }, SUGAR: { label: "Sugar", quantity: 2, unit: "g" } }, image: "https://www.yummymedley.com/wp-content/uploads/2015/04/FishRoll-480x270.jpg" },
    { food: "Sausage Roll", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 220, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 7, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 25, unit: "g" }, FAT: { label: "Fat", quantity: 10, unit: "g" }, FIBTG: { label: "Fiber", quantity: 1, unit: "g" }, SUGAR: { label: "Sugar", quantity: 2, unit: "g" } }, image: "https://img.taste.com.au/sGbMHZ-3/taste/2016/11/mini-sausage-rolls-69756-1.jpeg" },
    { food: "Plantain Chips", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 150, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 1, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 20, unit: "g" }, FAT: { label: "Fat", quantity: 7, unit: "g" }, FIBTG: { label: "Fiber", quantity: 2, unit: "g" }, SUGAR: { label: "Sugar", quantity: 8, unit: "g" } }, image: "https://foreignfork.com/wp-content/uploads/2022/02/SweetPlantainChipsFEATURE.jpg" },
    { food: "Coconut Candy", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 110, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 1, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 15, unit: "g" }, FAT: { label: "Fat", quantity: 5, unit: "g" }, FIBTG: { label: "Fiber", quantity: 1, unit: "g" }, SUGAR: { label: "Sugar", quantity: 10, unit: "g" } }, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH9V2YuOsHFruq0QEr9_9IfxLyFQH3LiXWRg&s" },
    { food: "Donkwa (Tanfiri)", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 90, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 2, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 12, unit: "g" }, FAT: { label: "Fat", quantity: 3, unit: "g" }, FIBTG: { label: "Fiber", quantity: 1, unit: "g" }, SUGAR: { label: "Sugar", quantity: 4, unit: "g" } }, image: "https://cdn.guardian.ng/wp-content/uploads/2023/05/dankwa.jpg" },
    { food: "Kuli Kuli", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 100, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 3, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 8, unit: "g" }, FAT: { label: "Fat", quantity: 6, unit: "g" }, FIBTG: { label: "Fiber", quantity: 1, unit: "g" }, SUGAR: { label: "Sugar", quantity: 2, unit: "g" } }, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq8pyfZg5JGCKMn5MtjM8KAKAWfi2SxrosLQ&s" },
    { food: "Boli", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 120, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 1, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 30, unit: "g" }, FAT: { label: "Fat", quantity: 0.5, unit: "g" }, FIBTG: { label: "Fiber", quantity: 2, unit: "g" }, SUGAR: { label: "Sugar", quantity: 8, unit: "g" } }, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdcEoQhd4RDFI0R5NhvLqq5UXOTooBg2rnFA&s" },
    { food: "Roasted Corn and Coconut", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 130, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 2, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 25, unit: "g" }, FAT: { label: "Fat", quantity: 3, unit: "g" }, FIBTG: { label: "Fiber", quantity: 2, unit: "g" }, SUGAR: { label: "Sugar", quantity: 6, unit: "g" } }, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOtHzNskR53xJ06D3_ilwrCI7cNa9zS6hu-Q&s" },
    { food: "Groundnut (Peanuts)", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 160, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 7, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 5, unit: "g" }, FAT: { label: "Fat", quantity: 14, unit: "g" }, FIBTG: { label: "Fiber", quantity: 2, unit: "g" }, SUGAR: { label: "Sugar", quantity: 2, unit: "g" } }, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT70dSMn_Y8f_Q1fYtaaPPSyj5_P0eWcu8u_Q&s" },
    { food: "Alewa (Traditional Candy)", nutrients: { ENERC_KCAL: { label: "Calories", quantity: 90, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 0, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 22, unit: "g" }, FAT: { label: "Fat", quantity: 0, unit: "g" }, FIBTG: { label: "Fiber", quantity: 0, unit: "g" }, SUGAR: { label: "Sugar", quantity: 20, unit: "g" } }, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Toffi_au_lait_%28Bonbon_Africain%29_au_B%C3%A9nin_02.jpg/1200px-Toffi_au_lait_%28Bonbon_Africain%29_au_B%C3%A9nin_02.jpg" },
    // ... (add the rest of your foods here in the same format for brevity)
];

async function searchFood() {
    const query = document.getElementById('foodInput').value.trim();

    if (!query) {
        showError('Please enter a food item to search for.');
        return;
    }

    showLoading();
    clearError();

    try {
        // Use Nutritionix API for live nutrition data
        const apiData = await fetchNutritionData(query);
        if (apiData && Array.isArray(apiData.foods) && apiData.foods.length > 0) {
            // Nutritionix returns an array of foods
            const results = apiData.foods.map(food => ({
                food: food.food_name,
                nutrients: {
                    ENERC_KCAL: { label: "Calories", quantity: food.nf_calories || 0, unit: "kcal" },
                    PROCNT: { label: "Protein", quantity: food.nf_protein || 0, unit: "g" },
                    CHOCDF: { label: "Carbs", quantity: food.nf_total_carbohydrate || 0, unit: "g" },
                    FAT: { label: "Fat", quantity: food.nf_total_fat || 0, unit: "g" },
                    FIBTG: { label: "Fiber", quantity: food.nf_dietary_fiber || 0, unit: "g" },
                    SUGAR: { label: "Sugar", quantity: food.nf_sugars || 0, unit: "g" }
                },
                photo: food.photo // Nutritionix provides a photo object
            }));
            allResults = results;
            displayResults(results);
            updateStats(results);
        } else if (apiData && apiData.message) {
            showError('API error: ' + apiData.message);
            showNoResults();
        } else {
            showError('No nutrition data found for this food.');
            showNoResults();
        }
    } catch (error) {
        console.error('Search error:', error);
        showError('Unable to fetch nutrition data from API. Showing demo data instead.');
        // fallback to demo data
        let results = searchDemoData(query);
        if (!Array.isArray(results)) results = [];
        if (results.length > 0) {
            allResults = results;
            displayResults(results);
            updateStats(results);
        } else {
            showNoResults();
        }
    } finally {
        hideLoading();
    }
}

function searchDemoData(query) {
    const searchTerm = query.toLowerCase();
    return demoNutritionData.filter(item =>
        item.food.toLowerCase().includes(searchTerm) ||
        searchTerm.includes(item.food.toLowerCase())
    );
}

async function fetchNutritionData(query) {
    // Nutritionix Natural Language endpoint
    const url = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-app-id': NUTRITIONIX_APP_ID,
            'x-app-key': NUTRITIONIX_APP_KEY
        },
        body: JSON.stringify({ query })
    });
    if (!response.ok) {
        throw new Error('API request failed');
    }
    const data = await response.json();
    return data;
}

function displayResults(results) {
    const container = document.getElementById('resultsContainer');
    container.innerHTML = '';

    results.forEach(item => {
        const card = createNutritionCard(item);
        container.appendChild(card);
    });

    document.getElementById('noResults').style.display = 'none';
    document.getElementById('statsBar').style.display = 'flex';
}

function createNutritionCard(item) {
    const card = document.createElement('div');
    const calories = item.nutrients.ENERC_KCAL?.quantity || 0;
    const calorieClass = getCalorieClass(calories);

    // Try to get image from Nutritionix API result, else fallback to a placeholder
    let imageUrl = '';
    if (item.image) {
        imageUrl = item.image;
    } else if (item.photo && item.photo.thumb) {
        imageUrl = item.photo.thumb;
    } else {
        // fallback placeholder
        imageUrl = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80';
    }

    card.className = `nutrition-card ${calorieClass}`;
    card.innerHTML = `
        <div class="food-image-container">
            <img class="food-image" src="${imageUrl}" alt="${item.food}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80';">
        </div>
        <div class="food-name">${item.food}</div>
        <div class="nutrition-facts">
            <div class="nutrition-item">
                <div class="nutrition-label">Calories</div>
                <div class="nutrition-value">${Math.round(calories)}</div>
            </div>
            <div class="nutrition-item">
                <div class="nutrition-label">Protein</div>
                <div class="nutrition-value">${Math.round((item.nutrients.PROCNT?.quantity || 0) * 10) / 10}g</div>
            </div>
            <div class="nutrition-item">
                <div class="nutrition-label">Carbs</div>
                <div class="nutrition-value">${Math.round((item.nutrients.CHOCDF?.quantity || 0) * 10) / 10}g</div>
            </div>
            <div class="nutrition-item">
                <div class="nutrition-label">Fat</div>
                <div class="nutrition-value">${Math.round((item.nutrients.FAT?.quantity || 0) * 10) / 10}g</div>
            </div>
            <div class="nutrition-item">
                <div class="nutrition-label">Fiber</div>
                <div class="nutrition-value">${Math.round((item.nutrients.FIBTG?.quantity || 0) * 10) / 10}g</div>
            </div>
            <div class="nutrition-item">
                <div class="nutrition-label">Sugar</div>
                <div class="nutrition-value">${Math.round((item.nutrients.SUGAR?.quantity || 0) * 10) / 10}g</div>
            </div>
        </div>
    `;

    return card;
}

function getCalorieClass(calories) {
    if (calories <= 100) return 'low-calorie';
    if (calories <= 300) return 'medium-calorie';
    return 'high-calorie';
}

function applyFilters() {
    if (allResults.length === 0) return;

    let filteredResults = [...allResults];
    const calorieFilter = document.getElementById('calorieFilter').value;
    const sortFilter = document.getElementById('sortFilter').value;

    // Apply calorie filter
    if (calorieFilter !== 'all') {
        filteredResults = filteredResults.filter(item => {
            const calories = item.nutrients.ENERC_KCAL?.quantity || 0;
            switch (calorieFilter) {
                case 'low': return calories <= 100;
                case 'medium': return calories > 100 && calories <= 300;
                case 'high': return calories > 300;
                default: return true;
            }
        });
    }

    // Apply sorting
    filteredResults.sort((a, b) => {
        switch (sortFilter) {
            case 'calories':
                return (b.nutrients.ENERC_KCAL?.quantity || 0) - (a.nutrients.ENERC_KCAL?.quantity || 0);
            case 'protein':
                return (b.nutrients.PROCNT?.quantity || 0) - (a.nutrients.PROCNT?.quantity || 0);
            case 'carbs':
                return (b.nutrients.CHOCDF?.quantity || 0) - (a.nutrients.CHOCDF?.quantity || 0);
            default:
                return a.food.localeCompare(b.food);
        }
    });

    displayResults(filteredResults);
    updateStats(filteredResults);
}

function updateStats(results) {
    document.getElementById('totalItems').textContent = results.length;

    if (results.length > 0) {
        const avgCalories = results.reduce((sum, item) =>
            sum + (item.nutrients.ENERC_KCAL?.quantity || 0), 0) / results.length;
        const totalProtein = results.reduce((sum, item) =>
            sum + (item.nutrients.PROCNT?.quantity || 0), 0);

        document.getElementById('avgCalories').textContent = Math.round(avgCalories);
        document.getElementById('totalProtein').textContent = Math.round(totalProtein * 10) / 10;
    }
}

function clearResults() {
    allResults = [];
    document.getElementById('resultsContainer').innerHTML = '';
    document.getElementById('foodInput').value = '';
    document.getElementById('calorieFilter').value = 'all';
    document.getElementById('sortFilter').value = 'name';
    document.getElementById('statsBar').style.display = 'none';
    document.getElementById('noResults').style.display = 'none';
    clearError();
}

function showLoading() {
    document.getElementById('loadingIndicator').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loadingIndicator').style.display = 'none';
}

function showError(message) {
    const errorContainer = document.getElementById('errorContainer');
    errorContainer.innerHTML = `<div class="error">${message}</div>`;
}

function clearError() {
    document.getElementById('errorContainer').innerHTML = '';
}

function showNoResults() {
    document.getElementById('noResults').style.display = 'block';
    document.getElementById('statsBar').style.display = 'none';
}

// Enable search on Enter key
document.getElementById('foodInput').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        searchFood();
    }
});

// Load demo data on page load
document.addEventListener('DOMContentLoaded', function () {
    // Optionally load some sample data
    allResults = demoNutritionData.slice(0, 3);
    displayResults(allResults);
    updateStats(allResults);
    renderAllMeals();
});
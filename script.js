let allResults = [];
const NUTRITIONIX_APP_ID = '341bedd2';
const NUTRITIONIX_APP_KEY = '5e7798c261fa11d8546c7cfb1b612831';

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
        showError('Unable to fetch nutrition data. Please check your internet connection and try again.');
        showNoResults();
    } finally {
        hideLoading();
    }
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
    if (item.photo && item.photo.thumb) {
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

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    // Clear any initial state
    clearResults();
});

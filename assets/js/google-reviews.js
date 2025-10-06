// Google Maps Reviews Integration
// This script fetches real reviews from Google Places API

class GoogleReviewsFetcher {
    constructor() {
        this.placeId = 'ChIJN1t_tDeuZo4RrQh8QhQhQhQ'; // Your place ID
        this.apiKey = 'YOUR_GOOGLE_PLACES_API_KEY'; // You'll need to get this
        this.reviews = [];
        this.maxReviews = 6;
    }

    // Initialize the reviews fetcher
    async init() {
        try {
            await this.loadGoogleMapsAPI();
            await this.fetchReviews();
            this.displayReviews();
        } catch (error) {
            console.error('Error loading reviews:', error);
            this.displayFallbackReviews();
        }
    }

    // Load Google Maps JavaScript API
    loadGoogleMapsAPI() {
        return new Promise((resolve, reject) => {
            if (window.google && window.google.maps) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&libraries=places`;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // Fetch reviews from Google Places API
    async fetchReviews() {
        return new Promise((resolve, reject) => {
            const service = new google.maps.places.PlacesService(document.createElement('div'));
            
            const request = {
                placeId: this.placeId,
                fields: ['reviews', 'rating', 'user_ratings_total']
            };

            service.getDetails(request, (place, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && place.reviews) {
                    this.reviews = place.reviews.slice(0, this.maxReviews);
                    this.rating = place.rating;
                    this.totalReviews = place.user_ratings_total;
                    resolve();
                } else {
                    reject(new Error('Failed to fetch reviews'));
                }
            });
        });
    }

    // Display fetched reviews
    displayReviews() {
        const reviewsContainer = document.getElementById('google-reviews-container');
        if (!reviewsContainer) return;

        // Update rating summary
        this.updateRatingSummary();

        // Clear existing reviews
        reviewsContainer.innerHTML = '';

        // Display each review
        this.reviews.forEach(review => {
            const reviewElement = this.createReviewElement(review);
            reviewsContainer.appendChild(reviewElement);
        });
    }

    // Update rating summary with real data
    updateRatingSummary() {
        const ratingScore = document.querySelector('.rating-score');
        const ratingCount = document.querySelector('.rating-count');
        const ratingHighlight = document.querySelector('.rating-highlight');

        if (ratingScore && this.rating) {
            ratingScore.textContent = this.rating.toFixed(1);
        }

        if (ratingCount && this.totalReviews) {
            ratingCount.innerHTML = `Basado en <strong>${this.totalReviews} reseñas</strong> de Google Maps`;
        }

        if (ratingHighlight && this.totalReviews) {
            ratingHighlight.textContent = `¡Más de ${Math.floor(this.totalReviews / 100) * 100} clientes satisfechos!`;
        }
    }

    // Create review element
    createReviewElement(review) {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';

        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        const timeAgo = this.getTimeAgo(review.time);

        reviewCard.innerHTML = `
            <div class="review-header">
                <div class="reviewer-info">
                    <div class="reviewer-avatar">
                        <img src="${review.profile_photo_url || 'assets/images/default-avatar.png'}" 
                             alt="${review.author_name}" 
                             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        <div class="avatar-fallback" style="display: none;">
                            <i class="fas fa-user"></i>
                        </div>
                    </div>
                    <div class="reviewer-details">
                        <h4>${review.author_name}</h4>
                        <div class="review-rating">${stars}</div>
                    </div>
                </div>
                <div class="review-source">
                    <i class="fab fa-google"></i>
                    <span>Google Maps</span>
                </div>
            </div>
            <div class="review-content">
                <p>"${review.text}"</p>
            </div>
            <div class="review-date">${timeAgo}</div>
        `;

        return reviewCard;
    }

    // Get time ago string
    getTimeAgo(timestamp) {
        const now = new Date();
        const reviewDate = new Date(timestamp * 1000);
        const diffTime = Math.abs(now - reviewDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return 'Hace 1 día';
        if (diffDays < 7) return `Hace ${diffDays} días`;
        if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semana${Math.floor(diffDays / 7) > 1 ? 's' : ''}`;
        if (diffDays < 365) return `Hace ${Math.floor(diffDays / 30)} mes${Math.floor(diffDays / 30) > 1 ? 'es' : ''}`;
        return `Hace ${Math.floor(diffDays / 365)} año${Math.floor(diffDays / 365) > 1 ? 's' : ''}`;
    }

    // Display fallback reviews if API fails
    displayFallbackReviews() {
        console.log('Using fallback reviews');
        // Keep existing static reviews as fallback
    }
}

// Alternative: Use Google Places API with fetch (if you have API key)
class GoogleReviewsAPI {
    constructor() {
        this.apiKey = 'YOUR_GOOGLE_PLACES_API_KEY';
        this.placeId = 'ChIJN1t_tDeuZo4RrQh8QhQhQhQ'; // Your actual place ID
    }

    async fetchReviews() {
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/place/details/json?place_id=${this.placeId}&fields=reviews,rating,user_ratings_total&key=${this.apiKey}`
            );
            
            const data = await response.json();
            
            if (data.status === 'OK' && data.result.reviews) {
                return {
                    reviews: data.result.reviews.slice(0, 6),
                    rating: data.result.rating,
                    totalReviews: data.result.user_ratings_total
                };
            }
            
            throw new Error('Failed to fetch reviews');
        } catch (error) {
            console.error('Error fetching reviews:', error);
            return null;
        }
    }

    async displayReviews() {
        const reviewsData = await this.fetchReviews();
        if (!reviewsData) return;

        // Update rating summary
        this.updateRatingSummary(reviewsData);

        // Display reviews
        const reviewsContainer = document.getElementById('google-reviews-container');
        if (!reviewsContainer) return;

        reviewsContainer.innerHTML = '';

        reviewsData.reviews.forEach(review => {
            const reviewElement = this.createReviewElement(review);
            reviewsContainer.appendChild(reviewElement);
        });
    }

    updateRatingSummary(data) {
        const ratingScore = document.querySelector('.rating-score');
        const ratingCount = document.querySelector('.rating-count');
        const ratingHighlight = document.querySelector('.rating-highlight');

        if (ratingScore) {
            ratingScore.textContent = data.rating.toFixed(1);
        }

        if (ratingCount) {
            ratingCount.innerHTML = `Basado en <strong>${data.totalReviews} reseñas</strong> de Google Maps`;
        }

        if (ratingHighlight) {
            ratingHighlight.textContent = `¡Más de ${Math.floor(data.totalReviews / 100) * 100} clientes satisfechos!`;
        }
    }

    createReviewElement(review) {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';

        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        const timeAgo = this.getTimeAgo(review.time);

        reviewCard.innerHTML = `
            <div class="review-header">
                <div class="reviewer-info">
                    <div class="reviewer-avatar">
                        <img src="${review.profile_photo_url || 'assets/images/default-avatar.png'}" 
                             alt="${review.author_name}" 
                             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        <div class="avatar-fallback" style="display: none;">
                            <i class="fas fa-user"></i>
                        </div>
                    </div>
                    <div class="reviewer-details">
                        <h4>${review.author_name}</h4>
                        <div class="review-rating">${stars}</div>
                    </div>
                </div>
                <div class="review-source">
                    <i class="fab fa-google"></i>
                    <span>Google Maps</span>
                </div>
            </div>
            <div class="review-content">
                <p>"${review.text}"</p>
            </div>
            <div class="review-date">${timeAgo}</div>
        `;

        return reviewCard;
    }

    getTimeAgo(timestamp) {
        const now = new Date();
        const reviewDate = new Date(timestamp * 1000);
        const diffTime = Math.abs(now - reviewDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return 'Hace 1 día';
        if (diffDays < 7) return `Hace ${diffDays} días`;
        if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semana${Math.floor(diffDays / 7) > 1 ? 's' : ''}`;
        if (diffDays < 365) return `Hace ${Math.floor(diffDays / 30)} mes${Math.floor(diffDays / 30) > 1 ? 'es' : ''}`;
        return `Hace ${Math.floor(diffDays / 365)} año${Math.floor(diffDays / 365) > 1 ? 's' : ''}`;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // You can use either approach:
    // 1. GoogleReviewsFetcher (requires Google Maps API)
    // 2. GoogleReviewsAPI (requires Places API key)
    
    // For now, we'll use a simpler approach that works without API keys
    // by using the Google Maps embed and extracting data from it
    
    console.log('Google Reviews integration ready');
    
    // You can uncomment this when you have an API key:
    // const reviewsFetcher = new GoogleReviewsAPI();
    // reviewsFetcher.displayReviews();
});

// Export for use in other scripts
window.GoogleReviewsFetcher = GoogleReviewsFetcher;
window.GoogleReviewsAPI = GoogleReviewsAPI;

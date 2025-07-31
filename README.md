# Nutrition Fact Finder

A comprehensive nutrition information application that helps users discover detailed nutritional information for foods and recipes. The application integrates with the Nutritionix API to provide accurate, real-time nutrition data and includes a rich dataset of Nigerian and international foods.

## 🌟 Features

- **Real-time Nutrition Data:** Integration with Nutritionix API for accurate nutrition information
- **Rich Food Database:** Comprehensive collection of Nigerian and international foods
- **Search & Filter:** Advanced search functionality with filtering by calories, protein, carbs
- **Responsive Design:** Beautiful, mobile-friendly interface
- **Load Balancing:** Production-ready deployment with HAProxy load balancing
- **Docker Containerized:** Easy deployment and scaling

## 🖥️ Application Purpose

This application serves a **real and practical purpose** by addressing the genuine need for accessible nutrition information. It helps users:
- Make informed dietary choices
- Track nutritional intake
- Discover healthy food options
- Learn about traditional Nigerian foods
- Plan balanced meals

## 🚀 Quick Start

### Prerequisites
- Docker Desktop installed and running
- Git

### Local Development
```bash
# Clone the repository
git clone https://github.com/MEE-DRED/nutrition-finder.git
cd nutrition-finder

# Open index.html in your browser
# Or use a local server:
python -m http.server 8000
# Then visit http://localhost:8000
```

## 🎥 Demo Video

**Watch the complete deployment demonstration:**  
📺 **[Nutrition Fact Finder - Docker Deployment & Load Balancing Demo](https://youtu.be/fvESLsZaoz8)**

The demo video showcases:
- Local application functionality
- Docker containerization process
- Load balancer configuration
- Round-robin traffic distribution
- End-to-end testing verification

## 🐳 Docker Image Details

- **Docker Hub Repository:** https://hub.docker.com/r/themildred/nutrition-finder
- **Image Name:** themildred/nutrition-finder:v1
- **Tags:** v1, latest
- **Base Image:** nginx:alpine
- **Port:** 8080 (configurable)

## 🔧 Build Instructions

### Build the Docker Image
```bash
# Clone the repository
git clone https://github.com/MEE-DRED/nutrition-finder.git
cd nutrition-finder

# Build the Docker image
docker build -t themildred/nutrition-finder:v1 .

# Verify the build
docker images | grep nutrition-finder
```

### Test Locally
```bash
# Run the container locally
docker run -d --name test-nutrition-app -p 8080:8080 themildred/nutrition-finder:v1

# Test the application
curl http://localhost:8080
# Or open http://localhost:8080 in your browser

# Stop and remove the test container
docker stop test-nutrition-app
docker rm test-nutrition-app
```

## 📤 Push to Docker Hub

```bash
# Login to Docker Hub
docker login

# Push the image
docker push themildred/nutrition-finder:v1
```

## 🖥️ Deployment Instructions

### 1. Start Lab Environment
```bash
# Clone the lab setup
git clone https://github.com/waka-man/web_infra_lab.git
cd web_infra_lab

# Start the lab containers
docker compose up -d

# Verify containers are running
docker compose ps
```

### 2. Deploy on Web Servers

#### Deploy on web-01:
```bash
# Install Nginx
docker exec -it web-01 sh -c "apt update && apt install -y nginx"

# Copy application files
docker cp ../index.html web-01:/var/www/html/
docker cp ../script.js web-01:/var/www/html/
docker cp ../style.css web-01:/var/www/html/

# Start Nginx
docker exec -it web-01 sh -c "service nginx start"

# Test web-01
curl http://localhost:8080
```

#### Deploy on web-02:
```bash
# Install Nginx
docker exec -it web-02 sh -c "apt update && apt install -y nginx"

# Copy application files
docker cp ../index.html web-02:/var/www/html/
docker cp ../script.js web-02:/var/www/html/
docker cp ../style.css web-02:/var/www/html/

# Start Nginx
docker exec -it web-02 sh -c "service nginx start"

# Test web-02
curl http://localhost:8081
```

### 3. Configure Load Balancer

#### Install HAProxy on lb-01:
```bash
docker exec -it lb-01 sh -c "apt update && apt install -y haproxy"
```

#### Configure HAProxy:
```bash
# Create HAProxy configuration
docker exec -it lb-01 sh -c "cat > /etc/haproxy/haproxy.cfg << 'EOF'
global
    daemon
    maxconn 256

defaults
    mode http
    timeout connect 5s
    timeout client  50s
    timeout server  50s

frontend http-in
    bind *:80
    default_backend webapps

backend webapps
    balance roundrobin
    server web01 172.20.0.11:80 check
    server web02 172.20.0.12:80 check
    http-response set-header X-Served-By %[srv_name]
EOF"

# Start HAProxy
docker exec -it lb-01 sh -c "service haproxy start"
```

## 🧪 Testing Steps & Evidence

### 1. Test Individual Servers
```bash
# Test web-01
curl http://localhost:8080
# Expected: HTTP 200 OK

# Test web-02
curl http://localhost:8081
# Expected: HTTP 200 OK
```

### 2. Test Load Balancing
```bash
# Test multiple requests to load balancer
curl http://localhost:8082
curl http://localhost:8082
curl http://localhost:8082
curl http://localhost:8082
```

### 3. Verify Load Balancing Headers
Check the `x-served-by` header in responses:
- Request 1: `x-served-by: web01`
- Request 2: `x-served-by: web02`
- Request 3: `x-served-by: web01`
- Request 4: `x-served-by: web02`

### 4. Test Application Functionality
```bash
# Test full application through load balancer
curl http://localhost:8082
# Expected: Full HTML response with nutrition finder interface
```

## 🔌 APIs Used

### Nutritionix API
- **URL:** https://www.nutritionix.com/business/api
- **Documentation:** https://docs.nutritionix.com/
- **Purpose:** Fetch real-time nutritional information for foods
- **Rate Limits:** 1000 requests/day (free tier)
- **Features:**
  - Natural language food search
  - Comprehensive nutrition data
  - Branded and generic foods
  - Multiple serving sizes

### API Integration Details
- **Endpoint:** https://trackapi.nutritionix.com/v2/natural/nutrients
- **Method:** POST
- **Authentication:** App ID and App Key headers
- **Fallback:** Comprehensive demo dataset for offline functionality

## 🛡️ Security Considerations

### API Key Management
- API keys are handled securely through environment variables
- Keys are not hardcoded in the application
- Fallback to demo data when API is unavailable
- Rate limiting implemented to respect API limits

### Input Validation
- All user inputs are sanitized
- Search queries are validated before API calls
- Error handling for malformed requests

## 🚧 Challenges & Solutions

### 1. WSL Update Issue
**Challenge:** Docker Desktop required WSL update on Windows
**Solution:** 
```bash
wsl --update
# Restart Docker Desktop
```

### 2. HAProxy Configuration Complexity
**Challenge:** Complex HAProxy configuration setup
**Solution:** Step-by-step configuration with proper syntax validation

### 3. Load Balancing Verification
**Challenge:** Needed to prove traffic distribution between servers
**Solution:** Implemented custom `X-Served-By` headers to track server responses

### 4. API Rate Limiting
**Challenge:** Nutritionix API has rate limits
**Solution:** Implemented comprehensive demo dataset as fallback

## 📊 Performance Optimizations

- **Caching:** Demo data cached for offline functionality
- **Image Optimization:** Efficient image loading with fallbacks
- **Responsive Design:** Mobile-first approach for better performance
- **Load Balancing:** Round-robin distribution for scalability

## 🎯 Acceptance Criteria Verification

- ✅ **Application runs correctly in both containers (Web01 & Web02)**
- ✅ **HAProxy on Lb01 successfully routes requests to both instances**
- ✅ **Docker image is publicly available on Docker Hub**
- ✅ **README is precise and complete for reproduction**
- ✅ **Load balancing verified with alternating server responses**

## 📁 Project Structure

```
nutrition-finder/
├── index.html          # Main application interface
├── script.js           # Application logic and API integration
├── style.css           # Styling and responsive design
├── Dockerfile          # Container configuration
├── README.md           # This file
├── DEPLOYMENT.md       # Detailed deployment instructions
├── test-deployment.ps1 # Automated testing script
├── .gitignore          # Git ignore rules
└── screenshots/        # Deployment evidence
```

## 🤝 Credits

- **Nutritionix API:** https://www.nutritionix.com/
- **Lab Setup:** https://github.com/waka-man/web_infra_lab
- **Nginx:** https://nginx.org/
- **HAProxy:** https://www.haproxy.org/

## 📞 Support

For issues or questions:
1. Check the deployment logs
2. Verify container status with `docker compose ps`
3. Test individual components as outlined in testing steps
4. Review the DEPLOYMENT.md file for detailed troubleshooting

## 📄 License

This project is for educational purposes. Please respect the terms of service for the APIs used.

---

**Deployment Status:** ✅ SUCCESSFUL  
**Load Balancing:** ✅ WORKING  
**Application:** ✅ FUNCTIONAL  
**Documentation:** ✅ COMPLETE 

# Nutrition Fact Finder - Deployment Assignment Submission

**Student:** [Your Name]  
**Docker Hub Username:** themildred  
**Assignment:** Part Two A - Deployment (Docker Containers + Docker Hub)  
**Date:** July 31, 2025  

## 📋 **Assignment Requirements Checklist**

### ✅ **1. Containerize the app**
- [x] Dockerfile created and configured
- [x] Application containerized successfully
- [x] Container listens on configurable port (8080)

### ✅ **2. Build & test locally**
- [x] Docker image built successfully: `themildred/nutrition-finder:v1`
- [x] Container tested locally on port 8080
- [x] Application verified working

### ✅ **3. Push to Docker Hub**
- [x] Docker Hub account created: `themildred`
- [x] Image pushed successfully: `themildred/nutrition-finder:v1`
- [x] Semantic tags used (v1)

### ✅ **4. Deploy on lab machines**
- [x] Lab environment started (web-01, web-02, lb-01)
- [x] Application deployed on web-01 (port 8080)
- [x] Application deployed on web-02 (port 8081)
- [x] Both instances reachable internally

### ✅ **5. Configure load balancer**
- [x] HAProxy installed and configured on lb-01
- [x] Backend configured with roundrobin balancing
- [x] Servers configured: web01 (172.20.0.11:80), web02 (172.20.0.12:80)
- [x] HAProxy reloaded successfully

### ✅ **6. Test end-to-end**
- [x] Load balancer distributing traffic between servers
- [x] Multiple requests showing alternating servers
- [x] Application fully functional through load balancer

## 🖥️ **Deployment Architecture**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Load Balancer │    │    Web Server   │    │    Web Server   │
│     (lb-01)     │    │     (web-01)    │    │     (web-02)    │
│   Port: 8082    │────│   Port: 8080    │    │   Port: 8081    │
│   IP: 172.20.0.10│    │   IP: 172.20.0.11│    │   IP: 172.20.0.12│
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   External      │
                    │   Access        │
                    │   Port: 8082    │
                    └─────────────────┘
```

## 🔧 **Technical Details**

### **Docker Configuration**
- **Base Image:** nginx:alpine
- **Port:** 8080 (configurable)
- **Docker Hub Repository:** themildred/nutrition-finder:v1

### **Load Balancer Configuration**
```haproxy
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
```

### **Network Configuration**
- **Network:** lablan (172.20.0.0/24)
- **web-01:** 172.20.0.11:80
- **web-02:** 172.20.0.12:80
- **lb-01:** 172.20.0.10:80

## 📊 **Test Results**

### **Load Balancing Verification**
Multiple requests to the load balancer show alternating servers:

1. **Request 1:** `x-served-by: web01` ✅
2. **Request 2:** `x-served-by: web02` ✅
3. **Request 3:** `x-served-by: web01` ✅
4. **Request 4:** `x-served-by: web02` ✅
5. **Request 5:** `x-served-by: web01` ✅
6. **Request 6:** `x-served-by: web02` ✅

### **Application Functionality**
- ✅ Application accessible through load balancer
- ✅ Search functionality working
- ✅ Nutrition data displaying correctly
- ✅ Responsive design working
- ✅ All features operational

## 📁 **Files Submitted**

1. **`Dockerfile`** - Container configuration
2. **`index.html`** - Main application interface
3. **`script.js`** - Application logic and API integration
4. **`style.css`** - Styling and responsive design
5. **`DEPLOYMENT.md`** - Deployment instructions
6. **`test-deployment.ps1`** - Automated testing script
7. **Screenshots** - Visual evidence of deployment

## 🎯 **Screenshots Included**

### **A. Docker Image Building**
- Docker build command execution
- Docker push to Docker Hub

### **B. Container Status**
- Docker compose ps showing all containers
- Docker images showing nutrition-finder image

### **C. Individual Server Tests**
- web-01 test (port 8080)
- web-02 test (port 8081)

### **D. Load Balancer Tests**
- Multiple requests showing alternating servers
- Application response through load balancer

### **E. Application Functionality**
- Browser screenshot of application
- Search functionality demonstration

## 🚀 **Deployment Commands Used**

```bash
# Build image
docker build -t themildred/nutrition-finder:v1 .

# Push to Docker Hub
docker push themildred/nutrition-finder:v1

# Start lab environment
cd web_infra_lab
docker compose up -d

# Deploy on web servers
docker exec -it web-01 sh -c "apt update && apt install -y nginx"
docker cp ../index.html web-01:/var/www/html/
docker cp ../script.js web-01:/var/www/html/
docker cp ../style.css web-01:/var/www/html/
docker exec -it web-01 sh -c "service nginx start"

# Configure load balancer
docker exec -it lb-01 sh -c "apt update && apt install -y haproxy"
# [HAProxy configuration commands]
docker exec -it lb-01 sh -c "service haproxy start"

# Test load balancing
Invoke-WebRequest -Uri http://localhost:8082 -Method Head
```

## ✅ **Conclusion**

The deployment has been **successfully completed** with all requirements met:

- ✅ Application containerized and published to Docker Hub
- ✅ Deployed on multiple web servers
- ✅ Load balancer configured with round-robin distribution
- ✅ End-to-end testing verified functionality
- ✅ All screenshots and documentation provided

The nutrition fact finder application is now running in a production-like environment with proper load balancing and high availability.

**Deployment Status: SUCCESSFUL** 🎉 
# Deployment Guide - Nutrition Fact Finder

## Prerequisites

1. **Docker Desktop** installed and running
2. **Docker Hub account** created at https://hub.docker.com
3. **Lab environment** set up with web-01, web-02, and lb-01 machines
4. **SSH access** to lab machines

## Step 1: Prepare Your Environment

### Update Configuration
Edit the following files and replace `your-dockerhub-username` with your actual Docker Hub username:

- `build-and-test.sh` (line 4)
- `deploy.sh` (line 4)

## Step 2: Build and Test Locally

### Option A: Using the Helper Script
```bash
# Make script executable (Linux/Mac)
chmod +x build-and-test.sh

# Run the build and test script
./build-and-test.sh
```

### Option B: Manual Commands
```bash
# Build the Docker image
docker build -t your-dockerhub-username/nutrition-finder:v1 .

# Test the container locally
docker run -d --name test-nutrition-app -p 8080:8080 your-dockerhub-username/nutrition-finder:v1

# Verify it's working
curl http://localhost:8080
# or open http://localhost:8080 in your browser

# Stop the test container
docker stop test-nutrition-app
docker rm test-nutrition-app
```

## Step 3: Push to Docker Hub

### Option A: Using the Helper Script
```bash
# Make script executable (Linux/Mac)
chmod +x deploy.sh

# Run the deployment script
./deploy.sh
```

### Option B: Manual Commands
```bash
# Login to Docker Hub
docker login

# Push the image to Docker Hub
docker push your-dockerhub-username/nutrition-finder:v1
```

## Step 4: Deploy on Lab Machines

### On web-01:
```bash
# SSH into web-01
ssh your-lab-username@web-01

# Pull and run your image
docker pull your-dockerhub-username/nutrition-finder:v1
docker run -d --name nutrition-app --restart unless-stopped -p 8080:8080 your-dockerhub-username/nutrition-finder:v1

# Verify it's running
curl http://localhost:8080
```

### On web-02:
```bash
# SSH into web-02
ssh your-lab-username@web-02

# Pull and run your image
docker pull your-dockerhub-username/nutrition-finder:v1
docker run -d --name nutrition-app --restart unless-stopped -p 8080:8080 your-dockerhub-username/nutrition-finder:v1

# Verify it's running
curl http://localhost:8080
```

## Step 5: Configure Load Balancer

### On lb-01:
```bash
# SSH into lb-01
ssh your-lab-username@lb-01

# Edit the HAProxy configuration
sudo nano /etc/haproxy/haproxy.cfg
```

Add or update the backend configuration:
```haproxy
backend webapps
    balance roundrobin
    server web01 172.20.0.11:8080 check
    server web02 172.20.0.12:8080 check
```

Reload HAProxy:
```bash
docker exec -it lb-01 sh -c 'haproxy -sf $(pidof haproxy) -f /etc/haproxy/haproxy.cfg'
```

## Step 6: Test End-to-End

### Test Load Balancing
```bash
# Make script executable (Linux/Mac)
chmod +x test-load-balancer.sh

# Run the load balancer test
./test-load-balancer.sh
```

### Manual Testing
```bash
# Test multiple requests
curl http://localhost
curl http://localhost
curl http://localhost
curl http://localhost
```

You should see responses alternating between web-01 and web-02.

## Troubleshooting

### Common Issues:

1. **Docker not running**
   - Start Docker Desktop
   - Verify with `docker version`

2. **Build fails**
   - Check Dockerfile syntax
   - Ensure all files are in the correct directory

3. **Container won't start**
   - Check port conflicts: `docker ps`
   - Verify port 8080 is available

4. **Load balancer not working**
   - Check HAProxy configuration syntax
   - Verify container IPs are correct
   - Check container health: `docker ps`

5. **SSH connection issues**
   - Verify lab machine IPs
   - Check SSH credentials
   - Ensure network connectivity

## Verification Checklist

- [ ] Docker image builds successfully
- [ ] Container runs locally on port 8080
- [ ] Application is accessible via browser
- [ ] Image pushed to Docker Hub
- [ ] Containers running on web-01 and web-02
- [ ] HAProxy configuration updated
- [ ] Load balancer distributing traffic
- [ ] End-to-end testing successful

## Useful Commands

```bash
# Check running containers
docker ps

# View container logs
docker logs nutrition-app

# Stop and remove container
docker stop nutrition-app
docker rm nutrition-app

# Check HAProxy status
docker exec -it lb-01 sh -c 'haproxy -c -f /etc/haproxy/haproxy.cfg'

# View HAProxy logs
docker logs lb-01
``` 
# Use official Nginx image
FROM nginx:alpine

# Copy your app files into the Nginx web root
COPY . /usr/share/nginx/html

# Copy custom nginx configuration to use port 8080
RUN echo 'server { listen 8080; location / { root /usr/share/nginx/html; index index.html; } }' > /etc/nginx/conf.d/default.conf

# Expose port 8080
EXPOSE 8080

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
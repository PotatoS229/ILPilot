docker build -t udp_ilot_image . 
docker run -d -p 8080:80 --name udp_ilot udp_ilot_image
docker images | grep udp_ilot_image
docker run -it udp_ilot_image:latest /bin/bash
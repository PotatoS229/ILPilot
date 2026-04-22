docker stop $(docker ps -a | grep udp_ilot | awk '{print $1}') 2>/dev/null
docker rm $(docker ps -a | grep udp_ilot | awk '{print $1}') 2>/dev/null
docker rmi udp_ilot_image:latest 
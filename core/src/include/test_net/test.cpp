#include <iomanip>
#if defined (__linux__)
    #include "test.h" // Мой заголовочный файл 
    #include <ostream>
    #include <sys/socket.h> //  Базовые функции сокетов и основные структуры данных
    #include <netinet/in.h> //  Семейства адресов/протоколов AF_INET/PF_INET
    #include <sys/un.h>     //  PF_UNIX/PF_LOCAL
    #include <arpa/inet.h>  //  Предоставляет функции для работы с числовыми IP
    #include <netdb.h>      //  Предоставляет возможности преобразования адресов в числовые значения
    #include <unistd.h>     //  Для корректного закрытия сокетов
    #include <iostream>     // Для работы с консолью
    #include <errno.h>
    #include "linux/netfilter.h"
    //  ioctl блок
    #include <sys/ioctl.h>          //  Для програмного поднятия или отключения сетевых интерфейсов
    #include <ifaddrs.h>            //  Для того что бы узнать IP назначеные ПК
    #include <netpacket/packet.h>   //  Для того что бы видеть кадры
    #include <net/if.h>             //  Для представления имени интерфейса в индекс if_nametoindex()
#elif defined (_WIN32)
        #ifdef _WIN32_WINNT
            #define _WIN32_WINNT 0x0600
        #endif
        #include <winsock2.h>  //  Базовые функции для создания сокетов, отправки и получения
        #include <ws2tcpip.h>  //  Добовляет поддержку современных протоколов и вспомогательных инструментов
        #include <fwpmu.h>     //  Часть WFT платформа фильтрации, 
        #include <fwptypes.h>  //  Содержит опрелделения типов для работы с WFT
        #pragma comment(lib, "ws2_32.lib")
#endif 
//  Определяем макросы 
#if defined (__linux__)
    //  Макрос для закрытия сокета
    #define CLOSESOCKET(s) close(s)
    //  Последняя ошибка
    #define GETSOCKETERRNO() (errno)
#elif defined (_WIN32)
    //  Макрос для закрытия сокета
    #define CLOSESOCKET(s) closesocket(s)
    //последняя ошибка
    #define GETSOCKETERRNO() (WSAGetLastError())
#endif

//  Простарнство имен
namespace test_net {


    // Создаим новую структуру
    struct dataIF {
        int domain;         //  Домен
        int type;           //  Тип сокета
        int protocol;       //  Используемый протокол 
        std::string ip;     //  IP address
        int ip_indexIF;     //  IP index IF
        std::string MAC;    //  MAC address 
        std::string nameIF; //  Имя IF
    };


    //  Определяем функцию зарание
    void printInterFaceInfo(dataIF &if_server);
    

    //  Основная функция
    void test_net_struct::test_net_func(){
        dataIF if_server;  //  создаем новый интерфейс
        if_server = {AF_INET, SOCK_STREAM, PF_INET};

        //  Получаем информацию про IP, MAC , ip_indexIF
        //  Реализация для Linux через ioctl
        #if defined (__linux__)
            printInterFaceInfo(if_server);
        #endif


        


        // Создаим новый сокет, который работает в неблокируещем режиме
        int servIF =  socket(if_server.domain, if_server.type | SOCK_NONBLOCK, if_server.protocol);
        //Вывод ошибок
        if (servIF == -1) {
            std::cerr << "Ошибка в создании сокета сервера" << std::endl;
        } else {
            std::cout << "Сокет создан" << std::endl;
            CLOSESOCKET(servIF); 
        }
    }


    //  Функция для получения информации о сетевом интерфейсе
    void printInterfaceInfo(dataIF &if_server) {
        struct ifaddrs *ifaddr, *ifa;
        if (getifaddrs(&ifaddr) == -1) return;

        for (ifa = ifaddr; ifa != nullptr; ifa = ifa->ifa_next) {
            if (!ifa->ifa_addr) continue;

            // 1. Имя интерфейса
            std::cout << "Interface: " << ifa->ifa_name << std::endl;
            if_server.nameIF = ifa->ifa_name;

            // 2. Индекс интерфейса
            unsigned int index = if_nametoindex(ifa->ifa_name);
            std::cout << "  Index: " << index << std::endl;
            if_server.ip_indexIF = index;

            // 3. IP-адрес (IPv4)
            if (ifa->ifa_addr->sa_family == AF_INET) {
                char ip[INET_ADDRSTRLEN];
                inet_ntop(AF_INET, &((struct sockaddr_in *)ifa->ifa_addr)->sin_addr, ip, INET_ADDRSTRLEN);
                std::cout << "  IP: " << ip << std::endl;
                if_server.ip = ip;
            }

            // 4. MAC-адрес (через ioctl)
            struct ifreq ifr;
            int fd = socket(AF_INET, SOCK_DGRAM, 0);
            strncpy(ifr.ifr_name, ifa->ifa_name, IFNAMSIZ);
            

            if (ioctl(fd, SIOCGIFHWADDR, &ifr) == 0) {
                unsigned char* mac = (unsigned char*)ifr.ifr_hwaddr.sa_data;
                
                // 1. Вывод в консоль (ваш код)
                std::cout << "  MAC: " << std::hex << std::setfill('0');
                for(int i=0; i<6; ++i) std::cout << std::setw(2) << (int)mac[i] << (i==5 ? "" : ":");
                std::cout << std::dec << std::endl;

                // 2. Сохранение в структуру в формате "00:11:22:33:44:55"
                std::stringstream ss;
                ss << std::hex << std::setfill('0');
                for(int i=0; i<6; ++i) {
                    ss << std::setw(2) << (int)mac[i] << (i==5 ? "" : ":");
                }
                if_server.MAC = ss.str(); // Теперь это корректная строка
            }


            close(fd);
        }
        freeifaddrs(ifaddr);
    }


}
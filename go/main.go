package main

import (
    "fmt"
    "log"
    "net/http"

    "github.com/gorilla/websocket"
)

// WebSocket için upgrader oluşturuluyor
var upgrader = websocket.Upgrader{
    ReadBufferSize:  1024,  // Okuma tampon boyutu
    WriteBufferSize: 1024,  // Yazma tampon boyutu
    CheckOrigin: func(r *http.Request) bool {
        return true  // Tüm originleri kabul et
    },
}

// WebSocket işleyicisi
func wsHandler(w http.ResponseWriter, r *http.Request) {
    // WebSocket bağlantısı yükseltiliyor
    conn, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        log.Println(err)
        return
    }
    defer conn.Close()

    // Sürekli olarak mesajları oku
    for {
        _, message, err := conn.ReadMessage()
        if err != nil {
            log.Println(err)
            break
        }
        log.Printf("Received: %s", message)

        // Gelen mesajı HTML sayfasında göster (burada sadece konsola yazdırıyoruz)
        fmt.Printf("<p>%s</p>", message)
    }
}

func main() {
    // WebSocket işleyicisini "/ws" yolunda çalıştır
    http.HandleFunc("/ws", wsHandler)

    // Sunucuyu başlat ve ":8080" portunda dinle
    log.Println("Server started on :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}

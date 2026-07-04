package main

import (
	"fmt"
	"log"
	"net/http"

	"simpleGoShop/backend/internal/config"
	"simpleGoShop/backend/internal/database"
	"simpleGoShop/backend/internal/router"
)

func main() {

	cfg, err := config.Load()
	if err != nil {
		log.Fatal(err)
	}

	db, err := database.Connect(cfg)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	r := router.NewRouter(db)

	addr := fmt.Sprintf(":%s", cfg.AppPort)

	fmt.Println("Server running on", addr)

	log.Fatal(http.ListenAndServe(addr, r))
}
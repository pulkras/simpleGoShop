package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/lib/pq"
)

func main() {
	if len(os.Args) < 2 {
		log.Fatal("Usage: go run main.go user@example.com")
	}

	email := os.Args[1]

	connStr := "postgres://postgres:postgres@127.0.0.1:5432/shop?sslmode=disable"

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// проверка пользователя
	var id int
	var role string

	err = db.QueryRow(
		"SELECT id, role FROM users WHERE email=$1",
		email,
	).Scan(&id, &role)

	if err != nil {
		log.Fatalf("User not found: %v", err)
	}

	// если уже admin
	if role == "admin" {
		fmt.Println("User is already admin")
		return
	}

	// обновление роли
	_, err = db.Exec(
		"UPDATE users SET role='admin' WHERE id=$1",
		id,
	)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("User %s promoted to admin\n", email)
}
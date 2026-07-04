migrate-up:
	migrate -path backend/migrations \
	-database "postgres://postgres:postgres@127.0.0.1:5432/shop?sslmode=disable" up

migrate-down:
	migrate -path backend/migrations \
	-database "postgres://postgres:postgres@127.0.0.1:5432/shop?sslmode=disable" down

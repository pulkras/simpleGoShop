package repository

import "github.com/jmoiron/sqlx"

type OrderRepository struct {
	db *sqlx.DB
}

func NewOrderRepository(db *sqlx.DB) *OrderRepository {
	return &OrderRepository{db: db}
}

func (r *OrderRepository) CreateOrder() (int, error) {
	var id int

	err := r.db.QueryRow(`
		INSERT INTO orders DEFAULT VALUES RETURNING id
	`).Scan(&id)

	return id, err
}

func (r *OrderRepository) CreateItem(orderID, productID, qty int, price float64) error {
	_, err := r.db.Exec(`
		INSERT INTO order_items (order_id, product_id, quantity, price)
		VALUES ($1, $2, $3, $4)
	`, orderID, productID, qty, price)

	return err
}
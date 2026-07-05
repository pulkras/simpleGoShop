package order

import "github.com/jmoiron/sqlx"

type Repository struct {
	db *sqlx.DB
}

func NewRepository(db *sqlx.DB) *Repository {
	return &Repository{db: db}
}

func (r *Repository) CreateOrder(userID int) (int, error) {
	var id int

	err := r.db.QueryRow(`
		INSERT INTO orders (user_id)
		VALUES ($1)
		RETURNING id
	`, userID).Scan(&id)

	return id, err
}

func (r *Repository) CreateItem(orderID, productID, qty int, price float64) error {
	_, err := r.db.Exec(`
		INSERT INTO order_items (order_id, product_id, quantity, price)
		VALUES ($1, $2, $3, $4)
	`, orderID, productID, qty, price)

	return err
}

func (r *Repository) GetOrdersByUser(userID int) ([]OrderItemFull, error) {
	var items []OrderItemFull

	err := r.db.Select(&items, `
		SELECT 
			o.id as order_id,
			oi.product_id,
			p.title,
			oi.quantity,
			oi.price
		FROM orders o
		JOIN order_items oi ON oi.order_id = o.id
		JOIN products p ON p.id = oi.product_id
		WHERE o.user_id = $1
		ORDER BY o.id DESC
	`, userID)

	return items, err
}
package product

import (
	"simpleGoShop/backend/internal/models"

	"github.com/jmoiron/sqlx"
)

type Repository struct {
	db *sqlx.DB
}

func NewRepository(db *sqlx.DB) *Repository {
	return &Repository{db: db}
}

func (r *Repository) GetAll() ([]models.Product, error) {
	var products []models.Product

	err := r.db.Select(&products, `
		SELECT id, title, description, price, stock
		FROM products
		ORDER BY id DESC
	`)

	return products, err
}

func (r *Repository) GetByID(id int) (models.Product, error) {
	var p models.Product

	err := r.db.Get(&p, `
		SELECT id, title, description, price, stock
		FROM products
		WHERE id=$1
	`, id)

	return p, err
}

func (r *Repository) Create(p models.Product) (int, error) {
	var id int

	err := r.db.QueryRow(`
		INSERT INTO products (title, description, price, stock)
		VALUES ($1, $2, $3, $4)
		RETURNING id
	`, p.Title, p.Description, p.Price, p.Stock).Scan(&id)

	return id, err
}

func (r *Repository) Update(id int, p models.Product) error {
	_, err := r.db.Exec(`
		UPDATE products
		SET title=$1, description=$2, price=$3, stock=$4
		WHERE id=$5
	`, p.Title, p.Description, p.Price, p.Stock, id)

	return err
}

func (r *Repository) Delete(id int) error {
	_, err := r.db.Exec(`
		DELETE FROM products WHERE id=$1
	`, id)

	return err
}
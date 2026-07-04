package repository

import (
	"simpleGoShop/backend/internal/models"

	"github.com/jmoiron/sqlx"
)

type ProductRepository struct {
	db *sqlx.DB
}

func NewProductRepository(db *sqlx.DB) *ProductRepository {
	return &ProductRepository{db: db}
}

// GET ALL
func (r *ProductRepository) GetAll() ([]models.Product, error) {
	var products []models.Product

	err := r.db.Select(&products, `
		SELECT id, title, description, price, stock
		FROM products
		ORDER BY id DESC
	`)

	return products, err
}

// GET BY ID
func (r *ProductRepository) GetByID(id int) (models.Product, error) {
	var p models.Product

	err := r.db.Get(&p, `
		SELECT id, title, description, price, stock
		FROM products
		WHERE id=$1
	`, id)

	return p, err
}

// CREATE
func (r *ProductRepository) Create(p models.Product) (int, error) {
	var id int

	err := r.db.QueryRow(`
		INSERT INTO products (title, description, price, stock)
		VALUES ($1, $2, $3, $4)
		RETURNING id
	`, p.Title, p.Description, p.Price, p.Stock).Scan(&id)

	return id, err
}

// UPDATE
func (r *ProductRepository) Update(id int, p models.Product) error {
	_, err := r.db.Exec(`
		UPDATE products
		SET title=$1, description=$2, price=$3, stock=$4
		WHERE id=$5
	`, p.Title, p.Description, p.Price, p.Stock, id)

	return err
}

// DELETE
func (r *ProductRepository) Delete(id int) error {
	_, err := r.db.Exec(`
		DELETE FROM products WHERE id=$1
	`, id)

	return err
}
package auth

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

func (r *Repository) CreateUser(email, passwordHash string) (int, error) {
	var id int

	err := r.db.QueryRow(`
		INSERT INTO users (email, password_hash, role)
		VALUES ($1, $2, 'user')
		RETURNING id
	`, email, passwordHash).Scan(&id)

	return id, err
}

func (r *Repository) GetUserByEmail(email string) (models.User, error) {
	var u models.User

	err := r.db.Get(&u, `
		SELECT id, email, password_hash, created_at, role
		FROM users
		WHERE email=$1
	`, email)

	return u, err
}
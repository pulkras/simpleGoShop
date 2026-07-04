package service

import (
	"simpleGoShop/backend/internal/models"
	"simpleGoShop/backend/internal/repository"
)

type ProductService struct {
	repo *repository.ProductRepository
}

func NewProductService(repo *repository.ProductRepository) *ProductService {
	return &ProductService{repo: repo}
}

func (s *ProductService) GetAll() ([]models.Product, error) {
	return s.repo.GetAll()
}

func (s *ProductService) GetByID(id int) (models.Product, error) {
	return s.repo.GetByID(id)
}

func (s *ProductService) Create(p models.Product) (int, error) {
	return s.repo.Create(p)
}

func (s *ProductService) Update(id int, p models.Product) error {
	return s.repo.Update(id, p)
}

func (s *ProductService) Delete(id int) error {
	return s.repo.Delete(id)
}
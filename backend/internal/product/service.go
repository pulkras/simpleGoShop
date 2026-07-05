package product

import "simpleGoShop/backend/internal/models"

type Service struct {
	repo *Repository
}

func NewService(repo *Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) GetAll() ([]models.Product, error) {
	return s.repo.GetAll()
}

func (s *Service) GetByID(id int) (models.Product, error) {
	return s.repo.GetByID(id)
}

func (s *Service) Create(p models.Product) (int, error) {
	return s.repo.Create(p)
}

func (s *Service) Update(id int, p models.Product) error {
	return s.repo.Update(id, p)
}

func (s *Service) Delete(id int) error {
	return s.repo.Delete(id)
}
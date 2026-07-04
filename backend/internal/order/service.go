package service

import "simpleGoShop/backend/internal/repository"
import "simpleGoShop/backend/internal/models"
type OrderService struct {
	repo *repository.OrderRepository
}

func NewOrderService(repo *repository.OrderRepository) *OrderService {
	return &OrderService{repo: repo}
}

func (s *OrderService) CreateOrder(items []models.OrderItem) (int, error) {
	orderID, err := s.repo.CreateOrder()
	if err != nil {
		return 0, err
	}

	for _, item := range items {
		err := s.repo.CreateItem(orderID, item.ProductID, item.Qty, item.Price)
		if err != nil {
			return 0, err
		}
	}

	return orderID, nil
}
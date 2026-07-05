package order

import "simpleGoShop/backend/internal/models"

type Service struct {
	repo *Repository
}

func NewService(repo *Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) CreateOrder(userID int, items []models.OrderItem) (int, error) {

	orderID, err := s.repo.CreateOrder(userID)
	if err != nil {
		return 0, err
	}

	for _, item := range items {
		err := s.repo.CreateItem(
			orderID,
			item.ProductID,
			item.Qty,
			item.Price,
		)
		if err != nil {
			return 0, err
		}
	}

	return orderID, nil
}

func (s *Service) GetOrders(userID int) ([]OrderResponse, error) {
	rows, err := s.repo.GetOrdersByUser(userID)
	if err != nil {
		return nil, err
	}

	orderMap := make(map[int]*OrderResponse)

	for _, r := range rows {

		if _, ok := orderMap[r.OrderID]; !ok {
			orderMap[r.OrderID] = &OrderResponse{
				OrderID: r.OrderID,
				Items:   []OrderItemDetail{},
			}
		}

		orderMap[r.OrderID].Items = append(
			orderMap[r.OrderID].Items,
			OrderItemDetail{
				ProductID: r.ProductID,
				Title:     r.Title,
				Qty:       r.Qty,
				Price:     r.Price,
			},
		)
	}

	var result []OrderResponse

	for _, o := range orderMap {
		result = append(result, *o)
	}

	return result, nil
}
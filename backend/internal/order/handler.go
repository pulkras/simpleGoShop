package handlers

import (
	"encoding/json"
	"net/http"

	"simpleGoShop/backend/internal/service"
	"simpleGoShop/backend/internal/models"
)

type OrderHandler struct {
	service *service.OrderService
}

func NewOrderHandler(s *service.OrderService) *OrderHandler {
	return &OrderHandler{s}
}

var items []models.OrderItem

func (h *OrderHandler) Create(w http.ResponseWriter, r *http.Request) {
	var items []models.OrderItem

	json.NewDecoder(r.Body).Decode(&items)

	orderID, err := h.service.CreateOrder(items)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	json.NewEncoder(w).Encode(map[string]int{
		"order_id": orderID,
	})
}

func (h *OrderHandler) GetAll(w http.ResponseWriter, r *http.Request) {
	// позже добавим DB fetch
	w.Write([]byte("not implemented yet"))
}
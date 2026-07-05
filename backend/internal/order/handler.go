package order

import (
	"encoding/json"
	"net/http"

	"simpleGoShop/backend/internal/auth"
	"simpleGoShop/backend/internal/models"
)

type Handler struct {
	service *Service
}

func NewHandler(s *Service) *Handler {
	return &Handler{service: s}
}

func (h *Handler) Create(w http.ResponseWriter, r *http.Request) {

	userID := r.Context().Value(auth.UserContextKey)
	if userID == nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	uid := userID.(int)

	var items []models.OrderItem

	if err := json.NewDecoder(r.Body).Decode(&items); err != nil {
		http.Error(w, "invalid request", http.StatusBadRequest)
		return
	}

	orderID, err := h.service.CreateOrder(uid, items)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]int{
		"order_id": orderID,
	})
}

func (h *Handler) GetOrders(w http.ResponseWriter, r *http.Request) {

	userID := r.Context().Value(auth.UserContextKey)
	if userID == nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	uid := userID.(int)

	orders, err := h.service.GetOrders(uid)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if orders == nil {
		orders = []OrderResponse{}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(orders)
}
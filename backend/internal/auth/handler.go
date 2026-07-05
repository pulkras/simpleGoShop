package auth

import (
	"encoding/json"
	"net/http"
)

import "log"

type Handler struct {
	service *Service
}

func NewHandler(s *Service) *Handler {
	return &Handler{s}
}

type registerReq struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type loginReq struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (h *Handler) Register(w http.ResponseWriter, r *http.Request) {
	var req registerReq

	json.NewDecoder(r.Body).Decode(&req)

	id, err := h.service.Register(req.Email, req.Password)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	json.NewEncoder(w).Encode(map[string]int{"user_id": id})
}

func (h *Handler) Login(w http.ResponseWriter, r *http.Request) {
	var req loginReq
	
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "bad request", 400)
		return
	}

	userID, role, err := h.service.Login(req.Email, req.Password)
	if err != nil {
		http.Error(w, "invalid credentials", 401)
		return
	}


	token, err := GenerateToken(userID, role)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	log.Println("ROLE FROM DB:", role)
	log.Println("JWT:", token)

	json.NewEncoder(w).Encode(map[string]string{
		"token": token,
	})


}
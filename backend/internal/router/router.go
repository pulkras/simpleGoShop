package router

import (
	"net/http"

	"simpleGoShop/backend/internal/handlers"
	"simpleGoShop/backend/internal/repository"
	"simpleGoShop/backend/internal/service"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/jmoiron/sqlx"
	"github.com/go-chi/cors"
)

func NewRouter(db *sqlx.DB) http.Handler {

	r := chi.NewRouter()

	// middleware
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	// CORS (frontend React)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
	}))

	// --------------------
	// HEALTH
	// --------------------
	healthHandler := handlers.NewHealthHandler()
	r.Get("/health", healthHandler.Health)

	// --------------------
	// PRODUCTS
	// --------------------
	productRepo := repository.NewProductRepository(db)
	productService := service.NewProductService(productRepo)
	productHandler := handlers.NewProductHandler(productService)

	r.Route("/api/products", func(r chi.Router) {
		r.Get("/", productHandler.GetAll)
		r.Post("/", productHandler.Create)

		r.Route("/{id}", func(r chi.Router) {
			r.Get("/", productHandler.GetByID)
			r.Put("/", productHandler.Update)
			r.Delete("/", productHandler.Delete)
		})
	})

	// --------------------
	// ORDERS
	// --------------------
	orderRepo := repository.NewOrderRepository(db)
	orderService := service.NewOrderService(orderRepo)
	orderHandler := handlers.NewOrderHandler(orderService)

	r.Get("/api/orders", orderHandler.GetAll)
	r.Post("/api/orders", orderHandler.Create)

	return r
}
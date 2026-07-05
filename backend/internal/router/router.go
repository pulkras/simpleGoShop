package router

import (
	"net/http"

	"simpleGoShop/backend/internal/handlers"
	"simpleGoShop/backend/internal/product"
	"simpleGoShop/backend/internal/order"
	"simpleGoShop/backend/internal/auth"

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
    productRepo := product.NewRepository(db)
    productService := product.NewService(productRepo)
    productHandler := product.NewHandler(productService)
	
    r.Route("/api/products", func(r chi.Router) {
	r.Get("/", productHandler.GetAll)
	r.Get("/{id}", productHandler.GetByID)

	r.Group(func(r chi.Router) {
		r.Use(auth.Middleware)
		r.Use(auth.RequireAdmin)

		r.Post("/", productHandler.Create)
		r.Put("/{id}", productHandler.Update)
		r.Delete("/{id}", productHandler.Delete)
	})
    })

	// --------------------
	// ORDERS
	// --------------------
    orderRepo := order.NewRepository(db)
    orderService := order.NewService(orderRepo)
    orderHandler := order.NewHandler(orderService)

	// r.Get("/api/orders", orderHandler.GetAll)
    r.Group(func(r chi.Router) {
	r.Use(auth.Middleware)

	r.Post("/api/orders", orderHandler.Create)
	r.Get("/api/orders", orderHandler.GetOrders)
    })


	authRepo := auth.NewRepository(db)
    authService := auth.NewService(authRepo)
    authHandler := auth.NewHandler(authService)

    r.Post("/api/auth/register", authHandler.Register)
    r.Post("/api/auth/login", authHandler.Login)


    r.Route("/api/admin", func(r chi.Router) {
	r.Use(auth.Middleware)
	r.Use(auth.RequireAdmin)

	r.Post("/products", productHandler.Create)
	r.Put("/products/{id}", productHandler.Update)
	r.Delete("/products/{id}", productHandler.Delete)
})
	

	return r
}
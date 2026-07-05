package order

type OrderResponse struct {
	OrderID int               `json:"order_id"`
	Items   []OrderItemDetail `json:"items"`
}

type OrderItemDetail struct {
	ProductID int     `json:"product_id"`
	Title     string  `json:"title"`
	Qty       int     `json:"qty"`
	Price     float64 `json:"price"`
}

type OrderItemFull struct {
	OrderID   int     `db:"order_id"`
	ProductID int     `db:"product_id"`
	Title     string  `db:"title"`
	Qty       int     `db:"quantity"`
	Price     float64 `db:"price"`
}
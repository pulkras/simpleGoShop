import Button from "../ui/Button";

export default function ProductTable({
    products,
    onEdit,
    onDelete,
}) {
    return (
        <table className="w-full border">

            <thead>

                <tr className="bg-gray-100">

                    <th className="p-3 text-left">
                        Title
                    </th>

                    <th>
                        Price
                    </th>

                    <th>
                        Actions
                    </th>

                </tr>

            </thead>

            <tbody>

                {products.map((product) => (

                    <tr
                        key={product.id}
                        className="border-t"
                    >

                        <td className="p-3">
                            {product.title}
                        </td>

                        <td>
                            ${product.price}
                        </td>

                        <td>

                            <div className="flex gap-2">

                                <Button
                                    onClick={() =>
                                        onEdit(product)
                                    }
                                >
                                    Edit
                                </Button>

                                <Button
                                    variant="danger"
                                    onClick={() =>
                                        onDelete(product)
                                    }
                                >
                                    Delete
                                </Button>

                            </div>

                        </td>

                    </tr>

                ))}

            </tbody>

        </table>
    );
}
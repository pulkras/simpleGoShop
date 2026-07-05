import Button from "../ui/Button";

export default function ConfirmDialog({
    title,
    text,
    onConfirm,
    onCancel,
}) {
    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

            <div className="bg-white rounded-lg p-6 w-96">

                <h2 className="text-xl font-bold mb-4">
                    {title}
                </h2>

                <p className="mb-6">
                    {text}
                </p>

                <div className="flex justify-end gap-3">

                    <Button
                        variant="secondary"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="danger"
                        onClick={onConfirm}
                    >
                        Delete
                    </Button>

                </div>

            </div>

        </div>
    );
}
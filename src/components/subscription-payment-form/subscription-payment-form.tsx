import { FormEvent, useState } from "react"

export default function SubscriptionPaymentForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        email: "",
    })

    const handleInputChange = (event: any) => {
        const { name, value } = event.target
        setFormData((prev: any) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        console.log(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="firstName"
                >
                    Vorname
                </label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Max"
                />
            </div>

            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="lastName"
                >
                    Nachname
                </label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Musterman"
                />
            </div>

            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="address"
                >
                    Addresse
                </label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Hauptstraße 1, 10115 Berlin"
                />
            </div>

            <div className="mb-6">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                >
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="example@example.com"
                />
            </div>
        </form>
    )
}

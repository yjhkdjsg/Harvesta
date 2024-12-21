import React from 'react';

const Inventory = () => {
    // Replace with actual data fetching logic
    const inventoryItems = [
        { id: 1, name: 'Tomatoes', price: '$2/kg', quantity: '50kg', image: 'path/to/tomatoes.jpg' },
        { id: 2, name: 'Potatoes', price: '$1/kg', quantity: '100kg', image: 'path/to/potatoes.jpg' },
    ];

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Inventory</h2>
            <ul className="space-y-2">
                {inventoryItems.map((item) => (
                    <li key={item.id} className="p-4 border border-gray-300 rounded flex items-center space-x-4">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        <div>
                            <p><strong>Item:</strong> {item.name}</p>
                            <p><strong>Price:</strong> {item.price}</p>
                            <p><strong>Quantity:</strong> {item.quantity}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Inventory;
import React from 'react';

const ItemsSold = () => {
    // Replace with actual data fetching logic
    const itemsSold = [
        { id: 1, name: 'Tomatoes', price: '$10', quantity: '5kg', image: 'path/to/tomatoes.jpg' },
        { id: 2, name: 'Potatoes', price: '$8', quantity: '10kg', image: 'path/to/potatoes.jpg' },
    ];

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Items Sold</h2>
            <ul className="space-y-2">
                {itemsSold.map((item) => (
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

export default ItemsSold;
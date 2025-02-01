// src/pages/CartPage.jsx
import React from 'react';
import { List, Button, Card } from 'antd';

const CartPage = ({ cartItems, onRemoveFromCart }) => {
  return (
    <div>
      <h2>Shopping Cart</h2>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={cartItems}
        renderItem={(item) => (
          <List.Item>
            <Card
              title={item.name}
              extra={<Button type="link" onClick={() => onRemoveFromCart(item)}>Remove</Button>}
            >
              <p>Price: ${item.price}</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default CartPage;

import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import './product-card.scss'

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, image, name, description, price }) => {
  return (
    <Card 
      className="product-card"
    >
      <CardMedia
        component="img"
        alt={name}
        height="150"
        image={image}
        title={name}
        sx={{ objectFit: "contain" }}
        className='product-card-image'
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="h6" component="div">
          {price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

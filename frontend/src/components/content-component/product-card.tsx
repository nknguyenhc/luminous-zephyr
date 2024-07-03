import React, { useState } from 'react'
import { Card, CardContent, Typography, CardMedia, Button } from '@mui/material'
import './product-card.scss'
import { styled } from '@mui/system'

interface ProductCardProps {
  id: number
  title: string
  description: string | null
  price_sgd: string | null
  number_sold: number
  category: string
  link: string
  image_url: string
}

const CustomCard = styled(Card)``;

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  price_sgd,
  number_sold,
  category,
  link,
  image_url,
}) => {

  // useState and Functions to handle description displays
  const TITLE_LENGTH_LIMIT = 75;
  const DESCRIPTION_LENGTH_LIMIT = 200;
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  const truncateText = (text: string | null, limit: number) => {
    if (!text) return '';
    return text.length > limit ? `${text.substring(0, limit)}...` : text;
  };

  const formatPrice = (price: string | null) => {
    if (!price) return "Contact Seller for Price";
    const prices = price.split(' - ');
    return prices.length === 2
      ? `$${prices[0]} - $${prices[1]}`
      : `$${prices[0]}`;
  };

  const handleRedirect = () => {
    window.open(link)
  }

  return (
    <CustomCard className="product-card" onClick={handleRedirect}>
      <CardMedia
        component="img"
        alt={title}
        height="200"
        image={image_url}
        title={title}
        sx={{ objectFit: 'contain' }}
        className="product-card-image"
      />
      <CardContent>
        <Typography 
          gutterBottom 
          variant="subtitle1" 
          component="div"
          className='product-card-title'
          >
          {showFullText ? title : truncateText(title, TITLE_LENGTH_LIMIT)}
          
        </Typography>
        <Typography variant="caption" className='product-card-description'>
          {showFullText ? description : truncateText(description, DESCRIPTION_LENGTH_LIMIT)}
          {description && description.length > DESCRIPTION_LENGTH_LIMIT && (
            <Button 
              size='small'
              onClick={(e) => {
                e.stopPropagation(); // Prevent event propagation to Card and redirecting users
                toggleText();
            }
          }>
              {showFullText ? 'Show less' : 'Read more'}
            </Button>
          )}
        </Typography>
        <Typography variant="h6" component="div" className='product-card-price'>
          {formatPrice(price_sgd)}
        </Typography>
      </CardContent>
    </CustomCard>
  )
}

export default ProductCard

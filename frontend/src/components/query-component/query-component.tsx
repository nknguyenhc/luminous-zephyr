import { FormControl, IconButton, Input, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import { ChangeEvent, useState, useCallback } from 'react'
import './query-component.scss'
import { Send } from '@mui/icons-material'
import { useLoading } from '../../context/loading-context'

interface Query {
  description: string;
  categories: string[];
  priceRange: { lower: number; upper: number }
}

type QueryComponentProps = {
  sendQuery: (query: Query) => void;
}

// For MVP. Improvement in performance shall be considered at a later stage.
const categories = [
  "Accessories",
  "Arts & Crafts",
  "Automotive",
  "Bathroom Accessories",
  "Baby Accessories",
  "Fashion",
  "Electronics",
  "Personal Essentials",
  "Food & Beverages",
  "Household Items",
  "Health & Beauty",
  "Jewelry & Watches",
  "Kitchenware",
  "Office Supplies",
  "Sports & Outdoors",
  "Stationery",
  "Toys & Games"
];

export function QueryComponent({ sendQuery }: QueryComponentProps) {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(''); // KEEP IN VIEW
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ lower: 0, upper: 9999 });
  const { setLoading } = useLoading();

  const handleClick = useCallback(
    (query: Query) => {
      setLoading(true)
      sendQuery(query)
    },
    [sendQuery, setLoading]
  )

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleClick({ description, categories: selectedCategories, priceRange })
      }}
      className="query-container"
    >
      <Input
        className="query-input"
        value={description}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setDescription(event.target.value)
        }}
        placeholder="Describe the product"
        disableUnderline={true}
      ></Input>

      <div className="query-row">
        <FormControl>
          <InputLabel>Category</InputLabel>
          <Select
            multiple
            value={selectedCategories}
            onChange={(event: SelectChangeEvent<string[]>) => {
              setSelectedCategories(event.target.value as string[]);
            }}
            className='query-category-select'
          >

          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
            
          </Select>
        </FormControl>

        <TextField
          className="query-price"
          label="Min Price"
          type="number"
          value={priceRange.lower}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setPriceRange({ ...priceRange, lower: parseInt(event.target.value, 10) || 0});
          }}
        />
        <TextField
          className="query-price"
          label="Max Price"
          type="number"
          value={priceRange.upper}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setPriceRange({ ...priceRange, upper: parseInt(event.target.value, 10) || 0});
          }}
        />
      </div>
      
      <IconButton
        type="submit"
        className="query-send-icon-button"
        aria-label="send"
      >
        <Send />
      </IconButton>
    </form>
  )
}

import { FormControl, IconButton, Input, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import { ChangeEvent, useState, useCallback } from 'react'
import './query-component.scss'
import { Send } from '@mui/icons-material'
import { useLoading } from '../../context/loading-context'

interface Query {
  description: string;
  category: string | undefined;
  priceRange: {
    lower: number | string;
    upper: number | string;
  };
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
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined); 
  const [priceRange, setPriceRange] = useState<
    { lower: number | string; 
      upper: number | string 
    }>
    ({ lower: '', upper: '' });
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
        handleClick({ description, category: selectedCategory, priceRange })
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
            value={selectedCategory || ''}
            onChange={(event: SelectChangeEvent<string>) => {
              setSelectedCategory(event.target.value || undefined);
            }}
            onClick={ (clickEvent) => {
              if ((clickEvent.target as HTMLOptionElement).selected === true) {
                setSelectedCategory(undefined);
              }
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
          inputProps={{ step: "0.01", min: "0"}}
          value={priceRange.lower !== undefined ? priceRange.lower : ''}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setPriceRange({ ...priceRange, lower: event.target.value === '' ? '' : parseFloat(event.target.value) });
          }}
        />
        <TextField
          className="query-price"
          label="Max Price"
          type="number"
          inputProps={{ step: "0.01", min: "0" }}
          value={priceRange.upper !== undefined ? priceRange.upper : ''}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setPriceRange({ ...priceRange, upper: event.target.value === '' ? '' : parseFloat(event.target.value) });
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

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  colors: string[];
  storage: string[];
  category: string;
  isNew?: boolean;
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor: string;
  selectedStorage: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'iphone-17-pro',
    name: 'iPhone 17 Pro',
    price: 1199,
    description: 'The future of mobile technology. Featuring the A19 Bionic chip and a revolutionary holographic display.',
    image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=800',
    colors: ['Solar Orange', 'Pearl White', 'Obsidian Black', 'Titanium Silver'],
    storage: ['256GB', '512GB', '1TB', '2TB'],
    category: 'Pro',
    isNew: true,
    rating: 5.0,
    reviews: 0
  },
  {
    id: 'iphone-16-pro',
    name: 'iPhone 16 Pro',
    price: 999,
    description: 'The ultimate iPhone with the A18 Pro chip and Apple Intelligence.',
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800',
    colors: ['Titanium Black', 'Titanium White', 'Natural Titanium', 'Desert Titanium'],
    storage: ['128GB', '256GB', '512GB', '1TB'],
    category: 'Pro',
    isNew: true,
    rating: 4.9,
    reviews: 1240
  },
  {
    id: 'iphone-16',
    name: 'iPhone 16',
    price: 799,
    description: 'A total powerhouse with the new Action button and Camera Control.',
    image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=800',
    colors: ['Black', 'White', 'Pink', 'Teal', 'Ultramarine'],
    storage: ['128GB', '256GB', '512GB'],
    category: 'Standard',
    isNew: true,
    rating: 4.8,
    reviews: 850
  },
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    price: 899,
    description: 'Forged in titanium. Featuring the ground-breaking A17 Pro chip.',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800',
    colors: ['Black Titanium', 'White Titanium', 'Blue Titanium', 'Natural Titanium'],
    storage: ['128GB', '256GB', '512GB', '1TB'],
    category: 'Pro',
    rating: 4.9,
    reviews: 3200
  },
  {
    id: 'iphone-15',
    name: 'iPhone 15',
    price: 699,
    description: 'Dynamic Island comes to iPhone 15. New 48MP Main camera.',
    image: 'https://images.unsplash.com/photo-1695048132867-2a226915855f?auto=format&fit=crop&q=80&w=800',
    colors: ['Pink', 'Yellow', 'Green', 'Blue', 'Black'],
    storage: ['128GB', '256GB', '512GB'],
    category: 'Standard',
    rating: 4.7,
    reviews: 2100
  },
  {
    id: 'iphone-14',
    name: 'iPhone 14',
    price: 599,
    description: 'Big and bigger. Impressive all-day battery life.',
    image: 'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?auto=format&fit=crop&q=80&w=800',
    colors: ['Midnight', 'Starlight', 'Blue', 'Purple', 'Red'],
    storage: ['128GB', '256GB', '512GB'],
    category: 'Standard',
    rating: 4.6,
    reviews: 4500
  }
];

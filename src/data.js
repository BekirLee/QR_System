
const sampleProduct = {
  id: 1,
  name: "Pancake Stack",
  image: "/img/image.png", 
  deliveryTime: 10,
  rating: 4.8,
  price: 12.50
};

export const products = Array(8).fill(null).map((_, index) => ({
  ...sampleProduct,
  id: index + 1,
}));

export const categories = [
  "Şəhər yeməyi",
  "Nahar",
  "İçkilər",
  "Desertlər",
  "Salatlar"
];
import { useState, useEffect } from "react";
import getAllProducts from "../../services/getAllProducts";
import CardList from "../../components/CardList/CardList";
import Navbar from "../../components/Navbar/Navbar";
import RadioButton from "../../components/RadioButton/RadioButton";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterValue, setFilterValue] = useState("all");

  // Ambil semua produk saat komponen dimuat
  useEffect(() => {
    const allProducts = getAllProducts();
    setProducts(allProducts.length > 0 ? allProducts : []);
  }, []);

  // Filter produk berdasarkan kategori
  useEffect(() => {
    if (filterValue === "all") {
      setFilteredProducts(products); // Semua produk
    } else {
      setFilteredProducts(
        products.filter((prod) => prod.category === filterValue)
      );
    }
  }, [filterValue, products]);

  // Opsi filter kategori
  const RadioButtonOpts = [
    { label: "All", value: "all" },
    { label: "Cable", value: "Cable" },
    { label: "Wireless", value: "Wireless" },
  ];

  return (
    <>
      <Navbar />
      <div className="px-24 py-4 gap-4 mt-4 flex-wrap">
        <h3 className="font-medium">Filter</h3>
        <div className="flex gap-2 flex-wrap">
          <RadioButton
            options={RadioButtonOpts}
            defaultValue={"all"}
            onChange={(value) => setFilterValue(value)} // Update filterValue saat pilihan berubah
          />
        </div>
      </div>
      <section className="container px-24 py-4">
        <main>
          {/* Kirim produk yang telah difilter */}
          <CardList products={filteredProducts} />
        </main>
      </section>
    </>
  );
}

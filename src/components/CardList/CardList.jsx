import PropTypes from "prop-types";
import Card from "../Card/Card";

export default function CardList({ products }) {
  // Group products by `category`
  const groupedProducts = products.reduce((acc, product) => {
    const groupKey = product.category; // Group by category
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(product);
    return acc;
  }, {});

  return (
    <div>
      {Object.keys(groupedProducts).length > 0 ? (
        Object.entries(groupedProducts).map(([category, items]) => (
          <div key={category} style={{ marginBottom: "20px" }}>
            <h3>{category}</h3> {/* Display the category name */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px", // Adds spacing between items
              }}
            >
              {items.map((product, index) => (
                <div style={{ flex: "1 1 calc(25% - 20px)" }} key={product.id + index}>
                  <Card product={product} index={index} />
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No Product Found.</p>
      )}
    </div>
  );
}

CardList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};

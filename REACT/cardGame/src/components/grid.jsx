/* eslint-disable react/prop-types */
const Grid = ({ images, rerend }) => {
  return (
    <>
      <div className="grid grid-cols-[200px,200px,200px,200px] grid-rows-[200px,200px] gap-4">
        {images.map((image, index) => (
          <div key={index} className="card bg-primary w-full shadow-xl">
            <img
              onClick={() => rerend(index)} // Pass index to the rerend function
              src={image}
              alt={`memory card ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Grid;

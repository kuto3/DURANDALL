// components/Skeleton.tsx
const Skeleton = ({ width = '100%', height = '20px', className = '' }) => {
    return (
      <div
        className={`bg-gray-600 animate-pulse ${className}`}
        style={{ width, height }}
      />
    );
  };
  
  export default Skeleton;
  
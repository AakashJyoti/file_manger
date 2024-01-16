const Loading = () => {
  return (
    <div className="absolute top-0 right-0 w-full h-full z-50 bg-[rgba(0,0,0,0.86)] flex justify-center items-center ">
      <span className="loader w-12 h-12 relative rounded-full before:inset-0 after:inset-2 before:box-border after:box-border before:absolute after:absolute before:rounded-full after:rounded-full"></span>
    </div>
  );
};

export default Loading;

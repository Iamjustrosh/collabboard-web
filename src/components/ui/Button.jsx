export default function Button({ children, onClick, type = "button", className = "" }) {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`bg-[#018FCC] text-white px-5 py-2 rounded-md hover:bg-[#00496E] transition ${className}`}
      >
        {children}
      </button>
    );
  }
  
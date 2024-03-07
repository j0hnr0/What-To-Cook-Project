import Image from "next/image";

export default function RecipeImage({ img, onClick, onFocus }) {
  return (
    <Image
      onClick={onClick}
      className={
        onFocus
          ? "rounded-[15px] scale-110 transition duration-500 ease-in-out transform z-50 border-2 border-[#ea580c]"
          : "cursor-pointer border-2 border-[black] rounded-[15px] scale-1 transition transform duration-500 ease-in-out"
      }
      src={img}
      width={350}
      height={350}
      alt="recipe image"
    />
  );
}

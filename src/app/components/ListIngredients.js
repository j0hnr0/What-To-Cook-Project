export default function ListIngredients({ name }) {
  return <li style={{fontSize: "clamp(0.875rem, 0.743rem + 0.563vw, 1.25rem)"}} className="text-start">&bull; {name}</li>;
}
// md:text-[20px] text-[14px]
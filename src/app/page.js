"use client";

import ListIngredients from "./components/ListIngredients";
import { useState } from "react";
import RecipeImage from "./components/RecipeImage";
import { fetchData } from "./api/fetchData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEffect } from "react";

export default function Home() {
  const [img, setImg] = useState();
  const [img1, setImg1] = useState();
  const [img2, setImg2] = useState();
  const [ingredients, setIngredients] = useState("");
  const [title, setTitle] = useState("Results will be shown here...");
  const [missedIngredients, setMissedIngredients] = useState([]);
  const [usedIngredients, setUsedIngredients] = useState([]);
  const [unusedIngredients, setUnusedIngredients] = useState([]);
  const [focus, setFocus] = useState(0);
  const [rawData, setRawData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [swipe, setSwipe] = useState(false);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
      setSwipe(true);
    });
  }, [api]);


  if (swipe) {
    if (rawData.length > 0) {
      setFocus(current - 1);
      setTitle(rawData[current - 1].title);
      setMissedIngredients(rawData[current - 1].missedIngredients);
      setUsedIngredients(rawData[current - 1].usedIngredients);
      setUnusedIngredients(rawData[current - 1].unusedIngredients);
    }
    setSwipe(false);
  }


  function handleClick(index) {
    setFocus(index);
    setTitle(rawData[index].title);
    setMissedIngredients(rawData[index].missedIngredients);
    setUsedIngredients(rawData[index].usedIngredients);
    setUnusedIngredients(rawData[index].unusedIngredients);
  }

  async function result(e) {
    e.preventDefault();
    setIsLoading(true);
    const data = await fetchData(ingredients);
    setIsLoading(false);
    setRawData(data);
    setImg(data[0].image);
    setImg1(data[1].image);
    setImg2(data[2].image);
    setTitle(data[focus].title);
    setMissedIngredients(data[focus].missedIngredients);
    setUsedIngredients(data[focus].usedIngredients);
    setUnusedIngredients(data[focus].unusedIngredients);
    setIngredients("");
  }

  return (
    <main className="lg:px-0 px-[15px] py-[20px] flex flex-col justify-center items-center">
      <h1 style={{fontSize: "clamp(1.875rem, 1.655rem + 0.939vw, 2.5rem)"}} className="text-white">What to Cook</h1>
      <h1 style={{fontSize: "clamp(1.25rem, 1.03rem + 0.939vw, 1.875rem)"}} className="text-white text-center mt-[20px]">
        "{title}"
      </h1>
      <section className="md:flex hidden justify-center items-start gap-[20px] mt-[30px]">
        <RecipeImage
          onClick={img ? () => handleClick(0) : null}
          onFocus={focus === 0}
          img={img ? img : "/love.jpg"}
        />
        <RecipeImage
          onClick={img ? () => handleClick(1) : null}
          onFocus={focus === 1}
          img={img1 ? img1 : "/love.jpg"}
        />
        <RecipeImage
          onClick={img ? () => handleClick(2) : null}
          onFocus={focus === 2}
          img={img2 ? img2 : "/love.jpg"}
        />
      </section>

      <Carousel setApi={setApi} className="md:hidden w-full mt-[20px]">
        <CarouselContent>
          <CarouselItem className="flex justify-center">
            <RecipeImage onFocus={focus === 0} img={img ? img : "/love.jpg"} />
          </CarouselItem>
          <CarouselItem className="flex justify-center">
            <RecipeImage
              onFocus={focus === 1}
              img={img1 ? img1 : "/love.jpg"}
            />
          </CarouselItem>
          <CarouselItem className="flex justify-center">
            <RecipeImage
              onFocus={focus === 2}
              img={img2 ? img2 : "/love.jpg"}
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
      <div className="md:hidden text-center mt-[10px]">
        <p className="text-white text-[16px]">
          Slide {current} of {count}
        </p>
      </div>

      <section className="flex justify-center items-start lg:gap-[80px] gap-[30px] mt-[30px]">
        <div className="text-white flex flex-col justify-center items-center">
          <ul>
            <h1 style={{fontSize: "clamp(1rem, 0.802rem + 0.845vw, 1.563rem)"}} className="text-white">Missed Ingredients</h1>
            {missedIngredients.map((item) => (
              <ListIngredients key={item.id} {...item} />
            ))}
          </ul>
        </div>
        <div className="text-white flex flex-col justify-center items-center">
          <ul>
            <h1 style={{fontSize: "clamp(1rem, 0.802rem + 0.845vw, 1.563rem)"}} className="text-white">Used Ingredients</h1>
            {usedIngredients.map((item) => (
              <ListIngredients key={item.id} {...item} />
            ))}
          </ul>
        </div>
        <div className="text-white flex flex-col justify-center items-center">
          <ul>
            <h1 style={{fontSize: "clamp(1rem, 0.802rem + 0.845vw, 1.563rem)"}} className="text-white">Unused Ingredients</h1>
            {unusedIngredients.map((item) => (
              <ListIngredients key={item.id} {...item} />
            ))}
          </ul>
        </div>
      </section>

      <form
        className="mt-[20px] md:flex-row flex-col flex  justify-center items-center gap-[10px] w-full"
        onSubmit={result}
      >
        <textarea
          className="lg:w-[1140px] w-full p-[5px] rounded-[15px] border-[3px] border-[#ea580c]"
          required
          placeholder="Enter your ingredients seperated by space or comma..."
          name="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          id=""
          disabled={isLoading}
        ></textarea>
        <button
          type="submit"
          disabled={isLoading}
          className={
            !isLoading
              ? "text-[18px] bg-red-600 rounded-[15px] w-[120px] py-[10px] border-[3px] border-[#ea580c] hover:bg-red-700 hover:font-bold transition duration-500 ease-in-out transform hover:scale-110"
              : "text-[18px] bg-red-600 opacity-[0.6] rounded-[15px] w-[120px] py-[10px] border-[3px] border-[#ea580c]"
          }
        >
          {isLoading ? "Searching..." : "Submit"}
        </button>
      </form>
    </main>
  );
}

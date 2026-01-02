import ScratchCard from "@/components/about/ScratchCard";
import DragComponent from "../../components/about/DragComponent";
import CDPlayer from "@/components/about/CDPlayer";
import HoverBook from "@/components/about/Book";
import bookCover from "../../assets/bookCover.webp";
import Photograph from "../../components/about/Photograph";
import Hero from "@/components/about/Hero";

export default function About() {
  return (
    <div>
      <div className="w-full h-[60vh] flex items-center justify-center p-10 overflow-hidden">
        {/* <DragComponent />
      <br />
      <ScratchCard width={340} height={200}>
        <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl font-bold text-white rounded-xl">
          🎉 YOU WON ₹1,000!
        </div>
      </ScratchCard> */}
        {/* <CDPlayer title="Atomic Habits" cover={bookCover} /> */}
        {/* <HoverBook title="Atomic Habits" cover={bookCover} /> */}
        {/* <Photograph src={bookCover.src} caption="Winter Escape" /> */}
      </div>
      <Hero />
    </div>
  );
}

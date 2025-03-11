import Card1 from "./Card1";
import RotatingText from "./ui/RotatingText";
export default function First() {
  return (
    <section className="w-full mt-10">
        <h1 className="px-5 sm:px-10 text-xl sm:text-3xl font-bold text-center w-full mb-4 flex items-center justify-center gap-2">Magasin
        <RotatingText
            texts={['Unique', 'Varié',]}
            mainClassName="px-2 sm:px-2 md:px-3 bg-black text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
            />
            </h1>
        <div className="first w-full px-5 sm:px-10">
            <Card1/>
            <Card1/>
            <Card1/>
            <Card1/>
            <Card1/>
            <Card1/>
            <Card1/>
            <Card1/>
            <Card1/>
            <Card1/>
        </div>
    </section>
  )
}

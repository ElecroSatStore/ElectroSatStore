
export default function First({img}) {
  return (
    <div className="w-full md:w-5/12 relative">
    <div className="w-full sticky top-18">
        <img src={img} alt="product" className="w-full h-[100vw] sm:h-[500px] rounded-xl object-cover"/>
    </div>
</div>


  )
}

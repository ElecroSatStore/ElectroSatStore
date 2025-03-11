import Footer from "../Footer";
import Nav from "../Nav";


export default function One({children}) {
  return (
    <>
     <Nav/>
        {children}
    <Footer/>
    </>
  )
}

import { footerLinks } from "../constants"
import { styles } from "../styles"

const FooterSection = ({ title, subcontent }) => {
  return (
    <div className="lg:w-[15vw] w-[40vw] m-10">
      <h2 className="text-[25px] font-bold">
        {title}
      </h2>
      <div className="w-full h-[3px] bg-black mb-5"></div>
      {subcontent}
    </div>
  )
}

const Footer = () => {
  return (
    <div className="bg-white w-full">
      <div className={`${styles.padding} max-w-7xl mx-auto flex flex-col items-center justify-center lg:items-start lg:flex-row`}>
        <FooterSection 
          title="NEGOCIO +"
          subcontent={
            <p className="text-[20px] opacity-80">Transformando pequeñas empresas con el poder de la IA</p>
          }
        />
        <FooterSection 
          title="ENLACES"
          subcontent={
            <ul>
              {footerLinks.map((link) => (
                <li key={link.title} className="mb-2">
                  <a href={link.to} className="text-[20px] opacity-80">{link.title}</a>
                </li>
              ))}
            </ul>
          }
        />
        <FooterSection 
          title="LEGAL"
          subcontent={
            <>
              <p className="text-[20px] opacity-80 mb-2">Términos y Condiciones</p>
              <p className="text-[20px] opacity-80 mb-2">Políticas de Privacidad</p>
            </>
          }
        />
        <FooterSection 
          title="SIGUENOS"
          subcontent={
            <p className="text-[20px] opacity-80">Facebook</p>
          }
        />
      </div>
    </div>
  )
}

export default Footer

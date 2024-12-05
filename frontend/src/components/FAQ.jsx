import { faqItems } from "../constants";
import { SectionWrapper } from "../hoc"
import { styles } from "../styles";

import Accordion from "./Accordion"

const FAQ = () => {
  return (
    <>
      <div className={`${styles.paddingY} flex flex-col`}>
        <p className="sm:text-[26px] text-[18px] text-secondary uppercase tracking-wider">
          ¿Tienes dudas?
        </p>
        <h3 className="text-white font-black md:text-[40px] sm:text-[30px] xs:text-[40px] text-[30px] pb-16">
          Preguntas Frecuentes
        </h3>
        <Accordion items={faqItems} />
      </div>
    </>
  )
}

export default SectionWrapper(FAQ, "faq")

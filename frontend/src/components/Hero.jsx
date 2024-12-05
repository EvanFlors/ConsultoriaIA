import { evaluationScale, features } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import Test from "./Chat";

const Feature = ({ iconSrc, title, description }) => (
  <div className="flex items-start gap-4">
    <img
      src={iconSrc}
      alt={title}
      className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px]"
    />
    <div>
      <p className="text-[16px] lg:text-[20px] font-semibold">{title}</p>
      <p className="text-[14px] lg:text-[18px] opacity-70">{description}</p>
    </div>
  </div>
);

const Hero = () => {
  return (
    <div className="grid grid-cols-12 gap-6 mt-10 pt-16">
      <div className="col-span-8 bg-white rounded-xl shadow-lg flex flex-col max-h-[850px]">
        <Test />
      </div>

      <div className="col-span-4 grid grid-rows-12 gap-6 lg:gap-8">
        <div className="row-span-7 bg-white rounded-xl p-4 lg:p-5">
          <h3 className="text-[20px] lg:text-[23px] font-semibold mb-6 lg:mb-8">
            ¿Por qué Negocio+?
          </h3>
          <div className="grid gap-y-4">
            {features.map((feature, index) => (
              <Feature key={index} {...feature} />
            ))}
          </div>
        </div>

        <div className="row-span-5 bg-white rounded-xl p-4 lg:p-5">
          <h3 className="text-[20px] lg:text-[23px] font-semibold mb-4 lg:mb-6">
            Escala de evaluación
          </h3>
          <div className="flex flex-col gap-4 lg:gap-6">
            {evaluationScale.map(({ label, text }, index) => (
              <p key={index} className="text-[16px] lg:text-[20px] opacity-80">
                <span className="font-bold">{label}:&nbsp;</span>
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Hero, "hero");

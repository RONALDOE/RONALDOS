import MyPhoto from "@assets/My Photo.jpg";



export default function MyInfo() {

const habilites = [{ src: "https://img.icons8.com/fluency/256/javascript.png", alt: "JavaScript" },
  { src: "https://img.icons8.com/fluency/256/mysql-logo.png", alt: "MySQL" },
  { src: "https://img.icons8.com/office/266/react.png", alt: "ReactJS" },
  { src: "https://img.icons8.com/fluency/256/node-js.png", alt: "NodeJS" },
  { src: "https://img.icons8.com/color/256/typescript.png", alt: "TypeScript" },
  { src: "https://img.icons8.com/color/256/mongodb.png", alt: "MongoDB" },
  { src: "https://img.icons8.com/color/256/vue-js.png", alt: "VueJS" },
  { src: "https://img.icons8.com/color/256/amazon-web-services.png", alt: "AWS" },
  { src: "https://img.icons8.com/color/256/figma--v1.png", alt: "Figma" },
  { src: "https://img.icons8.com/external-those-icons-lineal-color-those-icons/256/external-SQL-development-files-those-icons-lineal-color-those-icons.png", alt: "MSSQL" },
  { src: "https://img.icons8.com/color/256/nextjs.png", alt: "NextJS", additionalClass: "invert" },
  { src: "https://img.icons8.com/external-those-icons-flat-those-icons/256/external-Linux-logos-and-brands-those-icons-flat-those-icons.png", alt: "Linux" },]

  return (
 
      <div className="flex flex-col gap-2 items-center justify-center">
        <p className="text-center text-3xl font-bold mb-2">FullStack Developer</p>
        <p className="text-center text-xl font-semibold ">Ronaldo Suero</p>
        <img
          src={MyPhoto}
          className="w-24 h-24 rounded-full object-cover shadow-md mb-6"
          alt="Profile"
        />
        <div className="grid grid-cols-3 grid-rows-4 gap-4">
          {habilites.map((tech, index) => (
            <div key={index} className="relative group flex justify-center items-center">
              <img
                src={tech.src}
                alt={tech.alt}
                className={`w-12 h-12 object-contain transition-transform transform hover:scale-110 ${tech.additionalClass ?? ""}`}
              />
              <span className="absolute bottom-0 bg-black bg-opacity-75 text-xs text-white py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {tech.alt}
              </span>
            </div>
          ))}
        </div>
      </div>  

  );
}

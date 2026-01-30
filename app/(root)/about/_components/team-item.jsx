import Image from "next/image";

const TeamItem = ({ item }) => {
  return (
    <div className="group transition-all duration-500 ease-in-out hover:-translate-y-3 relative team-card">
      
      {/* Image wrapper */}
      <div className="relative overflow-hidden rounded-[12px]">
        <Image
          className="w-full"
          src={item.image}
          width={315}
          height={340}
          alt={item.name}
        />

        {/* Hover overlay */}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 opacity-0 transition-all duration-500 group-hover:opacity-100 team-card-overlay"></div>
        
        {/* Overlay text */}
        <div className="absolute inset-0 flex items-center justify-center   transition-transform duration-500 ease-in-out rounded-[12px] team-card-text">
          <p className="text-white text-base md:text-lg font-semibold tracking-wide px-5">
            {item?.overlayText}
          </p>
        </div>
      </div>

      {/* Info box */}
      <div className="bg-white -mt-8 relative mx-[20px] text-center rounded-[8px] shadow-theme py-3">
        <h4 className="lg:text-[24px] text-[20px] font-semibold">
          {item.name}
        </h4>
        <p className="text-pg">{item.designation}</p>
      </div>
    </div>
  );
};

export default TeamItem;

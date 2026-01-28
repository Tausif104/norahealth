import Image from "next/image";

const TeamItem = ({ item }) => {
  return (
    <div className="group transition duration-300 hover:-translate-y-3 relative">
      
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
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center 
                        opacity-0 group-hover:opacity-100 transition duration-300 rounded-[12px]">
          <p className="text-white text-lg font-semibold tracking-wide">
            Text 
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

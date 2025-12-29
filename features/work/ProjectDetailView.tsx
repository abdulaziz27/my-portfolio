import Image from "next/image";
import { projects } from "@/features/work/projectData";
import { notFound } from "next/navigation";

export default function ProjectDetailView({ id }: { id: string }) {
  const project = projects.find((p) => p.id === Number(id));

  if (!project) return notFound();

  return (
    <div className="flex flex-col md:flex-row min-h-[600px]">
      {/* Image Side */}
      <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-auto border-r border-white/10">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        
        <div className="absolute bottom-6 left-6">
            <span className="text-accent font-mono text-xs tracking-[0.2em] uppercase bg-black/50 px-2 py-1 backdrop-blur-md border border-accent/20">
                {project.category}
            </span>
        </div>
      </div>

      {/* Content Side */}
      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col bg-[#050505]">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tighter">
            {project.title}
        </h1>
        
        <div className="h-[2px] w-20 bg-accent mb-8" />
        
        <div className="space-y-6 text-gray-300 leading-relaxed font-light">
            <p className="text-lg">{project.description}</p>
            <p>
                A sophisticated solution engineered for high-performance environments. 
                Utilizing cutting-edge technologies to deliver seamless user experiences and robust backend stability.
            </p>
            
            {/* Tech Stack Simulation */}
            <div className="pt-6">
                <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                    {["Next.js", "TypeScript", "Three.js", "GSAP", "Tailwind"].map((tech) => (
                        <span key={tech} className="px-3 py-1 text-xs border border-white/10 text-gray-400 rounded-full hover:border-accent hover:text-accent transition-colors cursor-default">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>

        <div className="mt-auto pt-10">
            <button className="px-8 py-3 bg-white text-black font-bold uppercase tracking-wider hover:bg-accent hover:text-black transition-colors w-full md:w-auto">
                Launch Project
            </button>
        </div>
      </div>
    </div>
  );
}

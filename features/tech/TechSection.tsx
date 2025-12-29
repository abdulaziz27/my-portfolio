import TechRadar from "./TechRadar";
import TechStatusBar from "./TechStatusBar";

export default function TechSection() {
  return (
    <section id="status" className="relative w-full py-24 bg-black border-t border-white/10 overflow-hidden">
      {/* HUD Background Grid */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
            backgroundImage: `radial-gradient(#00f0ff 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
        }}
      />
      
      <div className="container mx-auto px-4 md:px-10 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16">
            <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tighter">
                    COMMAND <span className="text-accent text-glow">CENTER</span>
                </h2>
                <p className="text-gray-500 font-mono text-sm tracking-widest uppercase">
                    Tech Stack & Mastery Distribution
                </p>
            </div>
            
            {/* Decorative HUD Element */}
            <div className="hidden md:block text-right font-mono text-xs text-accent/50">
                <p>CPU: 32%</p>
                <p>MEM: 12GB</p>
                <p>NET: 1Gbps</p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Radar Chart (4 Cols) */}
            <div className="lg:col-span-5 flex flex-col items-center">
                <div className="bg-white/5 border border-white/10 p-4 rounded-full backdrop-blur-sm relative">
                    {/* Rotating Ring */}
                    <div className="absolute inset-[-10px] border border-accent/20 rounded-full border-dashed animate-spin-slow pointer-events-none" />
                    <TechRadar />
                </div>
            </div>

            {/* Right: Status Bars (8 Cols) */}
            <div className="lg:col-span-7">
                <TechStatusBar />
                
                {/* Terminal / Logs Placeholder */}
                <div className="mt-8 p-4 bg-black border border-white/10 font-mono text-xs text-green-500 opacity-70 h-32 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black pointer-events-none" />
                    <p>{`> Initializing core systems...`}</p>
                    <p>{`> Loading React 19 modules... [OK]`}</p>
                    <p>{`> Connecting to Global CDN... [OK]`}</p>
                    <p>{`> Optimizing WebGL shaders... [OK]`}</p>
                    <p className="animate-pulse">{`> Awaiting user input_`}</p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}

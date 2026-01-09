import ContactForm from "./ContactForm";
import WorldClock from "./WorldClock";

export default function ContactSection() {
  return (
    <section id="contact" className="relative w-full py-24 bg-[#0a0a0a] border-t border-white/10 overflow-hidden">
        {/* Background Grid */}
        <div 
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
                backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
            }}
        />

      <div className="container mx-auto px-4 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left: Terminals & Info */}
            <div className="flex flex-col space-y-12">
                <div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tighter">
                        ESTABLISH <span className="text-accent text-glow">UPLINK</span>
                    </h2>
                    <p className="text-gray-400 font-light leading-relaxed max-w-md">
                        Ready to architect the next generation of digital platforms? 
                        Initialize the communication sequence to discuss your objectives.
                    </p>
                </div>

                {/* Comm Channels */}
                <div className="space-y-4">
                    <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest">Secure Channels</h3>
                    <div className="flex flex-col gap-2">
                        <a href="mailto:abdulazizz.dev@gmail.com" className="group flex items-center gap-4 p-4 border border-white/10 hover:border-accent hover:bg-white/5 transition-all">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="font-mono text-sm text-gray-300 group-hover:text-white">abdulazizz.dev@gmail.com</span>
                        </a>
                        <a href="https://www.linkedin.com/in/itsabdulaziz" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-4 border border-white/10 hover:border-accent hover:bg-white/5 transition-all">
                            <span className="w-2 h-2 bg-blue-500 rounded-full" />
                            <span className="font-mono text-sm text-gray-300 group-hover:text-white">LinkedIn Secure Link</span>
                        </a>
                    </div>
                </div>

                {/* World Clock Widget */}
                <div>
                    <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Time Zones</h3>
                    <WorldClock />
                </div>
            </div>

            {/* Right: System Inquiry Form */}
            <div className="bg-white/5 border border-white/5 p-8 backdrop-blur-sm shadow-2xl relative">
                <div className="absolute top-0 right-0 p-2 text-[10px] font-mono text-gray-600">
                    SYS.VER.4.0
                </div>
                <ContactForm />
            </div>

        </div>
      </div>
    </section>
  );
}

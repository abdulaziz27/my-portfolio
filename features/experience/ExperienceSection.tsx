"use client";

// ============================================
// LAYOUT SELECTION - Uncomment salah satu import untuk ganti layout:
// ============================================

// Option 1: Accordion Layout (Default - Recommended)
import ExperienceSectionAccordion from "./ExperienceSectionAccordion";

// Option 2: Timeline Layout (Uncomment baris di bawah untuk aktifkan)
// import ExperienceSectionTimeline from "./ExperienceSectionTimeline";

// Option 3: Grid Layout (Uncomment baris di bawah untuk aktifkan)
// import ExperienceSectionGrid from "./ExperienceSectionGrid";

export default function ExperienceSection() {
  // ============================================
  // LAYOUT SELECTION - Uncomment salah satu return untuk ganti layout:
  // ============================================
  
  // Option 1: Accordion Layout (Default - Recommended)
  return <ExperienceSectionAccordion />;
  
  // Option 2: Timeline Layout (Uncomment baris di bawah dan comment Option 1 untuk aktifkan)
  // return <ExperienceSectionTimeline />;
  
  // Option 3: Grid Layout (Uncomment baris di bawah dan comment Option 1 untuk aktifkan)
  // return <ExperienceSectionGrid />;
}

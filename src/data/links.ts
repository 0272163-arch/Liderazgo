import { BookOpen, CalendarClock, CreditCard, LayoutDashboard } from "lucide-react";
import React from "react";

export interface DashboardLink {
  id: string;
  title: string;
  url: string;
  icon: React.ElementType;
  description: string;
  isPinned: boolean;
}

export const MAIN_LINKS: DashboardLink[] = [
  {
    id: "wiki",
    title: "Engineering Wiki",
    url: "https://sites.google.com/up.edu.mx/wiki-ingeniera-cdmx/home",
    icon: BookOpen,
    description: "Central knowledge base and documentation.",
    isPinned: true,
  },
  {
    id: "schedules",
    title: "ProtoDesign Schedules",
    url: "https://sites.google.com/up.edu.mx/protodesign/horarios?authuser=0",
    icon: CalendarClock,
    description: "Lab schedules and equipment reservations.",
    isPinned: true,
  },
  {
    id: "cmc",
    title: "CMC Portal",
    url: "https://portal.up.edu.mx/cmcportal/",
    icon: LayoutDashboard,
    description: "Academic administration and grades.",
    isPinned: true,
  },
  {
    id: "payment",
    title: "Payment Portal",
    url: "https://portalpagos.up.edu.mx",
    icon: CreditCard,
    description: "Tuition and service payments.",
    isPinned: true,
  },
];

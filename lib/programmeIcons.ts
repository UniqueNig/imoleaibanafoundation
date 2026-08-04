import {
  BookOpen,
  HeartHandshake,
  Stethoscope,
  Sparkles,
  Handshake,
  Rocket,
  GraduationCap,
  Droplet,
  Home,
  Utensils,
  type LucideIcon,
} from "lucide-react";

// Client-safe: no mongoose import here. lib/models/Programme.ts imports
// PROGRAMME_ICON_NAMES from this file (not the other way around) so that
// client components (e.g. the admin icon picker) can use this module
// without pulling mongoose into the browser bundle.
export const PROGRAMME_ICON_NAMES = [
  "BookOpen",
  "HeartHandshake",
  "Stethoscope",
  "Sparkles",
  "Handshake",
  "Rocket",
  "GraduationCap",
  "Droplet",
  "Home",
  "Utensils",
] as const;

export const PROGRAMME_ICON_MAP: Record<(typeof PROGRAMME_ICON_NAMES)[number], LucideIcon> = {
  BookOpen,
  HeartHandshake,
  Stethoscope,
  Sparkles,
  Handshake,
  Rocket,
  GraduationCap,
  Droplet,
  Home,
  Utensils,
};

export function getProgrammeIcon(icon: string | undefined | null): LucideIcon {
  return PROGRAMME_ICON_MAP[icon as keyof typeof PROGRAMME_ICON_MAP] ?? Sparkles;
}

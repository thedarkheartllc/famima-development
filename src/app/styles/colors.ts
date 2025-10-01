// Famima Design System Colors
// Garden-like, peaceful, welcoming color palette

export const colors = {
  // Primary neutrals
  white: "#FFFFFF",
  black: "#000000",

  // Grays (primary text and UI)
  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },

  // Nature-inspired accent colors (earthy tones)
  nature: {
    sky: {
      light: "#E0F2FE", // sky-200
      DEFAULT: "#BAE6FD", // sky-300
    },
    grass: {
      light: "#D1FAE5", // emerald-200
      DEFAULT: "#A7F3D0", // emerald-300
    },
    sand: {
      light: "#FDE68A", // amber-200
      DEFAULT: "#FCD34D", // amber-300
    },
    rose: {
      light: "#FECDD3", // rose-200
      DEFAULT: "#FDA4AF", // rose-300
    },
    lavender: {
      light: "#DDD6FE", // violet-200
      DEFAULT: "#C4B5FD", // violet-300
    },
    ocean: {
      light: "#99F6E4", // teal-200
      DEFAULT: "#5EEAD4", // teal-300
    },
    water: {
      light: "#BFDBFE", // blue-200
      DEFAULT: "#93C5FD", // blue-300
    },
    lime: {
      light: "#D9F99D", // lime-200
      DEFAULT: "#BEF264", // lime-300
    },
    sunset: {
      light: "#FED7AA", // orange-200
      DEFAULT: "#FDBA74", // orange-300
    },
    cloud: {
      light: "#E2E8F0", // slate-200
      DEFAULT: "#CBD5E1", // slate-300
    },
  },

  // Functional colors
  success: {
    light: "#BBF7D0", // green-200
    DEFAULT: "#4ADE80", // green-400
    dark: "#16A34A", // green-600
  },
  error: {
    light: "#FECACA", // red-200
    DEFAULT: "#F87171", // red-400
    dark: "#DC2626", // red-600
  },
  warning: {
    light: "#FED7AA", // orange-200
    DEFAULT: "#FB923C", // orange-400
    dark: "#EA580C", // orange-600
  },
  info: {
    light: "#BFDBFE", // blue-200
    DEFAULT: "#60A5FA", // blue-400
    dark: "#2563EB", // blue-600
  },
};

// Gradient combinations for avatars/cards
export const gradients = {
  sky: "from-sky-200 to-sky-300",
  grass: "from-emerald-200 to-emerald-300",
  sand: "from-amber-200 to-amber-300",
  rose: "from-rose-200 to-rose-300",
  lavender: "from-violet-200 to-violet-300",
  ocean: "from-teal-200 to-teal-300",
  water: "from-blue-200 to-blue-300",
  lime: "from-lime-200 to-lime-300",
  sunset: "from-orange-200 to-orange-300",
  cyan: "from-cyan-200 to-cyan-300",
  stone: "from-stone-200 to-stone-300",
  cloud: "from-slate-200 to-slate-300",
};

// Opacity values for consistent transparency
export const opacity = {
  backdrop: "bg-black/20",
  backdropDark: "bg-black/95",
  overlay: "bg-white/60",
  overlayHover: "bg-white/80",
  glassLight: "bg-white/10",
  glassDark: "bg-black/10",
};

export default colors;
